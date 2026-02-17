import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/customButton/Button";
import { uiText } from "@/constants/uiText";

export default function GoBackButton() {
  const navigator = useNavigate();
  const selectedGroupName = useFlashcardStore(
    (state) => state.selectedGroupName,
  );
  const returnBackHandle = () => {
    navigator("/");
  };
  if (!selectedGroupName) {
    return null;
  }
  return (
    <Button variant="goBack" onClick={returnBackHandle}>
      <span className="mr-2">{uiText.general.goBackButtonArrow}</span>{" "}
      {uiText.general.goBackButtonText}
    </Button>
  );
}
