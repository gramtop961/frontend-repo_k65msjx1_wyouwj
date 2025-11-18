import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Stats from "./components/Stats";
import RecentBencana from "./components/RecentBencana";
import TrendChart from "./components/TrendChart";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [stats, setStats] = useState(null);
  const [bencana, setBencana] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API}/api/dashboard/stats`);
      const data = await res.json();
      setStats(data);
      setBencana(data.recent_bencana || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (q) => {
    setSearch(q);
    try {
      const res = await fetch(`${API}/api/bencana?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      setBencana(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout onSearch={handleSearch}>
      <div className="space-y-6">
        <Stats data={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentBencana items={bencana} />
          </div>
          <div>
            <TrendChart data={stats?.donasi_trend || []} />
          </div>
        </div>

        {loading && (
          <div className="text-sm text-slate-400">Memuat data...</div>
        )}
      </div>
    </Layout>
  );
}
