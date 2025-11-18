import { Users, Waves, HandCoins, ClipboardCheck } from "lucide-react";

function StatCard({ title, value, icon: Icon, gradient }) {
  return (
    <div className={`rounded-2xl p-5 border border-white/10 bg-gradient-to-br ${gradient} shadow-lg shadow-black/20`}> 
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-300/90">{title}</div>
          <div className="text-3xl font-semibold mt-1">{value}</div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Stats({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Relawan" value={data?.total_relawan ?? 0} icon={Users} gradient="from-blue-600/30 to-blue-400/20" />
      <StatCard title="Bencana Aktif" value={data?.bencana_aktif ?? 0} icon={Waves} gradient="from-orange-500/30 to-yellow-400/20" />
      <StatCard title="Donasi Berhasil" value={data?.total_donasi ?? 0} icon={HandCoins} gradient="from-green-600/30 to-emerald-400/20" />
      <StatCard title="Penugasan Aktif" value={data?.penugasan_aktif ?? 0} icon={ClipboardCheck} gradient="from-indigo-600/30 to-violet-400/20" />
    </div>
  );
}
