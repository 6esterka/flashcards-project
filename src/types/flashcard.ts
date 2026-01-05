import type { PromptFlashcard } from "@/types/promptFlashcard";

export type Flashcard=PromptFlashcard&{
    id:string;
    groupName:string;
}