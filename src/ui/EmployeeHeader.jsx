import {CashierIcon, ReceiptIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {NavLink} from "react-router-dom";
import User from "../features/auth/User";
import {PATHS} from "../routes/paths";
import LogoutBtn from "./LogoutBtn";
import ModeToggle from "./ModeToggle";
import RenderBranch from "./RenderBranch";
import SyncBtn from "./SyncBtn";

const links = [
  {
    path: PATHS.EMPLOYEE.POS,
    label: "POS",
    icon: CashierIcon,
  },
  {
    path: PATHS.EMPLOYEE.ORDERS,
    label: "Orders",
    icon: ReceiptIcon,
  },
];

function EmployeeHeader() {
  return (
    <header className="flex items-center justify-between w-full gap-4">
      {/* Left: Branch Info & Navigation Tabs */}
      <div className="flex items-center gap-3 md:gap-5">
        <RenderBranch />

        <nav aria-label="Employee Navigation">
          <ul className="flex items-center gap-1 p-1 rounded-xl bg-surface-secondary/80 dark:bg-default-50/10 border border-border/50 shadow-2xs">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({isActive}) =>
                    `flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-xs font-semibold"
                        : "text-muted hover:text-foreground hover:bg-surface/60"
                    }`
                  }>
                  <HugeiconsIcon icon={link.icon} size={18} />
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <SyncBtn />
        <ModeToggle />
        <User />
        <LogoutBtn />
      </div>
    </header>
  );
}

export default EmployeeHeader;
