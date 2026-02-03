# خطة إعادة هيكلة المشروع الشاملة

## الوضع الحالي

### نقاط القوة ✅
- Next.js 15 + React 19 + TypeScript
- نظام ثيمات متكامل (5 ألوان × 2 modes)
- دعم ثنائي اللغة (AR/EN + RTL)
- Tailwind CSS v4
- Motion للحركة

### المشاكل الحالية ❌
1. **Layout معقد**: 5+ طبقات متداخلة
2. **CSS مشتت**: 2700+ سطر في globals.css
3. **لا فصل mobile/desktop**: نفس المكون لكل الأجهزة
4. **Overflow restrictions**: تكسر sticky/scroll
5. **تكرار الكود**: مكونات متشابهة
6. **Context متعدد**: 3 providers متداخلة

---

## المرحلة 1: إعادة هيكلة Layout (الأساس)

### 1.1 Layout الجديد المبسط

**الهيكل الحالي (معقد):**
```
html
└── body
    └── ClientThemeProvider
        └── SidebarProvider
            └── LayoutWrapper
                └── ResponsiveHelper
                    └── div
                        └── Navbar
                        └── main
                            └── container
                                └── ErrorBoundary
                                    └── children
```

**الهيكل الجديد (بسيط):**
```
html
└── body
    └── AppProvider (combined)
        └── Navbar
        └── main.app-layout
            └── children
        └── Footer
```

### 1.2 ملفات Layout الجديدة

```
src/
├── app/
│   └── layout.tsx              # Simplified root layout
├── providers/
│   └── AppProvider.tsx         # Combined: Theme + Language + Device
└── layouts/
    ├── AppLayout.tsx           # Main app shell
    ├── PageLayout.tsx          # Standard page wrapper
    └── ScrollLayout.tsx        # For scroll-heavy pages
```

### 1.3 AppProvider الموحد

```tsx
// providers/AppProvider.tsx
export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DeviceProvider>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </DeviceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
```

---

## المرحلة 2: إعادة هيكلة CSS

### 2.1 تقسيم globals.css

**من:**
```
globals.css (2700+ سطر)
```

**إلى:**
```
src/styles/
├── index.css                   # Entry point (imports)
├── base/
│   ├── reset.css              # CSS reset
│   ├── typography.css         # Font styles
│   └── variables.css          # CSS custom properties
├── layout/
│   ├── containers.css         # Container variants
│   ├── grid.css               # Grid utilities
│   └── scroll.css             # Scroll-specific
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── forms.css
│   └── animations.css
└── themes/
    ├── light.css
    └── dark.css
```

### 2.2 Container System

```css
/* containers.css */

/* Standard - with overflow protection */
.container-base {
  width: 100%;
  max-width: var(--container-max, 1400px);
  margin: 0 auto;
  padding: 0 var(--container-padding, 1rem);
}

/* No restrictions - for scroll sections */
.container-scroll {
  overflow: visible;
  position: relative;
}

/* Full bleed - breaks out of parent */
.container-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

/* Responsive padding only */
.container-fluid {
  padding: 0 clamp(1rem, 5vw, 4rem);
}
```

### 2.3 CSS Variables المحسنة

```css
/* variables.css */
:root {
  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Container */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* Z-Index Scale */
  --z-base: 0;
  --z-above: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-overlay: 400;
  --z-max: 9999;
}
```

---

## المرحلة 3: نظام المكونات

### 3.1 هيكل المكونات الجديد

```
src/components/
├── ui/                         # Atomic UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   ├── Badge/
│   └── index.ts               # Barrel export
│
├── layout/                     # Layout components
│   ├── Navbar/
│   │   ├── Navbar.tsx         # Main component
│   │   ├── NavbarDesktop.tsx
│   │   ├── NavbarMobile.tsx
│   │   └── index.ts
│   ├── Footer/
│   ├── Sidebar/
│   └── index.ts
│
├── sections/                   # Page sections (reusable)
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── HeroDesktop.tsx
│   │   ├── HeroMobile.tsx
│   │   └── index.ts
│   ├── Projects/
│   ├── Blog/
│   ├── CTA/
│   ├── Process/
│   └── index.ts
│
├── scroll/                     # Scroll-based components
│   ├── ScrollProvider.tsx
│   ├── ScrollSection.tsx
│   ├── StackingCards/
│   ├── StickyReveal/
│   ├── ParallaxSection/
│   └── index.ts
│
├── shared/                     # Shared utilities
│   ├── Animations/
│   ├── LoadingStates/
│   ├── ErrorBoundary/
│   └── index.ts
│
└── index.ts                    # Main barrel export
```

