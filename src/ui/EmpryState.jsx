import {Card} from "@heroui/react";
import {HugeiconsIcon} from "@hugeicons/react";

function EmpryState({
  icon,
  title = "No data found",
  description = "There are no items to display at the moment.",
  action,
  children,
  className = "",
}) {
  return (
    <Card
      className={`flex flex-col items-center justify-center text-center py-12`}>
      {icon && (
        <div className="relative mb-5 flex items-center justify-center">
          <div
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl 
            bg-accent/10 text-accent ring-8 ring-accent/5">
            <HugeiconsIcon icon={icon} size={32} />
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="mt-1.5 text-sm text-default-500 leading-relaxed">
          {description}
        </p>
      )}

      {(action || children) && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {action}
          {children}
        </div>
      )}
    </Card>
  );
}

export default EmpryState;
