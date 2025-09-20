import {useState,FormEvent} from "react";
import { Button } from "../components/ui/customButton/Button";

interface GenerateProps {
    readonly onGenerate: (topic:string) => void;
}

export default function Generate({onGenerate}: GenerateProps){
    const [topic, setTopic] = useState("");

    const handleSubmit=(event:FormEvent) => {
        event.preventDefault();
        if(!topic.trim())return;
        onGenerate(topic);
        setTopic("");
    }
    return (
    <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Generate Flashcards</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Enter a topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border border-gray-300 p-2 rounded"
            />
            <Button type="submit" variant="primary" disabled={!topic.trim()}>
                Generate
            </Button>
        </form>
    </div>)
}