'use client'

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
} from 'sonner';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'error' | 'warning';
type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'ghost';
}

interface ToasterProps {
  title?: string;
  message: string;
  variant?: Variant;
  duration?: number;
  position?: Position;
  actions?: ActionButton;
  onDismiss?: () => void;
  highlightTitle?: boolean;
}

export interface ToasterRef {
  show: (props: ToasterProps) => void;
}

// Global showToast helper
type ShowToastFn = (props: ToasterProps) => void;
let globalShowToast: ShowToastFn | null = null;

export const showToast: ShowToastFn = (props) => {
  if (globalShowToast) {
    globalShowToast(props);
  } else {
    console.warn('Toaster is not mounted yet.');
  }
};

const variantStyles: Record<Variant, string> = {
  default: "bg-white/10 dark:bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-white/20 dark:border-white/10 shadow-xl shadow-black/10 text-foreground",
  success: "bg-white/10 dark:bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-green-500/25 dark:border-green-400/20 shadow-xl shadow-green-900/10 text-foreground",
  error: "bg-white/10 dark:bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-red-500/25 dark:border-red-400/20 shadow-xl shadow-red-900/10 text-foreground",
  warning: "bg-white/10 dark:bg-black/20 backdrop-blur-xl backdrop-saturate-150 border border-amber-500/25 dark:border-amber-400/20 shadow-xl shadow-amber-900/10 text-foreground",
};

const titleColor: Record<Variant, string> = {
  default: 'text-foreground',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-destructive',
  warning: 'text-amber-600 dark:text-amber-400',
};

const iconColor: Record<Variant, string> = {
  default: 'text-muted-foreground',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-destructive',
  warning: 'text-amber-600 dark:text-amber-400',
};

const variantIcons: Record<Variant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.95 },
};

const Toaster = forwardRef<ToasterRef, { defaultPosition?: Position }>(
  ({ defaultPosition = 'bottom-right' }, ref) => {
    const showFn = ({
      title,
      message,
      variant = 'default',
      duration = 4000,
      position = defaultPosition,
      actions,
      onDismiss,
      highlightTitle,
    }: ToasterProps) => {
      const Icon = variantIcons[variant];

      sonnerToast.custom(
        (toastId) => (
          <motion.div
            variants={toastAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'flex items-center justify-between w-full max-w-xs p-3 rounded-xl border shadow-lg',
              variantStyles[variant]
            )}
          >
            <div className="flex items-start gap-2">
              <Icon className={cn('h-4 w-4 mt-0.5 flex-shrink-0', iconColor[variant])} />
              <div className="space-y-0.5">
                {title && (
                  <h3
                    className={cn(
                      'text-xs font-medium leading-none',
                      titleColor[variant],
                      highlightTitle && titleColor['success'] // override for meeting case
                    )}
                  >
                    {title}
                  </h3>
                )}
                <p className="text-xs text-muted-foreground">{message}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {actions?.label && (
                <Button
                  variant={actions.variant || 'outline'}
                  size="sm"
                  onClick={() => {
                    actions.onClick();
                    sonnerToast.dismiss(toastId);
                  }}
                  className={cn(
                    'cursor-pointer',
                    variant === 'success'
                      ? 'text-green-600 border-green-600 hover:bg-green-600/10 dark:hover:bg-green-400/20'
                      : variant === 'error'
                      ? 'text-destructive border-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20'
                      : variant === 'warning'
                      ? 'text-amber-600 border-amber-600 hover:bg-amber-600/10 dark:hover:bg-amber-400/20'
                      : 'text-foreground border-border hover:bg-muted/10 dark:hover:bg-muted/20'
                  )}
                >
                  {actions.label}
                </Button>
              )}

              <button
                onClick={() => {
                  sonnerToast.dismiss(toastId);
                  onDismiss?.();
                }}
                className="rounded-full p-1 hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Dismiss notification"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ),
        { duration, position }
      );
    };

    useImperativeHandle(ref, () => ({
      show: showFn,
    }));

    useEffect(() => {
      globalShowToast = showFn;
      return () => {
        globalShowToast = null;
      };
    }, [defaultPosition]);

    return (
      <SonnerToaster
        position={defaultPosition}
        toastOptions={{ unstyled: true, className: 'flex justify-end' }}
      />
    );
  }
);

Toaster.displayName = 'Toaster';

export default Toaster;
