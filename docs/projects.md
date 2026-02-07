# Projects Data — Portfolio Registration

Reference document for adding new projects to `src/data/projects-translations.ts`.

---

## 1. Labib — Smart Learning Agent (لبيب)

### English

- **id**: `labib-app`
- **title**: Labib — Smart Learning Agent
- **shortDescription**: AI-powered educational agent that delivers daily quizzes via Telegram with a teacher analytics dashboard
- **description**: An intelligent educational platform that revolutionizes daily student learning through AI-generated interactive questions delivered via Telegram. The system originated from a real educational gap — students need consistent daily reinforcement, but teachers lack the tools and time to provide it individually. Labib solves this by automatically generating three tailored true/false questions daily from lesson content using advanced AI models, delivering them sequentially through a Telegram bot with immediate constructive feedback and explanations. On the teacher side, a comprehensive Next.js dashboard provides real-time analytics: daily participation rates, individual student performance tracking, weekly and monthly trend reports, and early identification of struggling students. The backend architecture uses FastAPI with Celery for scheduled task processing, Redis for caching and job queuing, and PostgreSQL for persistent data. The entire system is containerized with Docker for reliable deployment and scaling. Labib transforms passive learning into an active daily habit while giving teachers unprecedented visibility into their students' progress.
- **category**: AI Development
- **tags**: ["AI", "Telegram Bot", "FastAPI", "Next.js", "Education"]
- **client**: Personal Project
- **duration**: (TBD)
- **year**: (TBD)
- **featured**: true
- **challenge**: Students lack consistent daily reinforcement outside classrooms, and teachers have no efficient way to monitor individual progress at scale.
- **solution**: An AI-powered Telegram bot that delivers personalized daily questions generated from lesson content, paired with a real-time teacher dashboard for performance analytics and early intervention.
- **result**: A production-ready platform supporting 100+ concurrent students with instant feedback, automated reminders, and comprehensive performance reports that transformed passive learning into an active daily habit.
- **technologies**: ["FastAPI", "Next.js", "PostgreSQL", "Celery", "Redis", "Telegram Bot API", "OpenRouter AI", "Docker"]
- **url**: (Telegram: @labeebAi_bot)
- **github**: (TBD)

### Arabic

- **title**: لبيب — وكيل التعلم الذكي
- **shortDescription**: وكيل تعليمي ذكي يرسل اختبارات يومية عبر تيليجرام مع لوحة تحليلات للمعلمين
- **description**: منصة تعليمية ذكية تعيد تعريف التعلم اليومي للطلاب من خلال أسئلة تفاعلية مولّدة بالذكاء الاصطناعي تُرسل عبر تيليجرام. نشأت الفكرة من فجوة تعليمية حقيقية — الطلاب يحتاجون تعزيزاً يومياً مستمراً، لكن المعلمين يفتقرون للأدوات والوقت لتوفيره بشكل فردي. يحل لبيب هذه المشكلة بتوليد ثلاثة أسئلة صح/خطأ يومياً من محتوى الدروس باستخدام نماذج ذكاء اصطناعي متقدمة، ويرسلها بالتتابع عبر بوت تيليجرام مع تغذية راجعة فورية بناءة وشروحات مفصلة. على جانب المعلم، توفر لوحة تحكم شاملة مبنية بـ Next.js تحليلات لحظية: معدلات المشاركة اليومية، تتبع أداء كل طالب بشكل فردي، تقارير أسبوعية وشهرية للاتجاهات، وكشف مبكر عن الطلاب المتعثرين. البنية الخلفية تستخدم FastAPI مع Celery لمعالجة المهام المجدولة، Redis للتخزين المؤقت وقوائم المهام، وPostgreSQL لتخزين البيانات. النظام بالكامل محتوى بـ Docker للنشر والتوسع الموثوق. لبيب يحول التعلم السلبي إلى عادة يومية نشطة مع منح المعلمين رؤية غير مسبوقة لتقدم طلابهم.
- **category**: تطوير الذكاء الاصطناعي
- **challenge**: الطلاب يفتقرون للتعزيز اليومي المستمر خارج الفصول الدراسية، والمعلمون ليس لديهم طريقة فعالة لمتابعة التقدم الفردي على نطاق واسع.
- **solution**: بوت تيليجرام مدعوم بالذكاء الاصطناعي يرسل أسئلة يومية مخصصة مولّدة من محتوى الدروس، مقترن بلوحة تحكم لحظية للمعلمين لتحليلات الأداء والتدخل المبكر.
- **result**: منصة جاهزة للإنتاج تدعم أكثر من 100 طالب بتغذية راجعة فورية وتذكيرات تلقائية وتقارير أداء شاملة حوّلت التعلم السلبي إلى عادة يومية نشطة.

### Gallery Images Needed

