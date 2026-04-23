"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const REVENUE_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(2026, 3, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  revenue: Math.floor(Math.random() * 5000) + 1000,
  orders: Math.floor(Math.random() * 50) + 10,
}));

export function RevenueChart() {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
            dy={10} 
            minTickGap={30}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
            tickFormatter={(val) => `$${val / 1000}k`} 
          />
          <Tooltip 
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
            contentStyle={{ borderRadius: "1rem", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
            labelStyle={{ fontWeight: "bold", fontStyle: "italic", marginBottom: "0.25rem" }}
            formatter={(value: any) => [`$${value?.toLocaleString() ?? "0"}`, "Revenue"]}
          />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
