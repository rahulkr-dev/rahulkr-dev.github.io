const nodes = [
  { label: "Client", detail: "web / app" },
  { label: "API", detail: "auth + validation" },
  { label: "Queue", detail: "buffer + retry" },
  { label: "Workers", detail: "async processing" },
  { label: "Delivery", detail: "storage / CDN" },
];

const NODE_HEIGHT = 44;
const GAP = 24;
const TOP = 16;

export function HeroVisual() {
  const height = TOP * 2 + nodes.length * NODE_HEIGHT + (nodes.length - 1) * GAP;

  return (
    <svg
      viewBox={`0 0 320 ${height}`}
      role="img"
      aria-label="Request flow: client, API, queue, workers, delivery"
      className="h-full w-full"
    >
      {nodes.map((node, index) => {
        const y = TOP + index * (NODE_HEIGHT + GAP);
        const isLast = index === nodes.length - 1;

        return (
          <g key={node.label}>
            <rect
              x={20}
              y={y}
              width={280}
              height={NODE_HEIGHT}
              rx={8}
              className="fill-background stroke-border"
              strokeWidth={1.5}
            />
            <rect
              x={20}
              y={y}
              width={6}
              height={NODE_HEIGHT}
              rx={3}
              className="fill-primary"
            />
            <text
              x={42}
              y={y + 27}
              className="fill-foreground font-mono text-[13px] font-semibold"
            >
              {node.label}
            </text>
            <text
              x={284}
              y={y + 27}
              textAnchor="end"
              className="fill-muted-foreground font-mono text-[11px]"
            >
              {node.detail}
            </text>
            {isLast ? null : (
              <g className="stroke-primary" strokeWidth={1.5} fill="none">
                <line x1={160} y1={y + NODE_HEIGHT} x2={160} y2={y + NODE_HEIGHT + GAP - 6} />
                <polyline
                  points={`154,${y + NODE_HEIGHT + GAP - 12} 160,${y + NODE_HEIGHT + GAP - 5} 166,${y + NODE_HEIGHT + GAP - 12}`}
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