- Dashboard overview screenshot
- Telegram bot conversation screenshot
- Student analytics chart
- Labib robot logo

---

## 2. ALOURA Creative House (ألورا)

### English

- **id**: `aloura-agency`
- **title**: ALOURA — Creative Agency Website
- **shortDescription**: Premium bilingual website for a luxury creative agency specializing in fashion and beauty brands
- **description**: A premium, immersive website for ALOURA Creative House — a luxury creative agency based in Mecca, Saudi Arabia, specializing in creative direction, content creation, and social media management for fashion, beauty, and lifestyle brands. The project demanded a digital experience that matches the agency's high-end positioning: every interaction feels intentional and luxurious. The site features a full-screen hero section with cinematic video backgrounds, smooth Lenis-powered scrolling, and sophisticated animations including 3D globe visualizations built with Three.js, stacking card effects, and vertical testimonial marquees. The bilingual architecture supports seamless switching between English and Arabic with full RTL layout adaptation using next-intl. A functional contact form powered by Resend handles client inquiries directly. The portfolio section showcases the agency's work through high-quality video and image galleries. SEO is handled through dynamic metadata generation, structured JSON-LD markup, and Google Analytics integration. The entire experience is optimized for performance with lazy loading, image optimization, and code splitting while maintaining the visual richness expected of a luxury brand website.
- **category**: Web Development
- **tags**: ["Next.js", "Three.js", "Framer Motion", "Bilingual", "Luxury Design"]
- **client**: ALOURA Creative House
- **duration**: (TBD)
- **year**: (TBD)
- **url**: https://aloura.agency
- **featured**: true
- **challenge**: Building a digital experience that authentically reflects a luxury creative agency's premium positioning while maintaining fast performance and seamless bilingual support.
- **solution**: An immersive Next.js website with cinematic video backgrounds, 3D visualizations, smooth scroll animations, and full Arabic/English bilingual support with RTL adaptation.
- **result**: A visually stunning platform that elevated the agency's digital presence, attracting high-end fashion and beauty clients with a browsing experience that matches the quality of their creative work.
- **technologies**: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Lenis", "next-intl", "Resend"]

### Arabic

- **title**: ألورا — موقع الوكالة الإبداعية
- **shortDescription**: موقع فاخر ثنائي اللغة لوكالة إبداعية متخصصة في براندات الأزياء والجمال
- **description**: موقع فاخر وغامر لـ ALOURA Creative House — وكالة إبداعية راقية مقرها مكة المكرمة، متخصصة في الإخراج الإبداعي وصناعة المحتوى وإدارة السوشال ميديا لبراندات الأزياء والجمال وأسلوب الحياة. المشروع تطلّب تجربة رقمية تضاهي المكانة الفاخرة للوكالة: كل تفاعل مدروس ويعكس الفخامة. يتميز الموقع بقسم Hero بملء الشاشة مع خلفيات فيديو سينمائية، تمرير سلس بتقنية Lenis، وأنيميشن متطور يشمل تصوّرات ثلاثية الأبعاد مبنية بـ Three.js، وتأثيرات بطاقات متراكبة، وشريط شهادات عملاء عمودي متحرك. البنية ثنائية اللغة تدعم التبديل السلس بين الإنجليزية والعربية مع تكيّف كامل لتخطيط RTL باستخدام next-intl. نموذج تواصل وظيفي مدعوم بـ Resend يعالج استفسارات العملاء مباشرة. قسم الأعمال يعرض مشاريع الوكالة عبر معارض فيديو وصور عالية الجودة. السيو يُدار عبر بيانات وصفية ديناميكية وترميز JSON-LD منظم وتكامل Google Analytics. التجربة بالكامل محسّنة للأداء مع التحميل الكسول وتحسين الصور وتقسيم الكود مع الحفاظ على الثراء البصري المتوقع من موقع براند فاخر.
- **category**: تطوير الويب
- **challenge**: بناء تجربة رقمية تعكس بصدق المكانة الفاخرة لوكالة إبداعية راقية مع الحفاظ على أداء سريع ودعم ثنائي اللغة سلس.
- **solution**: موقع غامر بـ Next.js مع خلفيات فيديو سينمائية، تصورات ثلاثية الأبعاد، أنيميشن تمرير سلس، ودعم كامل للعربية والإنجليزية مع تكيف RTL.
- **result**: منصة بصرية مذهلة رفعت الحضور الرقمي للوكالة وجذبت عملاء أزياء وجمال من الدرجة الأولى بتجربة تصفح تضاهي جودة عملهم الإبداعي.

### Gallery Images Needed

- Hero section with video background
- Services stacking cards
- Portfolio gallery
- About page / founder section

---

## 3. Tahawwul — Habit Transformation (تحوّل)

### English

