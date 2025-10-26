export interface Flashcard {
  question: string;
  answer: string;
  isLearned: boolean;
}


export async function generateFlashcards(topic: string): Promise<Flashcard[]> {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    let text = data.choices[0].message?.content ?? "";

    // Clean unwanted wrappers
    text = text.replace(/^<[^>]*>\s*/, ""); // remove <s> or <...>
    text = text.replace(/```json|```/g, ""); // remove code fences
    text = text.trim();

    console.log("🔍 Raw model output:", text);

    // Try to parse JSON
    const parsed = JSON.parse(text);

    // Ensure it's an array
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // Some models may wrap in {flashcards: [...]}
    if (parsed.flashcards && Array.isArray(parsed.flashcards)) {
      return parsed.flashcards;
    }

    console.warn("⚠️ Unexpected JSON shape:", parsed);
    return [];
  } catch (err) {
    console.error("❌ Flashcard generation failed:", err);
    return [];
  }
}