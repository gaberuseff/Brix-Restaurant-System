import LogoutBtn from "./LogoutBtn";
import ModeToggle from "./ModeToggle";

function AppHeader() {
  return (
    <header className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold tracking-wider text-foreground">BRIX</h1>

      <div className="flex items-center gap-4">
        <ModeToggle />

        <LogoutBtn />
      </div>
    </header>
  );
}

export default AppHeader;