- **id**: `tahawwul-app`
- **title**: Tahawwul — Habit Transformation Platform
- **shortDescription**: Identity-first habit building app based on Atomic Habits and Fogg Behavior Model
- **description**: A scientifically-grounded web application for personal transformation that takes a fundamentally different approach to habit building — starting with identity, not behavior. Built on the proven methodologies of James Clear's Atomic Habits and BJ Fogg's Behavior Model (B=M×A×P), Tahawwul helps users answer "Who do I want to become?" before defining habits that reinforce that identity. The platform features three habit types (Build, Break, Upgrade) structured around the Four Laws of Behavior Change, with each habit mapped to its Cue, Craving, Response, and Reward. The Identity Voting system tracks how every completed habit reinforces the user's chosen identity, creating a powerful feedback loop between action and self-perception. Daily tracking through the Flow interface makes habit logging effortless, while the Habits Scorecard — a direct implementation of the Atomic Habits methodology — lets users audit every daily habit as positive, negative, or neutral. Weekly and monthly reflection reviews provide structured journaling for continuous self-improvement. The gamification layer adds motivation without trivializing the process. Built as a PWA with full Arabic support, the entire experience is designed for the Arab user from the ground up — not a translated afterthought.
- **category**: Web Development
- **tags**: ["Next.js", "TypeScript", "Prisma", "Supabase", "Behavioral Science"]
- **client**: Personal Project
- **duration**: (TBD)
- **year**: (TBD)
- **featured**: false
- **challenge**: Most habit apps focus on streaks and checkboxes without addressing the root — identity change. Users track habits but don't transform.
- **solution**: An identity-first platform built on dual behavioral science frameworks (Atomic Habits + Fogg Model) with structured tracking, daily flow, scorecard auditing, and reflective reviews.
- **result**: A comprehensive Arabic habit transformation platform that bridges the gap between behavioral science theory and daily practice through identity voting, structured habit design, and meaningful self-reflection.
- **technologies**: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "NextAuth", "Framer Motion", "Radix UI"]

### Arabic

- **title**: تحوّل — منصة بناء العادات
- **shortDescription**: تطبيق بناء عادات يبدأ من الهوية مبني على Atomic Habits ونموذج Fogg السلوكي
- **description**: تطبيق ويب مبني على أسس علمية للتحول الشخصي يتبنى نهجاً مختلفاً جذرياً لبناء العادات — يبدأ من الهوية، لا من السلوك. مبني على منهجيات مثبتة من كتاب Atomic Habits لجيمس كلير ونموذج فوق السلوكي (B=M×A×P)، يساعد تحوّل المستخدم في الإجابة على "من أريد أن أكون؟" قبل تحديد العادات التي تعزز تلك الهوية. المنصة تتضمن ثلاثة أنواع من العادات (بناء، كسر، تطوير) مهيكلة حول القوانين الأربعة لتغيير السلوك، مع ربط كل عادة بإشارتها ورغبتها واستجابتها ومكافأتها. نظام تصويت الهوية يتتبع كيف يعزز كل إكمال عادة الهوية المختارة، مما يخلق حلقة تغذية راجعة قوية بين الفعل والإدراك الذاتي. التتبع اليومي عبر واجهة Flow يجعل تسجيل العادات سلساً، بينما بطاقة العادات — تطبيق مباشر لمنهجية Atomic Habits — تتيح للمستخدم تقييم كل عادة يومية كإيجابية أو سلبية أو محايدة. المراجعات الأسبوعية والشهرية توفر تأمل منظم للتحسين المستمر. طبقة التحفيز تضيف دافعاً دون تسطيح العملية. مبني كتطبيق PWA بدعم عربي كامل، التجربة بالكامل مصممة للمستخدم العربي من الأساس — وليست ترجمة لاحقة.
- **category**: تطوير الويب
- **challenge**: أغلب تطبيقات العادات تركز على السلاسل والصناديق دون معالجة الجذر — تغيير الهوية. المستخدمون يتتبعون العادات لكنهم لا يتحولون.
- **solution**: منصة تبدأ من الهوية مبنية على إطارين علميين سلوكيين (Atomic Habits + نموذج Fogg) مع تتبع منظم، تدفق يومي، تدقيق بطاقة العادات، ومراجعات تأملية.
- **result**: منصة عربية شاملة لتحول العادات تسد الفجوة بين النظرية العلمية السلوكية والممارسة اليومية من خلال تصويت الهوية وتصميم عادات منظم وتأمل ذاتي هادف.

### Gallery Images Needed

- Daily Flow tracking interface
- Identity setup screen
- Habits Scorecard
- Weekly review page

---

## 4. Arbaeen Admin Dashboard (الأربعين)

### English

