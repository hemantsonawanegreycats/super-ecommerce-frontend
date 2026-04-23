"use client";

import { useState } from "react";
import JSZip from "jszip";

import { Download, ShieldCheck, FileJson, Clock, FileArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function GDPRPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(10);
    
    try {
      const zip = new JSZip();
      
      // Mock data collection
      const userData = {
        id: "usr_12345",
        name: "Luxury Customer",
        email: "customer@luxury.com",
        addresses: [
          { type: "billing", street: "123 Elegance Ave", city: "London" },
        ],
        preferences: { currency: "USD", language: "en" }
      };

      const orders = [
        { id: "ord_987", date: "2026-04-10", total: 1240.50 },
      ];

      setProgress(40);
      await new Promise(r => setTimeout(r, 800)); // Simulating processing
      
      zip.file("profile.json", JSON.stringify(userData, null, 2));
      zip.file("orders.json", JSON.stringify(orders, null, 2));
      zip.file("GDPR_READ_ME.txt", "This archive contains all personal data associated with your Super-E account as of " + new Date().toISOString());

      setProgress(80);
      const content = await zip.generateAsync({ type: "blob" });
      
      // Native download
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SuperE_PersonalData_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setProgress(100);
      toast.success("Your data export is complete.");
    } catch (error) {
      toast.error("Failed to generate data export.");
    } finally {
      setIsExporting(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Privacy & Data</h1>
        <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-[0.2em]">Manage your personal information according to GDPR standards</p>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-[2.5rem] border-2 shadow-xl shadow-primary/5">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-black italic uppercase tracking-tight">Request Personal Data</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest mt-1">Download a copy of all information stored on our servers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-muted/20 border flex items-center gap-3">
                <FileJson className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] font-black uppercase tracking-widest">JSON Format</span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/20 border flex items-center gap-3">
                <FileArchive className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] font-black uppercase tracking-widest">ZIP Compressed</span>
              </div>
              <div className="p-4 rounded-2xl bg-muted/20 border flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-[10px] font-black uppercase tracking-widest">Instant Prep</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                Your archive will include your profile details, order history, saved addresses, and browsing preferences. 
                This process complies with Article 20 of the GDPR (Right to Data Portability).
              </p>
              
              {isExporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span>Compiling archive...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full h-14 rounded-full font-black italic gap-3 shadow-xl shadow-primary/10"
              >
                <Download className="h-5 w-5" />
                {isExporting ? "PREPARING ARCHIVE..." : "GENERATE DATA EXPORT"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
