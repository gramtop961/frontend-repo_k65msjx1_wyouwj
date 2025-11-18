import { useState } from "react";
import { Menu, Bell, Search, Shield, Users, HeartHandshake, Activity, Waves, MapPin, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

export default function Layout({ children, onSearch }) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Shield, label: "Dashboard" },
    { icon: Waves, label: "Bencana" },
    { icon: Users, label: "Relawan" },
    { icon: HeartHandshake, label: "Donasi" },
    { icon: Activity, label: "Aktivitas" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-[84px]" : "w-72"} transition-all duration-300 bg-slate-900/80 border-r border-white/10 backdrop-blur-xl relative`}
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm text-blue-300/80">SIRELAWAN</div>
              <div className="text-lg font-semibold tracking-wide">Manajemen Bencana</div>
            </div>
          )}
        </div>

        <nav className="mt-2 space-y-1 px-2">
          {navItems.map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 focus:bg-white/10 transition-colors group">
              <Icon className="w-5 h-5 text-blue-300 group-hover:scale-105 transition-transform" />
              {!collapsed && <span className="text-sm">{label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:scale-105 transition"
          title="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <LogOut className="w-5 h-5 text-red-400" />
            {!collapsed && <span className="text-sm">Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/40 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="h-16 flex items-center gap-3">
              <button className="md:hidden p-2 rounded-lg hover:bg-white/10"><Menu /></button>
              <div className="relative flex-1 max-w-xl">
                <input
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Cari bencana, relawan, donasi..."
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-white/10">
                <Bell />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-blue-300" />
                <span className="text-xs text-slate-300">Response Center</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