- **id**: `arbaeen-dashboard`
- **title**: Arbaeen — Multi-Tenant Admin Dashboard
- **shortDescription**: Enterprise administrative system for multi-branch transaction management with role-based access control
- **description**: A sophisticated multi-tenant administrative management system built for the Arbaeen General Services Office to centralize operations across multiple branches. The system addresses a critical operational challenge: managing transactions, expenses, and reporting across distributed service points with different staff roles and permission levels. The architecture features entity-based multi-tenancy where each branch operates in an isolated data environment while sharing a unified management layer. Five distinct user roles (Super Admin, Entity Admin, Entity Manager, Employee, Viewer) ensure precise access control at every level. The Admin Portal provides seven comprehensive modules: a metrics dashboard with Recharts visualizations, full transaction lifecycle management with payment status tracking, expense categorization with receipt management, financial reporting with export capabilities, service type configuration, user administration, and entity settings. The Employee Portal offers a focused operations view with assigned task management and personal expense tracking. The system features real-time data aggregation, advanced filtering and search across all modules, soft-delete capability with audit logging, and automatic overdue transaction detection through background cron jobs. Built with full Arabic and English support, RTL layout adaptation, and containerized with Docker for reliable deployment.
- **category**: Web Development
- **tags**: ["Next.js", "Prisma", "Multi-Tenant", "Dashboard", "Enterprise"]
- **client**: Arbaeen General Services Office
- **duration**: (TBD)
- **year**: (TBD)
- **github**: https://github.com/abdallhx2/40offiec.git
- **featured**: false
- **challenge**: Managing distributed service operations across multiple branches with different roles, permissions, and financial tracking requirements under a single unified system.
- **solution**: A multi-tenant enterprise dashboard with entity-based data isolation, five-level role-based access control, dual portals (admin and employee), comprehensive financial tracking, and real-time reporting.
- **result**: Centralized control over all branch operations with precise role management, automated financial reporting, and real-time visibility that eliminated manual tracking and reduced operational overhead.
- **technologies**: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Zustand", "React Query", "Recharts", "Docker"]

### Arabic

- **title**: الأربعين — لوحة تحكم إدارية متعددة المستأجرين
- **shortDescription**: نظام إداري للمؤسسات لإدارة المعاملات متعددة الفروع مع تحكم بالصلاحيات
- **description**: نظام إداري متطور متعدد المستأجرين مبني لمكتب خدمات الأربعين العامة لمركزة العمليات عبر فروع متعددة. يعالج النظام تحدياً تشغيلياً حرجاً: إدارة المعاملات والمصروفات والتقارير عبر نقاط خدمة موزعة بأدوار موظفين ومستويات صلاحيات مختلفة. البنية تعتمد على تعدد المستأجرين القائم على الكيانات حيث يعمل كل فرع في بيئة بيانات معزولة مع مشاركة طبقة إدارة موحدة. خمسة أدوار مستخدم مختلفة (مدير عام، مدير كيان، مشرف كيان، موظف، مشاهد) تضمن تحكماً دقيقاً في الوصول على كل مستوى. بوابة الأدمن توفر سبع وحدات شاملة: لوحة مقاييس مع تصورات Recharts، إدارة كاملة لدورة حياة المعاملات مع تتبع حالة الدفع، تصنيف المصروفات مع إدارة الإيصالات، تقارير مالية مع إمكانية التصدير، إعداد أنواع الخدمات، إدارة المستخدمين، وإعدادات الكيان. بوابة الموظف توفر عرض عمليات مركّز مع إدارة المهام المسندة وتتبع المصروفات الشخصية. يتميز النظام بتجميع بيانات لحظي، تصفية وبحث متقدم عبر جميع الوحدات، حذف ناعم مع سجل تدقيق، وكشف تلقائي للمعاملات المتأخرة عبر مهام خلفية. مبني بدعم كامل للعربية والإنجليزية، تكيف تخطيط RTL، ومحتوى بـ Docker للنشر الموثوق.
- **category**: تطوير الويب
- **challenge**: إدارة عمليات خدمة موزعة عبر فروع متعددة بأدوار وصلاحيات مختلفة ومتطلبات تتبع مالي تحت نظام موحد واحد.
- **solution**: لوحة تحكم مؤسسية متعددة المستأجرين مع عزل بيانات قائم على الكيانات، تحكم صلاحيات من خمسة مستويات، بوابتين (أدمن وموظف)، تتبع مالي شامل، وتقارير لحظية.
- **result**: تحكم مركزي في جميع عمليات الفروع مع إدارة أدوار دقيقة وتقارير مالية تلقائية ورؤية لحظية ألغت التتبع اليدوي وقللت العبء التشغيلي.

### Gallery Images Needed

- Admin dashboard overview
- Transaction management page
- Expense tracking view
- User roles management

---

## 5. Taraf Sweets — E-Commerce (حلويات ترف)

### English

