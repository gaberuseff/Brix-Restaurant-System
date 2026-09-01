import {Button} from "@heroui/react";
import {ChevronLeft} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useNavigate} from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className="flex items-center">
      <HugeiconsIcon icon={ChevronLeft} size={16} />
      Back
    </Button>
  );
}

export default BackButton;
