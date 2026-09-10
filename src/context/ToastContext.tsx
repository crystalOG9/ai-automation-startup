"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: {
    success: (title: string, description?: string, duration?: number) => void;
    error: (title: string, description?: string, duration?: number) => void;
    info: (title: string, description?: string, duration?: number) => void;
    warning: (title: string, description?: string, duration?: number) => void;
    custom: (item: Omit<ToastItem, "id">) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string, duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItem = { id, type, title, description, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const toastMethods = {
    success: (title: string, description?: string, duration?: number) =>
      addToast("success", title, description, duration),
    error: (title: string, description?: string, duration?: number) =>
      addToast("error", title, description, duration),
    info: (title: string, description?: string, duration?: number) =>
      addToast("info", title, description, duration),
    warning: (title: string, description?: string, duration?: number) =>
      addToast("warning", title, description, duration),
    custom: (item: Omit<ToastItem, "id">) =>
      addToast(item.type, item.title, item.description, item.duration),
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
      case "error":
        return "border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]";
      case "warning":
        return "border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]";
      case "info":
      default:
        return "border-brand-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
    }
  };

  return (
    <ToastContext.Provider value={{ toast: toastMethods, removeToast }}>
      {children}
      {/* Toast Notification HUD Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-4 rounded-2xl bg-[#090d16]/95 backdrop-blur-xl border ${getBorderColor(
                t.type
              )} flex items-start justify-between gap-3 text-white`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {getToastIcon(t.type)}
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white">
                    {t.title}
                  </div>
                  {t.description && (
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {t.description}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-muted-foreground hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-white/10"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
