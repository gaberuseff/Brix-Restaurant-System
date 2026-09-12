import {Avatar, Button} from "@heroui/react";
import {User02FreeIcons} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useNavigate} from "react-router-dom";

function User() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/profile");
  }

  return (
    <Button variant="ghost" className="p-0" onClick={handleNavigate}>
      <Avatar>
        <Avatar.Fallback>
          <HugeiconsIcon icon={User02FreeIcons} size={16} />
        </Avatar.Fallback>
      </Avatar>
    </Button>
  );
}

export default User;