- **id**: `taraf-sweets`
- **title**: Taraf Sweets — Luxury Bakery E-Commerce
- **shortDescription**: Full-featured e-commerce platform for a luxury Saudi bakery with custom orders and multi-payment support
- **description**: A complete e-commerce platform for Taraf Sweets, a luxury bakery and confectionery brand in Saudi Arabia. The platform delivers a premium shopping experience tailored to the Saudi market with an Arabic-first, RTL-first design approach that feels native rather than adapted. The storefront features a warm, inviting design with a teal and coral color palette, playful decorative elements, and wavy section dividers that reflect the brand's personality — approachable luxury. The product catalog supports hierarchical categories, multiple product options (sizes, flavors, customizations), high-quality image galleries, and customer reviews with ratings. The shopping experience includes a smart cart with quantity management, coupon/discount code application, and a streamlined checkout flow with multiple Saudi-specific payment methods: Mada, Apple Pay, Visa/Mastercard, and cash on delivery through Moyasar payment gateway. A standout feature is the custom order system for weddings, birthdays, and corporate events, allowing customers to upload reference images and specify detailed requirements. Customers manage their accounts with order history and real-time tracking, multiple delivery addresses, wishlists, and delivery time slot selection. The admin panel provides complete control: product and category CRUD, order lifecycle management (pending → confirmed → preparing → ready → delivered), coupon management, review moderation, and branch management with Google Maps integration. SMS notifications through Unifonic and email through Resend keep customers informed at every stage. The platform is built on Supabase for database and storage with Sentry for error monitoring.
- **category**: Web Development
- **tags**: ["Next.js", "E-Commerce", "Supabase", "Moyasar", "Arabic-First"]
- **client**: Taraf Sweets
- **duration**: (TBD)
- **year**: (TBD)
- **featured**: false
- **challenge**: Creating a premium e-commerce experience that serves the Saudi market natively with Arabic-first design, local payment methods, custom order capabilities, and branch management for a luxury bakery brand.
- **solution**: A full-stack e-commerce platform with RTL-first warm luxury design, Moyasar payment integration (Mada, Apple Pay), custom order system with image uploads, multi-branch delivery management, and a comprehensive admin panel.
- **result**: A complete digital storefront that translates the bakery's in-store luxury experience to the web, with seamless ordering, local payment support, and operational tools that streamline the entire order lifecycle from placement to delivery.
- **technologies**: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Moyasar", "Unifonic", "Resend", "Google Maps", "Sentry"]

### Arabic

- **title**: حلويات ترف — متجر حلويات فاخر
- **shortDescription**: منصة تجارة إلكترونية متكاملة لحلويات فاخرة سعودية مع طلبات مخصصة ودفع متعدد
- **description**: منصة تجارة إلكترونية متكاملة لحلويات ترف، علامة حلويات ومعجنات فاخرة في المملكة العربية السعودية. المنصة تقدم تجربة تسوق فاخرة مصممة خصيصاً للسوق السعودي بنهج عربي أولاً وتخطيط RTL أولاً يبدو أصيلاً وليس مُكيّفاً. واجهة المتجر تتميز بتصميم دافئ وجذاب بلوحة ألوان تيل وكورال، عناصر زخرفية مرحة، وفواصل أقسام متموجة تعكس شخصية البراند — فخامة ودودة. كتالوج المنتجات يدعم تصنيفات هرمية، خيارات منتج متعددة (أحجام، نكهات، تخصيصات)، معارض صور عالية الجودة، وتقييمات العملاء مع الدرجات. تجربة التسوق تشمل سلة ذكية مع إدارة الكميات، تطبيق أكواد خصم، وتدفق شراء مبسط مع طرق دفع سعودية متعددة: مدى، Apple Pay، فيزا/ماستركارد، والدفع عند الاستلام عبر بوابة Moyasar. ميزة بارزة هي نظام الطلبات المخصصة للأعراس وأعياد الميلاد والمناسبات الرسمية، يتيح للعملاء رفع صور مرجعية وتحديد متطلبات تفصيلية. العملاء يديرون حساباتهم مع سجل الطلبات والتتبع اللحظي، عناوين توصيل متعددة، قائمة أمنيات، واختيار مواعيد التوصيل. لوحة الأدمن توفر تحكماً كاملاً: إدارة المنتجات والتصنيفات، إدارة دورة حياة الطلب (قيد الانتظار ← مؤكد ← قيد التحضير ← جاهز ← تم التوصيل)، إدارة الكوبونات، مراجعة التقييمات، وإدارة الفروع مع تكامل خرائط Google. إشعارات SMS عبر Unifonic وبريد إلكتروني عبر Resend تبقي العملاء على اطلاع في كل مرحلة. المنصة مبنية على Supabase لقاعدة البيانات والتخزين مع Sentry لمراقبة الأخطاء.
- **category**: تطوير الويب
- **challenge**: إنشاء تجربة تجارة إلكترونية فاخرة تخدم السوق السعودي بشكل أصيل مع تصميم عربي أولاً، طرق دفع محلية، إمكانية طلبات مخصصة، وإدارة فروع لبراند حلويات فاخر.
- **solution**: منصة تجارة إلكترونية متكاملة بتصميم فاخر دافئ RTL أولاً، تكامل دفع Moyasar (مدى، Apple Pay)، نظام طلبات مخصصة مع رفع صور، إدارة توصيل متعددة الفروع، ولوحة أدمن شاملة.
- **result**: واجهة متجر رقمية متكاملة تنقل تجربة الفخامة من المحل إلى الويب، مع طلبات سلسة ودعم دفع محلي وأدوات تشغيلية تبسّط دورة حياة الطلب من التقديم حتى التوصيل.

