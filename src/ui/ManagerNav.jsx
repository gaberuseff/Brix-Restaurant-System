import {Tooltip} from "@heroui/react";
import {
  CashierIcon,
  Delete01Icon,
  HeartPlusIcon,
  Home01Icon,
  MenuRestaurantIcon,
  Package01Icon,
  Settings02Icon,
  Store02Icon,
  WaitersIcon,
} from "@hugeicons/core-free-icons";
import ShoppingBag01Icon from "@hugeicons/core-free-icons/ShoppingBag01Icon";
import {HugeiconsIcon} from "@hugeicons/react";
import {Link, useLocation} from "react-router-dom";
import useUser from "../features/auth/useUser";
import {PATHS} from "../routes/paths";

const navLinks = [
  {
    path: PATHS.MANAGER.ROOT,
    label: "Dashboard",
    icon: Home01Icon,
    roles: ["manager"],
  },
  {
    path: PATHS.EMPLOYEE.POS,
    label: "POS Terminal",
    icon: CashierIcon,
    roles: ["employee"],
  },
  {
    path: PATHS.EMPLOYEE.ORDERS,
    label: "Orders",
    icon: ShoppingBag01Icon,
    roles: ["employee"],
  },
  {
    path: PATHS.MANAGER.MENU,
    label: "Menu",
    icon: MenuRestaurantIcon,
    roles: ["manager"],
  },
  {
    path: PATHS.MANAGER.MODIFIERS,
    label: "Modifiers",
    icon: HeartPlusIcon,
    roles: ["manager"],
  },
  {
    path: PATHS.MANAGER.CATEGORIES,
    label: "Categories",
    icon: Package01Icon,
    roles: ["manager"],
  },
  {
    path: PATHS.MANAGER.BRANCHES,
    label: "Branches",
    icon: Store02Icon,
    roles: ["manager"],
  },
  {
    path: PATHS.MANAGER.STAFF,
    label: "Staff",
    icon: WaitersIcon,
    roles: ["manager"],
  },
  {
    path: PATHS.MANAGER.SETTINGS,
    label: "Settings",
    icon: Settings02Icon,
    roles: ["manager"],
  },
];

function ManagerNav() {
  const location = useLocation();
  const {role} = useUser();

  const isActive = (path) => location.pathname === path;

  const filteredNavLinks = navLinks.filter(
    (link) => !link.roles || (role && link.roles.includes(role)),
  );

  return (
    <nav className="flex flex-col items-center gap-4">
      <ul className="flex flex-col items-center gap-3">
        {filteredNavLinks.map((link) => {
          const active = isActive(link.path);

          return (
            <li key={link.path}>
              <Tooltip delay={100} closeDelay={100}>
                <Tooltip.Trigger>
                  <Link
                    to={link.path}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      active
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-default-500 hover:bg-default/50 hover:text-foreground"
                    }`}>
                    <HugeiconsIcon icon={link.icon} size={24} />
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content
                  placement="right"
                  className="text-sm font-medium px-3.5 py-1.5 rounded-xl shadow-md">
                  {link.label}
                </Tooltip.Content>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ManagerNav;