### 3.2 مبدأ Desktop/Mobile المنفصل

```tsx
// sections/Hero/index.ts
export { Hero } from './Hero';
export { HeroDesktop } from './HeroDesktop';
export { HeroMobile } from './HeroMobile';

// sections/Hero/Hero.tsx
import { useDevice } from '@/hooks/useDevice';
import { HeroDesktop } from './HeroDesktop';
import { HeroMobile } from './HeroMobile';

export function Hero(props) {
  const { isMobile } = useDevice();

  return isMobile ? (
    <HeroMobile {...props} />
  ) : (
    <HeroDesktop {...props} />
  );
}
```

---

## المرحلة 4: Hooks المحسنة

### 4.1 Hooks الجديدة

```
src/hooks/
├── useDevice.ts               # Device detection + breakpoints
├── useScroll.ts               # Scroll position + direction
├── useIntersection.ts         # Intersection observer
├── useMediaQuery.ts           # Media query listener
├── useTranslation.ts          # Language + t() function
├── useTheme.ts                # Theme + colors
├── useAnimation.ts            # Animation controls
├── useLocalStorage.ts         # Typed localStorage
└── index.ts
```

### 4.2 useDevice Hook

```tsx
// hooks/useDevice.ts
export function useDevice() {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    breakpoint: 'lg',
    width: 1024,
    height: 768,
    orientation: 'landscape',
    isTouchDevice: false,
  });

  // ... implementation

  return {
    ...device,
    isSmall: device.width < 768,
    isMedium: device.width >= 768 && device.width < 1024,
    isLarge: device.width >= 1024,
  };
}
```

### 4.3 useScroll Hook

```tsx
// hooks/useScroll.ts
export function useScroll() {
  return {
    scrollY: number,
    scrollX: number,
    scrollDirection: 'up' | 'down' | null,
    scrollProgress: number, // 0-1
    isScrolling: boolean,
    scrollTo: (options) => void,
  };
}
```

---

## المرحلة 5: تصميم الجوال المنفصل

### 5.1 استراتيجية Mobile-First

| Section | Desktop | Mobile |
|---------|---------|--------|
| **Navbar** | Horizontal + dropdowns | Hamburger + drawer |
| **Hero** | Parallax + particles | Simple fade + swipe |
| **Process** | Stacking cards scroll | Swiper / Accordion |
| **Projects** | Sticky gallery | Horizontal scroll cards |
| **Blog** | Grid + hover effects | Vertical list |
| **Roadmap** | Horizontal timeline | Vertical steps |
| **Contact** | Split layout | Stacked form |

### 5.2 Mobile Components

```
src/components/mobile/
├── MobileNavbar.tsx
├── MobileHero.tsx
├── MobileSwiper.tsx           # For process, projects
├── MobileAccordion.tsx        # Collapsible sections
├── MobileTimeline.tsx         # Vertical timeline
├── MobileBottomSheet.tsx      # Action sheets
├── MobileTabs.tsx             # Tab navigation
└── index.ts
```

### 5.3 Responsive Section Pattern

```tsx
// components/shared/ResponsiveSection.tsx
interface ResponsiveSectionProps {
  desktop: React.ReactNode;
  mobile: React.ReactNode;
  tablet?: React.ReactNode;
  breakpoint?: number;
}

export function ResponsiveSection({
  desktop,
  mobile,
  tablet,
  breakpoint = 1024
}: ResponsiveSectionProps) {
  const { width } = useDevice();

  if (width < 768) return <>{mobile}</>;
  if (width < breakpoint) return <>{tablet || mobile}</>;
  return <>{desktop}</>;
}
```

