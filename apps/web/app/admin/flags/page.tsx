"use client";

import { useFlagStore } from "@/features/flags/store";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Flag, Zap, FlaskConical, BarChart3, 
  CheckCircle2, PauseCircle, Play, Trophy
} from "lucide-react";

export default function AdminFlagsPage() {
  const { flags, experiments, toggleFlag, setRollout } = useFlagStore();

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-4xl lg:text-6xl font-black italic tracking-tighter uppercase leading-none">Feature Flags</h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Control feature rollouts and A/B experiments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Flags", value: flags.length, icon: Flag },
          { label: "Active", value: flags.filter(f => f.enabled).length, icon: CheckCircle2 },
          { label: "Experiments", value: experiments.length, icon: FlaskConical },
          { label: "Running", value: experiments.filter(e => e.status === "running").length, icon: BarChart3 },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="p-8 rounded-[2.5rem] bg-background border flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-black italic">{s.value}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flags Table */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black italic uppercase tracking-tight">All Flags</h2>
        <div className="rounded-[3rem] border bg-background overflow-hidden shadow-2xl shadow-primary/5">
          {flags.map((flag, i) => (
            <div key={flag.id} className={cn("p-8 flex items-center gap-8 transition-all hover:bg-muted/5", i < flags.length - 1 && "border-b border-dashed")}>
              <div className={cn("h-3 w-3 rounded-full shrink-0 shadow-sm", flag.enabled ? "bg-emerald-500" : "bg-zinc-300")} />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-black italic uppercase tracking-tight">{flag.name}</span>
                  <code className="text-[9px] font-mono bg-muted/50 px-2 py-0.5 rounded-full">{flag.id}</code>
                  <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest px-2 border border-dashed">
                    {flag.environment}
                  </Badge>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{flag.description}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="space-y-1 text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rollout</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${flag.rolloutPercentage}%` }} />
                    </div>
                    <span className="text-sm font-black italic w-8 text-right">{flag.rolloutPercentage}%</span>
                  </div>
                </div>
                <Switch checked={flag.enabled} onCheckedChange={() => toggleFlag(flag.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* A/B Experiments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black italic uppercase tracking-tight">A/B Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiments.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-background border space-y-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("h-9 w-9 rounded-2xl flex items-center justify-center shrink-0",
                    exp.status === "running" ? "bg-emerald-500/10 text-emerald-600" :
                    exp.status === "paused" ? "bg-amber-500/10 text-amber-600" :
                    "bg-zinc-100 text-zinc-500"
                  )}>
                    {exp.status === "running" ? <Play className="h-4 w-4" /> : exp.status === "paused" ? <PauseCircle className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-black italic uppercase tracking-tight">{exp.name}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{exp.status}</p>
                  </div>
                </div>
                {exp.winner && (
                  <Badge className="bg-amber-500/10 text-amber-700 border-none text-[8px] font-black uppercase px-3">
                    <Trophy className="h-2.5 w-2.5 mr-1" />Winner: {exp.winner}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {["A", "B"].map((v) => (
                  <div key={v} className={cn("p-4 rounded-2xl border-2 text-center space-y-1", exp.winner === v ? "border-amber-400 bg-amber-500/5" : "border-dashed")}>
                    <p className="text-xs font-black italic uppercase tracking-widest">Variant {v}</p>
                    <p className="text-[10px] font-bold text-muted-foreground">{v === "A" ? exp.variantA : exp.variantB}</p>
                    <p className="text-xl font-black italic">{v === "A" ? 100 - exp.trafficSplit : exp.trafficSplit}%</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
