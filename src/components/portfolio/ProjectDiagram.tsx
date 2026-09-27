const blocks = ["SENSOR", "CONDITION", "FPGA", "ESTIMATE", "OUTPUT"];

export function ProjectDiagram({ progress: value }: { progress: number }) {
  const phase = Math.min(5, Math.floor(value * 6));
  return (
    <div className="project-diagram" aria-label="FPGA estimation signal architecture">
      <div className="scope-head"><span>ESTIMATOR / SIGNAL PATH</span><span>CLK 100 MHz</span></div>
      <svg viewBox="0 0 900 420" role="img" aria-hidden="true">
        <g className="scope-grid">
          {Array.from({ length: 10 }).map((_, i) => <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="420" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`h-${i}`} x1="0" y1={i * 84} x2="900" y2={i * 84} />)}
        </g>
        <path className="waveform" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - Math.max(0.05, value)} d="M25 90 L95 90 L110 50 L130 135 L150 72 L175 90 L260 90 L280 55 L300 125 L320 70 L342 90 L875 90" />
        <line className="signal-bus" x1="92" y1="255" x2="808" y2="255" />
        {blocks.map((block, index) => {
          const x = 55 + index * 177;
          return <g key={block} className={index <= phase ? "block block--active" : "block"}>
            <rect x={x} y="218" width="130" height="74" rx="2" />
            <text x={x + 65} y="260" textAnchor="middle">{block}</text>
            {index < blocks.length - 1 && <path d={`M${x + 130} 255 H${x + 168} l-8 -6 m8 6 l-8 6`} />}
          </g>;
        })}
        <path className="estimate-line" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - Math.max(0, (value - 0.55) * 2.2)} opacity={value > 0.52 ? 1 : 0} d="M55 355 C115 320 160 382 225 345 S340 300 405 340 S525 380 585 325 S710 295 845 338" />
      </svg>
      <div className="scope-foot"><span>θ[n]</span><span>ω[n]</span><span>LATENCY / BOUNDED</span></div>
    </div>
  );
}