---

## المرحلة 6: نظام الحركة (Animation System)

### 6.1 Animation Provider

```tsx
// providers/AnimationProvider.tsx
const AnimationContext = createContext({
  prefersReducedMotion: false,
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});

export function AnimationProvider({ children }) {
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );
  const [enabled, setEnabled] = useState(true);

  return (
    <AnimationContext.Provider value={{
      prefersReducedMotion,
      animationsEnabled: enabled && !prefersReducedMotion,
      setAnimationsEnabled: setEnabled,
    }}>
      {children}
    </AnimationContext.Provider>
  );
}
```

### 6.2 Animation Variants

```tsx
// lib/animations.ts
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// Usage
<motion.div variants={slideUp} initial="hidden" animate="visible" />
```

---

## المرحلة 7: Data & State

### 7.1 تنظيم البيانات

```
src/data/
├── personal/
│   ├── info.ts
│   ├── experience.ts
│   ├── education.ts
│   └── skills.ts
├── content/
│   ├── projects/
│   │   ├── index.ts
│   │   └── [project-slug].ts
│   ├── blog/
│   │   ├── index.ts
│   │   └── [post-slug].ts
│   └── services/
├── translations/
│   ├── en/
│   │   ├── common.json
│   │   ├── home.json
│   │   └── projects.json
│   └── ar/
│       ├── common.json
│       ├── home.json
│       └── projects.json
└── config/
    ├── navigation.ts
    ├── themes.ts
    └── site.ts
```

### 7.2 Store (اختياري - للمستقبل)

```
src/store/
├── index.ts
├── themeStore.ts
├── languageStore.ts
└── uiStore.ts
```

---

## المرحلة 8: هيكل الصفحات

### 8.1 Page Templates

```
src/app/
├── layout.tsx                  # Root layout (minimal)
├── page.tsx                    # Home
├── (main)/                     # Group for main pages
│   ├── layout.tsx             # Shared layout
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── contact/
│       └── page.tsx
└── (auth)/                     # Future: protected routes
    └── layout.tsx
```

### 8.2 Page Template

```tsx
// Template for all pages
export default function PageName() {
  return (
    <PageLayout>
      {/* Hero/Header Section */}
      <Section variant="hero">
        <PageHero />
      </Section>

      {/* Content Sections */}
      <Section variant="content">
        <ContentComponent />
      </Section>

      {/* CTA Section */}
      <Section variant="cta">
        <CTA />
      </Section>
    </PageLayout>
  );
}
```

---

## خطة التنفيذ

### الأسبوع 1: الأساسيات
- [ ] إنشاء هيكل المجلدات الجديد
- [ ] تقسيم globals.css إلى ملفات
- [ ] إنشاء AppProvider
- [ ] إنشاء hooks الأساسية (useDevice, useScroll)

### الأسبوع 2: المكونات الأساسية
- [ ] إعادة هيكلة UI components
- [ ] إنشاء Layout components
- [ ] تطبيق Desktop/Mobile pattern

### الأسبوع 3: الأقسام
- [ ] تحويل Hero section
- [ ] تحويل Process section
- [ ] تحويل Projects section
- [ ] تحويل Blog section

### الأسبوع 4: التحسين
- [ ] Scroll components library
- [ ] Animation system
- [ ] Performance optimization
- [ ] Testing + fixes

---

## ملاحظات هامة

### عند البدء
1. أنشئ branch جديد: `git checkout -b refactor/v2`
2. لا تحذف الملفات القديمة فوراً
3. انقل تدريجياً

### الأولويات
1. **Layout & CSS** - الأساس لكل شيء
2. **Hooks** - يستخدمها كل شيء
3. **Components** - بناءً على الـ hooks
4. **Pages** - تجميع المكونات

### معايير النجاح
- [ ] No overflow issues
- [ ] Scroll effects work everywhere
- [ ] Mobile experience is distinct
- [ ] < 100KB initial JS
- [ ] Lighthouse > 90
