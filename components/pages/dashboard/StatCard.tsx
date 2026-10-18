import type { ComponentType, SVGProps } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { toPersianDigits } from "@/lib/utils/persian.util";

interface StatCardProps {
  label: string;
  value: number;
  hint?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: string;
}

function StatCard({
  label,
  value,
  hint,
  icon: IconComponent,
  accent = "bg-primary/10 text-primary",
}: StatCardProps) {
  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`grid size-12 shrink-0 place-items-center rounded-2xl ${accent}`}
        >
          <IconComponent className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            {toPersianDigits(value)}
          </p>
          {hint ? (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatCard };
export default StatCard;
