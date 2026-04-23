"use client";

import { useExperimentWizard } from "@/features/experiments/store";
import { StatisticalSignificanceMeter } from "@/features/experiments/components/StatisticalSignificanceMeter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, TestTube, Target, CalendarDays, Rocket } from "lucide-react";
import type { WizardStep } from "@/features/experiments/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STEPS: { id: WizardStep; title: string; icon: any }[] = [
  { id: "setup", title: "Setup", icon: TestTube },
  { id: "variations", title: "Variations", icon: Target },
  { id: "targeting", title: "Targeting", icon: Target },
  { id: "schedule", title: "Schedule", icon: CalendarDays },
  { id: "review", title: "Review", icon: Rocket },
];

export default function NewExperimentWizard() {
  const { step, draft, setStep, updateDraft, reset } = useExperimentWizard();
  const router = useRouter();

  const stepIndex = STEPS.findIndex(s => s.id === step);

  const nextStep = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1].id);
  };

  const prevStep = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1].id);
  };

  const handleLaunch = () => {
    toast.success("Experiment launched successfully!");
    reset();
    router.push("/vendor/dashboard");
  };

  // Mock confidence calculation
  const calculateConfidence = () => {
    // Basic formula just for UI demonstration
    const base = draft.trafficSplit === 50 ? 98 : draft.trafficSplit > 20 ? 85 : 60;
    const durationMultiplier = draft.durationDays >= 14 ? 1 : draft.durationDays / 14;
    return Math.min(100, Math.round(base * durationMultiplier));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">New A/B Test</h1>
        <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.2em]">
          Experiment Wizard
        </p>
      </div>

      {/* Stepper Header */}
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -z-10 -translate-y-1/2" />
        {STEPS.map((s, i) => {
          const isActive = i === stepIndex;
          const isPast = i < stepIndex;
          return (
            <div key={s.id} className="flex flex-col items-center gap-2 bg-background px-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border-2 transition-all ${
                isActive ? "border-primary bg-primary text-primary-foreground shadow-lg" : 
                isPast ? "border-primary bg-primary/10 text-primary" : 
                "border-muted bg-muted text-muted-foreground"
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="p-8 rounded-[2.5rem] bg-background border shadow-xl shadow-primary/5 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {step === "setup" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black italic uppercase">Basic Details</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experiment Name</Label>
                    <Input value={draft.name} onChange={e => updateDraft({ name: e.target.value })} placeholder="e.g. Red vs Black Checkout Button" className="h-14 rounded-2xl font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Hypothesis</Label>
                    <Textarea value={draft.hypothesis} onChange={e => updateDraft({ hypothesis: e.target.value })} placeholder="I believe that changing..." className="min-h-[100px] rounded-2xl font-medium" />
                  </div>
                </div>
              </div>
            )}

            {step === "variations" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black italic uppercase">Variations</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl border-2 border-dashed space-y-4">
                    <Badge variant="outline" className="text-[10px] font-black uppercase">Control</Badge>
                    <h3 className="font-bold">Original Page</h3>
                    <p className="text-xs text-muted-foreground">The current live version of your page.</p>
                  </div>
                  <div className="p-6 rounded-3xl border-2 border-primary/50 bg-primary/5 space-y-4">
                    <Badge className="text-[10px] font-black uppercase">Variant B</Badge>
                    <Input value={draft.variantBName} onChange={e => updateDraft({ variantBName: e.target.value })} placeholder="Variant Name" className="h-10 rounded-xl" />
                    <p className="text-xs text-muted-foreground">You will configure this variant in the page builder later.</p>
                  </div>
                </div>
              </div>
            )}

            {step === "targeting" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black italic uppercase">Traffic Allocation</h2>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Traffic Split</Label>
                      <span className="font-black italic text-lg">{100 - draft.trafficSplit}% / {draft.trafficSplit}%</span>
                    </div>
                    <Slider
                      value={[draft.trafficSplit]}
                      onValueChange={(val) => {
                        const v = Array.isArray(val) ? val[0] : val;
                        updateDraft({ trafficSplit: v });
                      }}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs font-bold text-muted-foreground">
                      <span>Control (A)</span>
                      <span>Variant (B)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "schedule" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black italic uppercase">Duration & Goals</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Primary Metric</Label>
                    <select 
                      value={draft.primaryMetric} 
                      onChange={e => updateDraft({ primaryMetric: e.target.value as any })}
                      className="w-full h-14 rounded-2xl border bg-background px-4 font-medium"
                    >
                      <option value="conversion_rate">Conversion Rate</option>
                      <option value="click_through_rate">Click-Through Rate</option>
                      <option value="bounce_rate">Bounce Rate</option>
                      <option value="revenue_per_visitor">Revenue per Visitor</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duration (Days)</Label>
                    <Input type="number" value={draft.durationDays} onChange={e => updateDraft({ durationDays: parseInt(e.target.value) || 14 })} className="h-14 rounded-2xl font-medium" />
                  </div>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-black italic uppercase text-center">Ready to Launch 🚀</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-muted/20 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Experiment</p>
                    <p className="font-bold italic text-lg">{draft.name || "Untitled Experiment"}</p>
                    <p className="text-xs text-muted-foreground">{draft.hypothesis}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-muted/20 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Configuration</p>
                    <ul className="text-sm font-medium space-y-1">
                      <li>Metric: <span className="font-bold">{draft.primaryMetric.replace(/_/g, " ")}</span></li>
                      <li>Split: <span className="font-bold">{100 - draft.trafficSplit}% / {draft.trafficSplit}%</span></li>
                      <li>Duration: <span className="font-bold">{draft.durationDays} Days</span></li>
                    </ul>
                  </div>
                </div>

                <StatisticalSignificanceMeter confidence={calculateConfidence()} durationDays={draft.durationDays} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={prevStep} 
          disabled={stepIndex === 0}
          className="rounded-full h-14 px-8 font-black italic uppercase tracking-widest"
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        {stepIndex === STEPS.length - 1 ? (
          <Button 
            size="lg" 
            onClick={handleLaunch}
            className="rounded-full h-14 px-10 font-black italic uppercase tracking-widest shadow-xl"
          >
            Launch Experiment <Rocket className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            size="lg" 
            onClick={nextStep}
            className="rounded-full h-14 px-8 font-black italic uppercase tracking-widest"
          >
            Continue <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
