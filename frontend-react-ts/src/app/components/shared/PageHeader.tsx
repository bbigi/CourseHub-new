export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
      <div>
        <h2
          className="font-bold text-base leading-tight"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1F2A24" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: "#657166" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
