import type { Flashcard } from "@/types/flashcard";
import type { PromptFlashcard } from "@/types/promptFlashcard";
import { nanoid } from "nanoid";

type ApiResponseWrapper = {
  flashcards: PromptFlashcard[];
};

export default class GeneratorAI {
  public static async generateFlashcards(topic: string): Promise<Flashcard[]> {
    const response = await this.sendRequest(topic);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const parsed = await this.formatResponse(response);
    // Ensure it's an array
    if (Array.isArray(parsed)) {
      const flashcards = this.buildFlashcard(parsed);
      return flashcards;
    }

    // Some models may wrap in {flashcards: [...]}
    if ("flashcards" in parsed && Array.isArray(parsed.flashcards)) {
      const flashcards = this.buildFlashcard(parsed.flashcards);
      return flashcards;
    }

    console.warn("Unexpected JSON shape:", parsed);
    return [];
  }

  private static buildFlashcard(
    promptFlashcards: PromptFlashcard[],
  ): Flashcard[] {
    const flashcards = promptFlashcards.map(
      (promptFlashcard: PromptFlashcard): Flashcard => {
        return { id: nanoid(), ...promptFlashcard };
      },
    );
    return flashcards;
  }

  private static async sendRequest(topic: string): Promise<Response> {
    return await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "X-Title": "Flashcard App",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        response_format: { type: "json_object" }, // FORCES JSON output
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are a factual flashcard generator. 
            RULES:
            1. Accuracy is priority. If you are unsure of a fact, do not include it.
            2. Format: Return ONLY a JSON object with a "flashcards" key containing an array.
            3. Structure: Each object must have "question", "answer", and "isLearned" (always false).
            4. No preamble or conversational filler. Only valid JSON.
            5. If the topic is invalid or offensive, return: {"flashcards": []}.`,
          },
          {
            role: "user",
            content: `Generate exactly 5 high-quality, factual flashcards about the following topic: ${topic}`,
          },
        ],
      }),
    });
  }

  private static async formatResponse(
    response: Response,
  ): Promise<PromptFlashcard[] | ApiResponseWrapper> {
    const data = await response.json();
    let text = data.choices?.[0]?.message?.content ?? "";

    // Clean unwanted wrappers
    text = text.replace(/^<[^>]*>\s*/, ""); // remove <s> or <...>
    text = text.replace(/```json|```/g, ""); // remove code fences
    text = text.trim();

    console.log("🔍 Raw model output:", text);

    // return parsed JSON
    return JSON.parse(text) as PromptFlashcard[] | ApiResponseWrapper;
  }
}
