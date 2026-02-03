'use client';

import { StackingCards } from '@/components/ui/stacking-cards';

interface RoadmapSectionProps {
  t: (key: string) => string;
}

export function RoadmapSection({ t }: RoadmapSectionProps) {
  const roadmapCards = [
    {
      title: t('home.roadmap.ideaDiscussion') || 'مناقشة الفكرة',
      description: t('home.roadmap.ideaDiscussionDesc') || 'نستمع لفكرتك ونناقش كل التفاصيل لنفهم رؤيتك بشكل كامل. نحلل المتطلبات ونحدد الأهداف الواضحة لمشروعك من خلال جلسات حوار معمّقة.',
      icon: '/roadmap/idea.png',
      color: '#5196fd',
      index: 0,
    },
    {
      title: t('home.roadmap.designPlanning') || 'التصميم والتخطيط',
      description: t('home.roadmap.designPlanningDesc') || 'نصمم واجهة المستخدم ونخطط للبنية التقنية بعناية. ننشئ النماذج الأولية والمواصفات التفصيلية لضمان تجربة مستخدم استثنائية.',
      icon: '/roadmap/search.png',
      color: '#8f89ff',
      index: 1,
    },
    {
      title: t('home.roadmap.developmentCoding') || 'التطوير والبرمجة',
      description: t('home.roadmap.developmentCodingDesc') || 'نبدأ بتطوير المشروع باستخدام أحدث التقنيات والمعايير العالمية. كود نظيف، أفضل الممارسات، وتحديثات مستمرة طوال مراحل العمل.',
      icon: '/roadmap/data.png',
      color: '#ed649e',
      index: 2,
    },
    {
      title: t('home.roadmap.launchSupport') || 'الإطلاق والدعم',
      description: t('home.roadmap.launchSupportDesc') || 'نطلق المشروع ونوفر الدعم الفني المستمر والصيانة الدورية. نضمن نشر سلس وتحسينات مستمرة لتحقيق أفضل أداء.',
      icon: '/roadmap/agile.png',
      color: '#10b981',
      index: 3,
    },
  ];

  return (
    <>
      {/* Mobile Header Only */}
      <section className="section-unified lg:hidden">
        <div className="text-center container-unified">
          <h2 className="title-section mb-3" style={{ color: 'var(--foreground)' }}>
            {t('home.roadmap.title') || 'Let\'s Turn Your Idea Into Reality'}
          </h2>
          <p className="text-subtitle max-w-md mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            {t('home.roadmap.subtitle') || 'Your project development journey from start to finish'}
          </p>
        </div>
      </section>

      {/* Stacking Cards with Sticky Title (Desktop) */}
      <StackingCards cards={roadmapCards} />
    </>
  );
}
