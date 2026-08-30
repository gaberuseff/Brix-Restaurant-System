import {Tooltip} from "@heroui/react";
import {
  Analytics02Icon,
  Home01Icon,
  MenuRestaurantIcon,
  Package01Icon,
  Settings02Icon,
  Store02Icon,
  UserGroupIcon,
  WaitersIcon,
} from "@hugeicons/core-free-icons";
import ShoppingBag01Icon from "@hugeicons/core-free-icons/ShoppingBag01Icon";
import {HugeiconsIcon} from "@hugeicons/react";
import {Link, useLocation} from "react-router-dom";

const navLinks = [
  {
    path: "/",
    label: "Dashboard",
    icon: Home01Icon,
  },
  {
    path: "/orders",
    label: "Orders",
    icon: ShoppingBag01Icon,
  },
  {
    path: "/menu",
    label: "Menu",
    icon: MenuRestaurantIcon,
  },
  {
    path: "/categories",
    label: "Categories",
    icon: Package01Icon,
  },
  {
    path: "/branches",
    label: "Branches",
    icon: Store02Icon,
  },
  {
    path: "/staff",
    label: "Staff",
    icon: WaitersIcon,
  },
  {
    path: "/users",
    label: "Users",
    icon: UserGroupIcon,
  },
  {
    path: "/reports",
    label: "Reports",
    icon: Analytics02Icon,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings02Icon,
  },
];

function AppNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex flex-col items-center">
      <ul className="flex flex-col items-center gap-3">
        {navLinks.map((link) => {
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

export default AppNav;
