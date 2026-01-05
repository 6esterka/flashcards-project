import type { Flashcard } from "@/types/flashcard";

type GeneratedCardLogProps= {
    readonly generatedCards: Flashcard[]|undefined;
}

export default function GeneratedCardLog({ generatedCards }: GeneratedCardLogProps) {
    //TODO Needs to be reworked maybe
    return <>
    {generatedCards?.map(card=>(
            <div key={card.id}>
                <p>{card.question}</p>
                <p>{card.answer}</p>
                <p>{card.groupName}</p>
            </div>
        ))}
    </>
}