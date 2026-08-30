import {Button, Card} from "@heroui/react";
import {AlertCircleIcon, ReloadIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";

function ErrorState({
  icon = AlertCircleIcon,
  title = "Something went wrong",
  message = "An error occurred while loading data. Please try again.",
  onRetry,
  action,
  children,
  className = "",
}) {
  return (
    <Card
      className={`flex flex-col items-center justify-center text-center py-12`}>
      {icon && (
        <div className="relative mb-2 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger ring-8 ring-danger/5">
            <HugeiconsIcon icon={icon} size={32} />
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      {message && (
        <p className="mt-1.5 max-w-md text-sm text-default-500 leading-relaxed">
          {message}
        </p>
      )}

      {(onRetry || action || children) && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {onRetry && (
            <Button
              variant="outline"
              color="danger"
              className="gap-2"
              onClick={onRetry}>
              <HugeiconsIcon icon={ReloadIcon} size={16} />
              Try Again
            </Button>
          )}
          {action}
          {children}
        </div>
      )}
    </Card>
  );
}

export default ErrorState;
