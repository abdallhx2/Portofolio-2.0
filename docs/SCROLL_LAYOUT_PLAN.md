# خطة إعادة هيكلة Layout و Scroll Components

## المرحلة 1: إنشاء Layout System جديد

### 1.1 إنشاء ScrollLayoutProvider
مكون context يدير:
- حالة التمرير العامة
- التنسيق بين مكونات الـ scroll
- كشف الجهاز (mobile/tablet/desktop)

### 1.2 إعادة هيكلة globals.css
```
globals.css (الأساسي)
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── layout/
│   ├── containers.css      # Container variants
│   ├── scroll-support.css  # Scroll-specific styles
│   └── responsive.css      # Breakpoints
└── components/
    └── animations.css
```

### 1.3 Container Variants
```css
/* Standard container - with overflow protection */
.container-standard { overflow-x: hidden; }

/* Scroll container - allows sticky */
.container-scroll { overflow: visible; }

/* Full-bleed - breaks out of parent */
.container-bleed {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
```

---

## المرحلة 2: مكونات Scroll قابلة لإعادة الاستخدام

### 2.1 مكتبة المكونات
```
src/components/scroll/
├── index.ts
├── ScrollProvider.tsx       # Context للتنسيق
├── ScrollSection.tsx        # Wrapper لأي قسم scroll
├── StackingCards.tsx        # البطاقات المتراكمة
├── StickyReveal.tsx         # محتوى يظهر بالتمرير
├── ParallaxSection.tsx      # تأثير Parallax
├── HorizontalScroll.tsx     # تمرير أفقي
└── hooks/
    ├── useScrollProgress.ts
    ├── useInViewport.ts
    └── useDeviceType.ts
```

### 2.2 ScrollSection Wrapper
```tsx
// يتعامل مع:
// - Hydration تلقائياً
// - CSS breakout إذا لزم
// - Mobile fallback
// - Loading skeleton

<ScrollSection
  type="stacking"
  mobileVariant="accordion"
  fallback={<Skeleton />}
>
  {children}
</ScrollSection>
```

---

## المرحلة 3: تصميم الجوال المنفصل

### 3.1 استراتيجية Mobile-First
| Desktop Component | Mobile Variant |
|-------------------|----------------|
| Stacking Cards    | Swiper/Accordion |
| Sticky Reveal     | Simple Scroll |
| Parallax          | Static + Fade |
| Horizontal Scroll | Vertical Cards |

### 3.2 مكون ResponsiveSection
```tsx
<ResponsiveSection
  desktop={<StackingCards data={steps} />}
  mobile={<MobileAccordion data={steps} />}
  breakpoint={1024}
/>
```

### 3.3 ملفات التصميم المنفصلة
```
src/styles/
├── desktop/
│   ├── hero.css
│   ├── process.css
│   └── projects.css
└── mobile/
    ├── hero.css
    ├── process.css
    └── projects.css
```

---

## المرحلة 4: إعادة هيكلة Layout

### 4.1 Layout الجديد
```tsx
// layout.tsx المبسط
<html>
  <body>
    <ScrollProvider>
      <Navbar />
      <main className="scroll-layout">
        {children}
      </main>
    </ScrollProvider>
  </body>
</html>
```

### 4.2 إزالة الطبقات الزائدة
- ❌ LayoutWrapper (دمج في layout.tsx)
- ❌ ResponsiveHelper (استبدال بـ hooks)
- ❌ Container المتعدد (توحيد)

### 4.3 CSS الجديد
```css
/* Main layout - no overflow restrictions */
.scroll-layout {
  min-height: 100vh;
  position: relative;
}

/* Sections that need scroll effects */
.scroll-section {
  position: relative;
  /* No overflow restrictions */
}

/* Sections that need containment */
.contained-section {
  max-width: var(--max-width);
  margin: 0 auto;
  overflow-x: hidden;
}
```

---

## المرحلة 5: الأقسام المخططة

### 5.1 الصفحة الرئيسية
| القسم | Desktop | Mobile |
|-------|---------|--------|
| Hero | Parallax + Particles | Simple fade |
| Process | Stacking Cards | Swiper |
| Roadmap | Horizontal Timeline | Vertical Steps |
| Projects | Sticky Gallery | Grid Cards |
| Blog | Hover Cards | Simple List |
| CTA | Parallax BG | Static |

### 5.2 صفحة المشاريع
| القسم | Desktop | Mobile |
|-------|---------|--------|
| Filter | Sticky Sidebar | Bottom Sheet |
| Gallery | Masonry + Hover | Grid |
| Detail | Sticky Info | Accordion |

---

## خطوات التنفيذ

### الأسبوع 1: البنية الأساسية
1. [ ] إنشاء ScrollProvider
2. [ ] إنشاء useDeviceType hook
3. [ ] إنشاء ScrollSection wrapper
4. [ ] تحديث globals.css

### الأسبوع 2: المكونات
5. [ ] إنشاء StackingCards (desktop + mobile)
6. [ ] إنشاء StickyReveal
7. [ ] إنشاء ParallaxSection
8. [ ] إنشاء HorizontalScroll

### الأسبوع 3: الصفحة الرئيسية
9. [ ] تحديث HeroSection
10. [ ] تحديث ProcessSection
11. [ ] تحديث RoadmapSection
12. [ ] تحديث ProjectsSection

### الأسبوع 4: التحسين
13. [ ] تحسين الأداء
14. [ ] اختبار الأجهزة
15. [ ] إصلاح المشاكل
16. [ ] التوثيق

---

## ملاحظات تقنية

### لتجنب مشاكل Sticky
```css
/* على html و body */
html, body {
  overflow-x: clip; /* استخدم clip بدل hidden */
}

/* أو الأفضل - لا overflow على الجذر */
html, body {
  /* no overflow restrictions */
}

/* التحكم في الأقسام فقط */
.needs-containment {
  overflow-x: hidden;
}
```

### لـ Hydration
```tsx
// استخدام dynamic import
const ScrollComponent = dynamic(
  () => import('./ScrollComponent'),
  { ssr: false, loading: () => <Skeleton /> }
);
```

### لـ Performance
```tsx
// Lazy load scroll sections
<Suspense fallback={<Skeleton />}>
  <ScrollSection />
</Suspense>
```
