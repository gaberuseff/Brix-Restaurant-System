import User from "../features/auth/User";
import LogoutBtn from "./LogoutBtn";
import ModeToggle from "./ModeToggle";

function ManagerHeader() {
  return (
    <header className="flex justify-between items-center w-full">
      <div className="flex items-center gap-4">
        <ModeToggle />

        <User />

        <LogoutBtn />
      </div>
    </header>
  );
}

export default ManagerHeader;
