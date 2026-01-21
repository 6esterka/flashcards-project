import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/customButton/Button";


export default function GoBackButton(){
    const navigator=useNavigate();
    const selectedGroupName=useFlashcardStore((state)=>state.selectedGroupName);
    const returnBackHandle=()=>{
        navigator("/");
    }
    if(!selectedGroupName){
        return null;
    }
    //TODO Move the text into translation file
    return(
        <Button variant="goBack" onClick={returnBackHandle}>
            <span className="mr-2">←</span> Back
        </Button>
    );
}