### Gallery Images Needed

- Home page hero with products
- Product details page
- Shopping cart
- Checkout with payment methods
- Custom orders form
- Admin dashboard

---

## 6. VoiceFlow AI — Smart Translator (الترجمان الذكي)

### English

- **id**: `voiceflow-ai`
- **title**: VoiceFlow AI — Smart Voice & Text Platform
- **shortDescription**: AI-powered Arabic/English speech-to-text and text-to-speech platform with content processing capabilities
- **description**: A comprehensive AI platform for bridging spoken and written language with deep Arabic support. VoiceFlow AI was born from a significant gap in the Arabic-language AI tooling landscape — while English speakers have abundant TTS/STT options, Arabic speakers face limited choices with poor dialect handling and accuracy. The platform offers two core AI capabilities: Text-to-Speech with multiple natural-sounding voices in Arabic (Saudi, Egyptian dialects) and English, customizable speed and pitch, and multi-format output (MP3, WAV, OGG); and Speech-to-Text supporting audio files up to 3 hours with automatic speaker diarization, word-level timestamps, and confidence scoring. Beyond the core capabilities, VoiceFlow provides specialized content processing services: a Lecture Processor that transcribes and summarizes educational content, a YouTube Analyzer that downloads and analyzes video content, a Podcast Summarizer, a Meeting Transcriber with speaker identification, and an Interview Converter. All outputs can be exported to PDF, DOCX, Excel, or SRT subtitle formats. The platform features a credit-based pricing system with three tiers (Free, Pro, Enterprise), real-time transcription streaming via WebSocket, background job processing through Inngest, and Redis caching for performance. The audio visualization uses WaveSurfer.js for an intuitive playback experience. The dashboard provides project management, analytics, and usage tracking. Built with Google Cloud Speech/TTS APIs and OpenRouter for AI analysis, with Munsit as an alternative Arabic STT provider for enhanced dialect support.
- **category**: AI Development
- **tags**: ["AI", "Speech-to-Text", "Text-to-Speech", "Arabic NLP", "Next.js"]
- **client**: Personal Project
- **duration**: (TBD)
- **year**: (TBD)
- **featured**: true
- **challenge**: Arabic speakers lack professional AI-powered speech and text tools that handle dialects accurately, support long-form content, and provide multi-format export capabilities.
- **solution**: A comprehensive SaaS platform combining TTS, STT, and content processing with deep Arabic language support, multiple AI providers for optimal accuracy, and professional export formats.
- **result**: An all-in-one voice and text platform serving content creators, educators, and translators with native Arabic support, 3-hour audio processing, speaker diarization, and enterprise-grade export capabilities.
- **technologies**: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Google Cloud TTS/STT", "OpenRouter AI", "WaveSurfer.js", "Redis", "Inngest", "Docker"]

### Arabic

