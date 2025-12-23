import type { PromptFlashcard } from "@/types/promptFlashcard";

type ApiResponseWrapper = {
  flashcards: PromptFlashcard[]
}

export default class GeneratorAI {
  public static async generateFlashcards(topic: string): Promise<PromptFlashcard[]> {
    try {
      const response = await this.sendRequest(topic);
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} ${response.statusText}`
        );
      }
      const parsed = await this.formatResponse(response);
      // Ensure it's an array
      if (Array.isArray(parsed)) {
        return parsed;
      }

      // Some models may wrap in {flashcards: [...]}
      if ('flashcards' in parsed && Array.isArray(parsed.flashcards)) {
        return parsed.flashcards;
      }

      console.warn("Unexpected JSON shape:", parsed);
      return [];
    } catch (err) {
      console.error("Flashcard generation failed:", err);
      return [];
    }
  }

    private static async sendRequest(topic: string): Promise<Response> {
    return await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.1-24b-instruct:free", // free model
        messages: [
          {
            role: "system",
            content:
              "You are a flashcard generator. Each answer should be unique don't repeat yourself. Output ONLY a JSON array of flashcards. Each object must have {question, answer, isLearned}. Always set isLearned: false. Do not include any text before or after the JSON.",
          },
          {
            role: "user",
            content: `Generate 5 flashcards about: ${topic}`,
          },
        ],
        temperature: 0.7,
      }),
    });
  }

  private static async formatResponse(response: Response): Promise<PromptFlashcard[]|ApiResponseWrapper> {
    const data = await response.json();
    let text = data.choices?.[0]?.message?.content ?? "";

    // Clean unwanted wrappers
    text = text.replace(/^<[^>]*>\s*/, ""); // remove <s> or <...>
    text = text.replace(/```json|```/g, ""); // remove code fences
    text = text.trim();

    console.log("🔍 Raw model output:", text);

    // return parsed JSON
    return JSON.parse(text) as PromptFlashcard[]|ApiResponseWrapper;
  }
}
