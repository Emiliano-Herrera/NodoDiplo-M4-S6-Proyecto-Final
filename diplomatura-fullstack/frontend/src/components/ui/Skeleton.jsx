import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )}
      {...props}
    />
  );
}

// Skeleton para tabla
export function TableSkeleton({ columns = 5, rows = 5 }) {
  // Definir anchos aproximados para cada columna
  const columnWidths = [
    "w-8",      // checkbox
    "w-32",     // nombre
    "w-48",     // email
    "w-24",     // rol
    "w-32",     // fecha registro
    "w-16",     // acciones
  ];

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/30">
          <tr className="border-border/50">
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="p-3 text-left">
                <Skeleton className={`h-4 ${columnWidths[i] || 'w-20'}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-border/50">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-3">
                  <Skeleton className={`h-5 ${columnWidths[colIndex] || 'w-full'}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Skeleton para cards (dashboard)
export function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border/50 p-4 space-y-3">
          <div className="flex justify-between items-start">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

// Skeleton para gráficos
export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 p-4 space-y-4">
      <Skeleton className="h-5 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-32 w-full rounded-lg" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}