- **title**: الترجمان الذكي — منصة الصوت والنص
- **shortDescription**: منصة ذكاء اصطناعي لتحويل الصوت للنص والنص للصوت بدعم عربي متقدم
- **description**: منصة ذكاء اصطناعي شاملة لربط اللغة المنطوقة والمكتوبة مع دعم عربي عميق. الترجمان الذكي وُلد من فجوة كبيرة في أدوات الذكاء الاصطناعي للغة العربية — بينما يملك المتحدثون بالإنجليزية خيارات وفيرة لتحويل النص والصوت، يواجه المتحدثون بالعربية خيارات محدودة بمعالجة ضعيفة للهجات ودقة متدنية. المنصة تقدم قدرتين أساسيتين: تحويل النص إلى صوت مع أصوات طبيعية متعددة بالعربية (لهجة سعودية، مصرية) والإنجليزية، تخصيص السرعة والنبرة، وإخراج متعدد الصيغ (MP3, WAV, OGG)؛ وتحويل الصوت إلى نص بدعم ملفات حتى 3 ساعات مع تحديد المتحدثين تلقائياً، طوابع زمنية على مستوى الكلمة، ودرجة ثقة. إلى جانب القدرات الأساسية، يوفر الترجمان خدمات معالجة محتوى متخصصة: معالج محاضرات يفرّغ ويلخص المحتوى التعليمي، محلل يوتيوب يحمّل ويحلل محتوى الفيديو، ملخص بودكاست، مفرّغ اجتماعات مع تحديد المتحدثين، ومحوّل مقابلات. جميع المخرجات قابلة للتصدير إلى PDF وDOCX وExcel وصيغة ترجمات SRT. المنصة تعتمد نظام رصيد بثلاث باقات (مجاني، احترافي، مؤسسي)، بث تفريغ لحظي عبر WebSocket، معالجة مهام خلفية عبر Inngest، وتخزين مؤقت Redis للأداء. تصوّر الصوت يستخدم WaveSurfer.js لتجربة تشغيل بديهية. لوحة التحكم توفر إدارة مشاريع وتحليلات وتتبع استخدام. مبني على واجهات Google Cloud Speech/TTS وOpenRouter للتحليل الذكي، مع Munsit كمزود STT عربي بديل لدعم لهجات محسّن.
- **category**: تطوير الذكاء الاصطناعي
- **challenge**: المتحدثون بالعربية يفتقرون لأدوات صوت ونص احترافية مدعومة بالذكاء الاصطناعي تعالج اللهجات بدقة وتدعم المحتوى الطويل وتوفر تصدير متعدد الصيغ.
- **solution**: منصة SaaS شاملة تجمع TTS وSTT ومعالجة المحتوى مع دعم عميق للغة العربية، مزودي AI متعددين للدقة المثلى، وصيغ تصدير احترافية.
- **result**: منصة صوت ونص متكاملة تخدم صناع المحتوى والمحاضرين والمترجمين بدعم عربي أصيل، معالجة صوت حتى 3 ساعات، تحديد المتحدثين، وإمكانيات تصدير بمستوى مؤسسي.

### Gallery Images Needed

- Dashboard with project list
- TTS interface with voice options
- STT transcription with speaker diarization
- Audio waveform visualization
- Export format options

---

المدة والتاريخ غيره مهمة.
2- تم نقل الصور لبعض الواهات للمشاريع استخدم الموجود في /public/project هم:
1-labeb url:https://www.labeeb.pro/
2-lura url :https://www.aloura.agency/
3-
3-مثل ماسجلت في التقرير

## 7. ZeroOne — Programming Education (صفر واحد)

### English

- **id**: `zeroone-platform`
- **title**: ZeroOne — Interactive Programming Education
- **shortDescription**: Arabic-first interactive platform for learning programming from scratch with AI assistant and gamification
- **description**: An Arabic-first interactive educational platform designed to teach programming to absolute beginners from Saudi Arabia and the Arab world. ZeroOne addresses a fundamental gap in Arabic technical education — while platforms like Codecademy and freeCodeCamp have transformed how English speakers learn to code, Arabic speakers still lack a comparable experience built natively for their language and cultural context. The platform implements a learn-by-doing methodology where every concept is immediately practiced through an integrated CodeMirror 6 editor with live HTML/CSS/JS preview, syntax highlighting, autocomplete, and unit test validation. Students write real code from their first lesson, receiving instant visual feedback on their work. A context-aware AI assistant powered by OpenRouter understands the current lesson content and the student's written code, providing hints and explanations in Arabic without giving away complete solutions — encouraging independent problem-solving skills. The content architecture follows a structured hierarchy: Learning Paths contain Courses, which contain Modules, which contain individual Lessons mixing theory, interactive exercises, quizzes, and projects. A comprehensive gamification system drives engagement: XP points for every action, five progression levels (Beginner to Expert), daily learning streaks with a weekly freeze mechanic, achievement badges across four categories, and verifiable PDF certificates with LinkedIn sharing. The platform supports live instructor-led courses through Zoom integration for students who want guided learning. The admin panel features a content management system with versioning, AI-powered content generation agents for scaling course creation, and detailed analytics on user engagement, completion rates, and dropout points. Every interface element is designed RTL-first with Arabic typography using IBM Plex Sans Arabic, bilingual content storage in the database, and logical CSS properties throughout.
- **category**: Web Development
- **tags**: ["Next.js", "EdTech", "CodeMirror", "AI Assistant", "Arabic-First"]
- **client**: Personal Project
- **duration**: (TBD)
- **year**: (TBD)
- **url**: https://zeroone.sa
- **featured**: false
- **challenge**: Arabic speakers lack a native, interactive programming education platform comparable to Codecademy — existing options are either translated poorly or not designed for RTL-first Arabic learning.
- **solution**: An Arabic-first platform with integrated code editor, live preview, context-aware AI assistant, structured learning paths, and comprehensive gamification — all designed RTL-first from the database schema to the UI.
- **result**: A complete educational ecosystem that takes absolute beginners from zero to writing real code through interactive exercises, AI-guided learning, and motivational gamification in their native Arabic language.
- **technologies**: ["Next.js", "TypeScript", "PostgreSQL", "CodeMirror 6", "OpenRouter AI", "Zoom API", "Docker"]

