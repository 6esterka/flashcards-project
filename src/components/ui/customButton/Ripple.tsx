
type RippleProps = {
  readonly ripples: { x: number; y: number; size: number; id: number }[];
  readonly variant: "primary" | "secondary" | "accent";
};

export function Ripple({ ripples, variant }: RippleProps) {
  const getColor = (variant: string) => {
    if (variant === "primary") return "rgba(85,108,214,0.28)";
    if (variant === "secondary") return "rgba(244,162,97,0.28)";
    return "rgba(231,111,81,0.28)";
  };

  return (
    <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full animate-ripple"
          style={{
            top: r.y,
            left: r.x,
            transform: "translate(-50%, -50%)",
            width: `${r.size}px`,
            height: `${r.size}px`,
            backgroundColor: getColor(variant),
            opacity: 0.28,
          }}
        />
      ))}
    </span>
  );
}