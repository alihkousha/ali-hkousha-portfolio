const nodes = [
  { label: "PHYSICAL SYSTEM", x: 10, y: 47 },
  { label: "SENSORS", x: 31, y: 26 },
  { label: "COMPUTATION", x: 52, y: 47 },
  { label: "CONTROL", x: 73, y: 26 },
  { label: "ACTUATION", x: 88, y: 47 },
];

export function SystemDiagram() {
  return (
    <div className="system-diagram" aria-label="Signal flow from physical system through sensors, computation, control, and actuation">
      <svg viewBox="0 0 1000 470" role="img" aria-hidden="true">
        <defs>
          <filter id="signal-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <g className="diagram-grid">
          {Array.from({ length: 11 }).map((_, i) => <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="470" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`h-${i}`} x1="0" y1={i * 94} x2="1000" y2={i * 94} />)}
        </g>
        <path className="signal-path signal-path--glow signal-path--draw" d="M100 270 C175 270 190 145 310 145 S430 270 520 270 S630 145 730 145 S820 270 880 270" />
        <path className="signal-path signal-path--draw" d="M100 270 C175 270 190 145 310 145 S430 270 520 270 S630 145 730 145 S820 270 880 270" />
        {nodes.map((node, index) => (
          <g key={node.label} className="diagram-node" style={{ animationDelay: `${0.35 + index * 0.18}s` }}>
            <circle className="node-ring" cx={node.x * 10} cy={node.y * 5.4} r="17" />
            <circle className="node-core" cx={node.x * 10} cy={node.y * 5.4} r="4" />
          </g>
        ))}
      </svg>
      {nodes.map((node) => <span key={node.label} className="diagram-label" style={{ left: `${node.x}%`, top: `${node.y + 9}%` }}>{node.label}</span>)}
      <span className="diagram-index">SYS / 001</span>
      <span className="diagram-frequency">Δt = 10 ns</span>
    </div>
  );
}
