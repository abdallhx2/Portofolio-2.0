'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useId,
  useEffect,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// ===== Context =====
interface DialogContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog provider');
  }
  return context;
}

// ===== Animation Configuration =====
const springTransition = {
  type: 'spring' as const,
  damping: 25,
  stiffness: 300,
  mass: 0.8,
};

const exitTransition = {
  duration: 0.2,
};

// ===== Main Dialog Provider =====
interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({ children, defaultOpen = false, open: controlledOpen, onOpenChange }: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const setIsOpen = useCallback((value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  }, [isControlled, onOpenChange]);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen, uniqueId, triggerRef }}>
      {children}
    </DialogContext.Provider>
  );
}

// ===== Dialog Trigger =====
interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogTrigger({ children, className, style }: DialogTriggerProps) {
  const { setIsOpen, uniqueId, triggerRef } = useDialog();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-container-${uniqueId}`}
      className={className}
      style={{ ...style, cursor: 'pointer' }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={false}
      aria-haspopup="dialog"
    >
      {children}
    </motion.div>
  );
}

// ===== Dialog Container (Portal) =====
interface DialogContainerProps {
  children: React.ReactNode;
}

export function DialogContainer({ children }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      requestAnimationFrame(() => firstElement?.focus());

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Container */}
          <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ===== Dialog Content =====
interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogContent({ children, className, style }: DialogContentProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      layoutId={`dialog-container-${uniqueId}`}
      className={`pointer-events-auto ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springTransition
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: exitTransition
      }}
    >
      {children}
    </motion.div>
  );
}

// ===== Dialog Title =====
interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogTitle({ children, className, style }: DialogTitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.h2
      layoutId={`dialog-title-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.h2>
  );
}

// ===== Dialog Subtitle =====
interface DialogSubtitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.p
      layoutId={`dialog-subtitle-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.p>
  );
}

// ===== Dialog Description =====
interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableLayoutAnimation?: boolean;
}

export function DialogDescription({
  children,
  className,
  style,
  disableLayoutAnimation = false
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  if (disableLayoutAnimation) {
    return (
      <motion.div
        className={className}
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={`dialog-description-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.div>
  );
}

// ===== Dialog Image =====
interface DialogImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogImage({ src, alt, className, style }: DialogImageProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.img
      layoutId={`dialog-image-${uniqueId}`}
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}

// ===== Dialog Close =====
interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DialogClose({ children, className, style }: DialogCloseProps) {
  const { setIsOpen } = useDialog();

  return (
    <motion.button
      onClick={() => setIsOpen(false)}
      className={className}
      style={style}
      type="button"
      aria-label="Close dialog"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.1 }}
    >
      {children || <X size={20} />}
    </motion.button>
  );
}

// ===== Exports =====
export {
  useDialog,
};
