"use client";

import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FileQuestion,
}: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center min-h-[450px] border-2 border-dashed rounded-3xl bg-muted/5 border-muted/20"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-muted/50 to-muted shadow-inner mb-8"
      >
        <Icon className="h-10 w-10 text-muted-foreground/70" />
      </motion.div>
      <h3 className="text-2xl font-bold tracking-tight mb-3">{title}</h3>
      <p className="text-muted-foreground max-w-[320px] mb-10 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button 
          size="lg" 
          onClick={onAction} 
          className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
