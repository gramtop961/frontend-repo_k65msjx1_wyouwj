import { useEffect, useRef } from "react";

// Lightweight canvas line chart (no external deps)
export default function TrendChart({ data = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.moveTo(32, 8);
    ctx.lineTo(32, h - 24);
    ctx.lineTo(w - 8, h - 24);
    ctx.stroke();

    if (!data.length) return;
    const max = Math.max(...data.map((d) => d.count), 5);
    const stepX = (w - 48) / (data.length - 1);

    // gradient line
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(59,130,246,0.8)");
    grad.addColorStop(1, "rgba(59,130,246,0.1)");

    ctx.beginPath();
    data.forEach((d, i) => {
      const x = 32 + i * stepX;
      const y = (h - 24) - (d.count / max) * (h - 48);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.stroke();

    // dots
    data.forEach((d, i) => {
      const x = 32 + i * stepX;
      const y = (h - 24) - (d.count / max) * (h - 48);
      ctx.fillStyle = "#60a5fa";
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [data]);

  return (
    <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Tren Donasi (7 hari)</h3>
        <span className="text-xs text-slate-400">jumlah transaksi</span>
      </div>
      <canvas ref={canvasRef} width={600} height={220} className="w-full" />
    </div>
  );
}
