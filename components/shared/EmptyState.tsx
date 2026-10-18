import { CalendarX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

function EmptyState({
  title,
  description,
  onReset,
  resetLabel = "پاک کردن فیلترها",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary shadow-2xs">
        <CalendarX className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {onReset ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="mt-1 gap-1.5"
        >
          <RotateCcw className="size-3.5" />
          {resetLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { EmptyState };
export default EmptyState;
