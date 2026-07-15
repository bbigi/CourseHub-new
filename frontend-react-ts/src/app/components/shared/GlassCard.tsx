export function GlassCard({ 
  className = "", 
  style = {}, 
  children, 
  ...rest 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{ background: "#FFFFFF", borderColor: "#D9D4C7", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}