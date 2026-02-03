'use client';

import { useEffect, useRef } from 'react';

export default function LayoutEnhancer() {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const listenersAttached = useRef(false);

  useEffect(() => {
    // Note: Smooth scrolling handled by Lenis — do NOT set scrollBehavior here

    // Focus management with proper cleanup
    if (!listenersAttached.current) {
      listenersAttached.current = true;

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      };
      const handleMousedown = () => {
        document.body.classList.remove('keyboard-navigation');
      };

      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('mousedown', handleMousedown);

      // Cleanup on unmount
      return () => {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('mousedown', handleMousedown);
        listenersAttached.current = false;
      };
    }
  }, []);

  // Inject global styles once
  useEffect(() => {
    if (styleRef.current) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Focus indicators (NO global * transition — it causes layout thrashing) */
      .keyboard-navigation *:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Scrollbars */
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: var(--background); }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--muted-foreground); }

      /* Shimmer loading state */
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .shimmer {
        background: linear-gradient(90deg, var(--card) 0%, var(--muted) 50%, var(--card) 100%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }

      /* Card hover */
      .card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }

      /* Sidebar hover utilities (replaces inline JS handlers) */
      .sb-collapse-hover {
        background-color: var(--card-bg);
        color: var(--foreground);
        border-color: var(--border);
      }
      .sb-collapse-hover:hover {
        background-color: var(--primary);
        color: white;
        border-color: var(--primary);
      }
      .sb-primary-hover {
        background-color: var(--secondary);
        color: var(--muted);
      }
      .sb-primary-hover:hover {
        background-color: var(--primary);
        color: white;
      }
      .sb-search-hover {
        background-color: var(--secondary);
        border-color: var(--border);
        color: var(--muted);
      }
      .sb-search-hover:hover {
        background-color: var(--primary-soft);
        border-color: var(--primary);
        color: var(--primary);
      }
      .sb-nav-item {
        border: 1px solid transparent;
      }
      .sb-nav-item:not(.sb-nav-active):hover {
        background-color: var(--secondary);
        color: var(--foreground);
        border-color: var(--border);
      }
      .sb-nav-active {
        background-color: var(--primary-soft);
        color: var(--primary);
        border-color: var(--primary);
      }

      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Print */
      @media print {
        * { background: transparent !important; color: black !important; box-shadow: none !important; }
        .no-print { display: none !important; }
      }
    `;

    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, []);

  return null;
}
