"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const FUNNEL_DATA = [
  { stage: "Viewed Product", count: 12450, dropoff: 0 },
  { stage: "Added to Cart", count: 4120, dropoff: 66.9 },
  { stage: "Started Checkout", count: 2850, dropoff: 30.8 },
  { stage: "Entered Shipping", count: 2100, dropoff: 26.3 },
  { stage: "Purchased", count: 1840, dropoff: 12.4 },
];

export function ConversionFunnel() {
  const maxCount = FUNNEL_DATA[0].count;

  return (
    <div className="space-y-6">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={FUNNEL_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
            <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `${val / 1000}k`} />
            <Tooltip 
              contentStyle={{ borderRadius: "1rem", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              labelStyle={{ fontWeight: "bold", fontStyle: "italic", marginBottom: "0.25rem" }}
              formatter={(value: any) => [value?.toLocaleString() ?? "0", "Users"]}
            />
            <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {FUNNEL_DATA.map((step, i) => {
          const conversionRate = Math.round((step.count / maxCount) * 100);
          return (
            <motion.div 
              key={step.stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground line-clamp-1">{step.stage}</p>
              <p className="text-xl font-black italic">{step.count.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold">
                <span className="text-primary">{conversionRate}% conv</span>
                {i > 0 && <span className="text-destructive">-{step.dropoff}%</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
