'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslatedData } from '@/hooks/useTranslatedData';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContainer,
} from '@/components/ui/linear-modal';

// ═══ Context ═══
interface ContactDialogContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactDialogContext = createContext<ContactDialogContextType | null>(null);

export function useContactDialog() {
  const ctx = useContext(ContactDialogContext);
  if (!ctx) throw new Error('useContactDialog must be used within ContactDialogProvider');
  return ctx;
}

// ═══ Provider + Dialog ═══
export function ContactDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactDialogContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactDialogPortal isOpen={isOpen} onOpenChange={setIsOpen} />
    </ContactDialogContext.Provider>
  );
}

// ═══ Dialog Portal (rendered once, controlled via context) ═══
function ContactDialogPortal({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (v: boolean) => void }) {
  const { language, isRTL, t } = useLanguage();
  const { personalInfo } = useTranslatedData();

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    try {
      const res = await fetch('https://formspree.io/f/xzzvzrnv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus({
          type: 'success',
          message: language === 'ar' ? 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.' : 'Message sent! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        throw new Error('fail');
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: language === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: personalInfo.socialLinks.github, show: !!personalInfo.socialLinks.github },
    { name: 'LinkedIn', icon: Linkedin, href: personalInfo.socialLinks.linkedin, show: !!personalInfo.socialLinks.linkedin },
    { name: 'Twitter', icon: Twitter, href: personalInfo.socialLinks.twitter, show: !!personalInfo.socialLinks.twitter },
  ].filter((l) => l.show);

  const contactItems = [
    { icon: Mail, label: language === 'ar' ? 'البريد' : 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: language === 'ar' ? 'الهاتف' : 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: language === 'ar' ? 'الموقع' : 'Location', value: personalInfo.location, href: undefined },
  ];

  const inputBase = 'w-full rounded-xl text-sm transition-all duration-200 disabled:opacity-50 outline-none border-2 focus:ring-2 focus:ring-offset-1';
  const inputStyle = {
    backgroundColor: 'var(--input)',
    borderColor: 'var(--border)',
    color: 'var(--foreground)',
    '--tw-ring-color': 'rgba(var(--primary-rgb), 0.3)',
    '--tw-ring-offset-color': 'var(--card)',
  } as React.CSSProperties;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: 'clamp(16px, 2vw, 24px)',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 40px -15px rgba(var(--primary-rgb), 0.15)',
          }}
          className="relative overflow-hidden w-[calc(100vw-2rem)] sm:w-[92%] md:w-[720px] lg:w-[820px] max-h-[calc(100vh-2rem)] sm:max-h-[90vh] pointer-events-auto"
        >
          <div
            className={`flex flex-col md:flex-row overflow-y-auto overflow-x-hidden max-h-[calc(100vh-2rem)] sm:max-h-[90vh] ${isRTL ? 'md:flex-row-reverse' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >

            {/* ═══ SIDEBAR ═══ */}
            <div
              className="relative shrink-0 overflow-hidden md:w-[240px] lg:w-[250px]"
              style={{
                background: 'linear-gradient(160deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 80%, var(--primary)) 100%)',
                color: 'var(--background)',
              }}
            >
              {/* Decorative */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-[0.07]" style={{ backgroundColor: 'var(--background)' }} />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full opacity-[0.05]" style={{ backgroundColor: 'var(--background)' }} />
              <div className="absolute top-1/2 right-0 w-16 h-16 rounded-full opacity-[0.04] hidden md:block" style={{ backgroundColor: 'var(--background)' }} />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'radial-gradient(circle, var(--background) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* ── Mobile: compact horizontal ── */}
              <div className="md:hidden relative z-10 p-5">
                <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <DialogTitle className="text-lg font-bold" style={{ color: 'var(--background)' }}>
                      {t('contact.title')}
                    </DialogTitle>
                    <p className="text-[11px] opacity-60">
                      {language === 'ar' ? 'يسعدني تواصلك معي' : "I'd love to hear from you"}
                    </p>
                  </div>
                  <DialogClose
                    className="p-1.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                  />
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const inner = (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}>
                          <Icon size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider opacity-50 font-medium">{item.label}</p>
                          <p className="text-[12px] font-medium break-all leading-tight opacity-90">{item.value}</p>
                        </div>
                      </div>
                    );
                    if (item.href) return <a key={item.label} href={item.href} className="hover:opacity-80 transition-opacity">{inner}</a>;
                    return <div key={item.label}>{inner}</div>;
                  })}
                </div>

                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                        title={social.name} aria-label={social.name}
                      >
                        <Icon size={14} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* ── Desktop: vertical sidebar ── */}
              <div className="hidden md:flex flex-col p-7 gap-5 relative z-10 h-full">
                <div>
                  <DialogTitle className="text-xl font-bold mb-1.5" style={{ color: 'var(--background)' }}>
                    {t('contact.title')}
                  </DialogTitle>
                  <p className="text-xs opacity-60 leading-relaxed">
                    {language === 'ar' ? 'يسعدني تواصلك معي' : "I'd love to hear from you"}
                  </p>
                </div>

                <div className="flex flex-col gap-3.5">
                  {contactItems.map((item, i) => {
                    const Icon = item.icon;
                    const content = (
                      <motion.div
                        initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover/item:scale-110"
                          style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)', backdropFilter: 'blur(4px)' }}>
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.15em] opacity-50 mb-0.5 font-medium">{item.label}</p>
                          <p className="text-[13px] font-medium break-all leading-snug opacity-90">{item.value}</p>
                        </div>
                      </motion.div>
                    );
                    if (item.href) return <a key={item.label} href={item.href} className="transition-opacity hover:opacity-80">{content}</a>;
                    return <div key={item.label}>{content}</div>;
                  })}
                </div>

                <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb), 0.3) 50%, transparent 100%)' }} />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] opacity-50 mb-3 font-medium">
                    {language === 'ar' ? 'تابعني' : 'Follow me'}
                  </p>
                  <div className="flex gap-2.5">
                    {socialLinks.map((social, i) => {
                      const Icon = social.icon;
                      return (
                        <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
                          style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.2)', backdropFilter: 'blur(4px)' }}
                          title={social.name} aria-label={social.name}
                        >
                          <Icon size={15} />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ═══ FORM PANEL ═══ */}
            <div className="flex-1 min-w-0">
              <div className="p-5 sm:p-6 md:p-7">
                {/* Close — desktop only */}
                <div className={`hidden md:flex ${isRTL ? 'justify-start' : 'justify-end'} mb-4`}>
                  <DialogClose
                    className="p-2 rounded-xl hover:scale-105 transition-all duration-200"
                    style={{ backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }}
                  />
                </div>

                <DialogDescription disableLayoutAnimation>
                  <div>
                    <div className="mb-5 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                        {language === 'ar' ? 'أرسل رسالة' : 'Send a message'}
                      </h3>
                      <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                        {language === 'ar' ? 'املأ النموذج وسأرد عليك في أقرب وقت' : 'Fill out the form and I\'ll get back to you shortly'}
                      </p>
                    </div>

                    <AnimatePresence>
                      {submitStatus.type && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          className="mb-4 sm:mb-5 overflow-hidden"
                        >
                          <div
                            className="flex items-center gap-3 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium"
                            style={{
                              backgroundColor: submitStatus.type === 'success' ? 'var(--success)' : 'var(--error)',
                              color: 'white',
                              opacity: 0.9,
                            }}
                          >
                            {submitStatus.type === 'success' ? <CheckCircle size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
                            <span>{submitStatus.message}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label htmlFor="cd-name" className="block text-[11px] sm:text-xs font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--foreground)' }}>
                            {t('contact.form.name')} <span style={{ color: 'var(--error)' }}>*</span>
                          </label>
                          <input type="text" id="cd-name" name="name" required value={formData.name} onChange={handleChange} disabled={isSubmitting}
                            className={`${inputBase} px-3 py-2.5 sm:px-4 sm:py-3`} style={inputStyle} placeholder={t('contact.form.namePlaceholder')} />
                        </div>
                        <div>
                          <label htmlFor="cd-email" className="block text-[11px] sm:text-xs font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--foreground)' }}>
                            {t('contact.form.email')} <span style={{ color: 'var(--error)' }}>*</span>
                          </label>
                          <input type="email" id="cd-email" name="email" required value={formData.email} onChange={handleChange} disabled={isSubmitting}
                            className={`${inputBase} px-3 py-2.5 sm:px-4 sm:py-3`} style={inputStyle} placeholder={t('contact.form.emailPlaceholder')} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label htmlFor="cd-phone" className="block text-[11px] sm:text-xs font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--foreground)' }}>
                            {t('contact.form.phone')}
                          </label>
                          <input type="tel" id="cd-phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting}
                            className={`${inputBase} px-3 py-2.5 sm:px-4 sm:py-3`} style={inputStyle} placeholder={t('contact.form.phonePlaceholder')} />
                        </div>
                        <div>
                          <label htmlFor="cd-subject" className="block text-[11px] sm:text-xs font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--foreground)' }}>
                            {language === 'ar' ? 'الموضوع' : 'Subject'}
                          </label>
                          <input type="text" id="cd-subject" name="subject" value={formData.subject} onChange={handleChange} disabled={isSubmitting}
                            className={`${inputBase} px-3 py-2.5 sm:px-4 sm:py-3`} style={inputStyle} placeholder={language === 'ar' ? 'موضوع الرسالة' : 'What is this about?'} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cd-message" className="block text-[11px] sm:text-xs font-semibold mb-1 sm:mb-1.5" style={{ color: 'var(--foreground)' }}>
                          {t('contact.form.message')} <span style={{ color: 'var(--error)' }}>*</span>
                        </label>
                        <textarea id="cd-message" name="message" required value={formData.message} onChange={handleChange} disabled={isSubmitting} rows={3}
                          className={`${inputBase} px-3 py-2.5 sm:px-4 sm:py-3 resize-none`} style={inputStyle} placeholder={t('contact.form.messagePlaceholder')} />
                      </div>

                      <button type="submit" disabled={isSubmitting}
                        className={`group/btn w-full flex items-center justify-center gap-2 sm:gap-2.5 px-5 py-3 sm:py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : ''}`}
                        style={{
                          background: 'linear-gradient(135deg, var(--foreground) 0%, color-mix(in srgb, var(--foreground) 85%, var(--primary)) 100%)',
                          color: 'var(--background)',
                          boxShadow: isSubmitting ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        <Send size={15} className={`transition-transform duration-300 ${isSubmitting ? 'animate-pulse' : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'}`} />
                        <span>{isSubmitting ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t('contact.form.send')}</span>
                      </button>
                    </form>
                  </div>
                </DialogDescription>
              </div>
            </div>

          </div>
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
