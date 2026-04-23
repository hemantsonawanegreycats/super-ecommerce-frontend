"use client";

import { AlertTriangle, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  isFatal?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We're having trouble loading this content. Please try again later.",
  onRetry,
  isFatal = false,
}: ErrorStateProps) {
  const Icon = isFatal ? ServerCrash : AlertTriangle;
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center min-h-[450px] border-2 border-destructive/10 rounded-3xl bg-destructive/[0.02]"
    >
      <motion.div 
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5, repeat: 0 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 shadow-inner mb-8"
      >
        <Icon className="h-10 w-10 text-destructive" />
      </motion.div>
      <h3 className="text-2xl font-bold tracking-tight text-destructive/90 mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-[320px] mb-10 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onRetry} 
          className="rounded-full px-8 border-destructive/20 text-destructive hover:bg-destructive/5 active:scale-95 transition-all"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
