import { AlertTriangle, MapPin } from "lucide-react";

const urgencyColor = {
  Kritis: "from-red-600/30 to-rose-500/20 border-red-500/20",
  Tinggi: "from-orange-600/30 to-amber-500/20 border-orange-500/20",
  Sedang: "from-yellow-600/30 to-yellow-500/20 border-yellow-500/20",
  Rendah: "from-blue-600/20 to-blue-400/10 border-blue-500/20",
};

export default function RecentBencana({ items = [] }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Bencana Terkini</h3>
        <button className="text-sm text-blue-300 hover:underline">Lihat semua</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((b) => (
          <div key={b.id} className={`rounded-2xl p-4 border bg-gradient-to-br ${urgencyColor[b.tingkat_urgensi] || urgencyColor.Rendah}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{b.lokasi}</span>
                </div>
                <div className="mt-1 font-medium">{b.jenis_bencana}</div>
                <div className="mt-1 text-sm text-slate-300/90 line-clamp-2">{b.deskripsi || "-"}</div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10">{b.tingkat_urgensi}</span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="rounded-2xl p-6 border border-dashed border-white/10 text-slate-400 text-sm">
            Belum ada data bencana.
          </div>
        )}
      </div>
    </div>
  );
}
