"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  interface Stats {
    orders: number;
    revenue: number;
    products: number;
    users: number;
  }

  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Orders</p>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">€{stats.revenue.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Products</p>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow">
          <p className="text-gray-500">Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
      </div>
    </div>
  );
}