### Arabic

- **title**: صفر واحد — تعليم البرمجة التفاعلي
- **shortDescription**: منصة عربية أولاً لتعلم البرمجة من الصفر مع مساعد ذكي ونظام تحفيز
- **description**: منصة تعليمية تفاعلية عربية أولاً مصممة لتعليم البرمجة للمبتدئين تماماً من السعودية والعالم العربي. صفر واحد يعالج فجوة جوهرية في التعليم التقني العربي — بينما منصات مثل Codecademy وfreeCodeCamp غيّرت طريقة تعلم المتحدثين بالإنجليزية للبرمجة، لا يزال المتحدثون بالعربية يفتقرون لتجربة مماثلة مبنية أصلاً للغتهم وسياقهم الثقافي. المنصة تتبنى منهجية التعلم بالممارسة حيث يُطبّق كل مفهوم فوراً عبر محرر CodeMirror 6 مدمج مع معاينة حية لـ HTML/CSS/JS، تلوين بناء الجملة، إكمال تلقائي، والتحقق بوحدات اختبار. الطلاب يكتبون كود حقيقي من أول درس، ويحصلون على تغذية بصرية فورية على عملهم. مساعد ذكي واعٍ بالسياق مدعوم بـ OpenRouter يفهم محتوى الدرس الحالي والكود المكتوب، يقدم تلميحات وشروحات بالعربية دون كشف الحلول الكاملة — مشجعاً مهارات حل المشكلات المستقلة. بنية المحتوى تتبع تسلسلاً منظماً: مسارات تعلم تحتوي دورات، تحتوي وحدات، تحتوي دروساً فردية تمزج النظرية والتمارين التفاعلية والاختبارات والمشاريع. نظام تحفيز شامل يحرك التفاعل: نقاط XP لكل إجراء، خمسة مستويات تقدم (مبتدئ إلى خبير)، سلاسل تعلم يومية مع ميكانيكية تجميد أسبوعية، شارات إنجاز عبر أربع فئات، وشهادات PDF قابلة للتحقق مع مشاركة LinkedIn. المنصة تدعم دورات حية بقيادة مدرب عبر تكامل Zoom للطلاب الراغبين في تعلم موجّه. لوحة الأدمن تتضمن نظام إدارة محتوى مع إصدارات، وكلاء توليد محتوى بالذكاء الاصطناعي لتوسيع إنشاء الدورات، وتحليلات تفصيلية لتفاعل المستخدمين ومعدلات الإكمال ونقاط الانسحاب. كل عنصر واجهة مصمم RTL أولاً مع خطوط عربية IBM Plex Sans Arabic، تخزين محتوى ثنائي اللغة في قاعدة البيانات، وخصائص CSS منطقية في كل مكان.
- **category**: تطوير الويب
- **challenge**: المتحدثون بالعربية يفتقرون لمنصة تعليم برمجة تفاعلية أصيلة مماثلة لـ Codecademy — الخيارات الحالية إما مترجمة بشكل سيئ أو غير مصممة لتعلم عربي RTL أولاً.
- **solution**: منصة عربية أولاً مع محرر كود مدمج، معاينة حية، مساعد ذكي واعٍ بالسياق، مسارات تعلم منظمة، وتحفيز شامل — كلها مصممة RTL أولاً من مخطط قاعدة البيانات إلى واجهة المستخدم.
- **result**: منظومة تعليمية متكاملة تأخذ المبتدئ تماماً من الصفر إلى كتابة كود حقيقي عبر تمارين تفاعلية، تعلم موجّه بالذكاء الاصطناعي، وتحفيز ممتع بلغته العربية الأم.

### Gallery Images Needed

- Code editor with live preview
- Course catalog / browse page
- Exercise workspace with instructions
- Progress tracking with XP/badges
- AI assistant conversation

---

## Category Additions Needed

Current categories: `Web Development`, `Mobile Development`, `AI Development`, `Security`

New categories needed: **Web Tools** (already exists for Efficiency Tools)

All 7 projects fit within existing categories — no new categories required.

---

## Featured Recommendations

| Project | Featured | Reasoning |
|---------|----------|-----------|
| Labib | **Yes** | Unique AI + Telegram + Dashboard combo, production-ready |
| ALOURA | **Yes** | Real client, live URL, premium design showcase |
| Tahawwul | No | Personal project, MVP stage |
| Arbaeen | No | Enterprise dashboard, less visual appeal for portfolio |
| Taraf Sweets | No | Client project, standard e-commerce |
| VoiceFlow AI | **Yes** | Impressive AI tech stack, unique Arabic NLP focus |
| ZeroOne | No | Educational platform, ambitious scope |
