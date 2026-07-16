import { Button } from "./Button";

export function EmptyState({
  icon = "📭",
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="bg-n-50 border-2 border-dashed border-n-200 rounded-xl p-10 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-n-700 font-semibold text-base">{title}</p>
      {description && (
        <p className="text-n-400 text-sm mt-1 max-w-xs mx-auto">{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="primary-seeker" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
