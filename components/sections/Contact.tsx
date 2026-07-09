'use client'

import { motion, Variants, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'

/* ─── Animation variants ──────────────────────────────────────────────── */
const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.25 } }),
}

/* ─── Time-of-day greeting helper ────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  if (h < 21) return 'evening'
  return 'night'
}

/* ─── Cal.com booking modal ──────────────────────────────────────────── */
function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    ;(function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar) }
      const d = C.document
      C.Cal = C.Cal || function () {
        const cal = C.Cal
        const ar = arguments
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || []
          const s = d.createElement('script'); s.src = A
          d.head.appendChild(s); cal.loaded = true
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments) }
          const ns = ar[1]; api.q = api.q || []
          if (typeof ns === 'string') {
            cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, ['initNamespace', ns])
          } else p(cal, ar)
          return
        }
        p(cal, ar)
      }
    })(window as any, 'https://app.cal.com/embed/embed.js', 'init')

    const Cal = (window as any).Cal
    Cal('init', 'book-a-meeting-for-free-demo', { origin: 'https://app.cal.com' })
    Cal.config = Cal.config || {}
    Cal.config.forwardQueryParams = true
    Cal.ns['book-a-meeting-for-free-demo']('inline', {
      elementOrSelector: '#my-cal-inline',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'the-big3/book-a-meeting-for-free-demo',
    })
    Cal.ns['book-a-meeting-for-free-demo']('ui', {
      cssVarsPerTheme: { light: { 'cal-brand': '#120e1e' }, dark: { 'cal-brand': '#E4D8EB' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: isOpen ? 1 : 0.95, y: isOpen ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[999999] p-3 bg-brand-purple hover:bg-brand-purple-light rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="w-full h-full overflow-y-auto" id="my-cal-inline" data-lenis-prevent="true" />
      </motion.div>
    </motion.div>
  )
}

/* ─── Multi-step Contact Modal ───────────────────────────────────────── */
type Step = 'landing' | 'say-hi' | 'project-services' | 'project-budget' | 'project-form'

const SERVICES = ['Website', 'Application', 'Custom Software', 'CRM', 'Ai Software', 'Ai Automation', 'Marketing', 'Graphic Design', 'Social Media Marketing', 'SEO']
const BUDGETS  = ['Under ₹50k', '₹50k–₹1L', '₹1L–₹2.5L', '₹2.5L–₹5L', '₹5L+']

interface FormState {
  name: string; email: string; phone: string; message: string
  company: string; description: string
  services: string[]; budget: string
}

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const [step, setStep] = useState<Step>('landing')
  const [dir, setDir] = useState(1)
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', message: '',
    company: '', description: '', services: [], budget: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [introDone, setIntroDone] = useState(false)
  const greeting = useRef(getGreeting())

  // Sends the form through Web3Forms (client-side, no backend needed — works
  // on the static Hostinger deploy). The access key is public by design: it
  // can only submit this form to the inbox the key was generated for; the
  // destination cannot be changed from the browser. The visitor's `email`
  // field becomes the Reply-To of the delivered mail.
  const handleSubmit = async (formType: 'say-hi' | 'project') => {
    if (sending) return
    setSending(true)
    setSendError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? '',
          subject: `${formType === 'say-hi' ? 'Say Hi' : 'New Project'} enquiry from ${form.name} — thebig3.in`,
          from_name: 'The Big3 Website',
          form_type: formType === 'say-hi' ? 'Say Hi' : 'Start a Project',
          name: form.name,
          email: form.email,
          phone: form.phone || '—',
          company: form.company || '—',
          services: form.services.length > 0 ? form.services.join(', ') : '—',
          budget: form.budget || '—',
          message: formType === 'say-hi' ? form.message : form.description,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setSubmitted(true)
    } catch {
      setSendError('Something went wrong sending your message. Please try again, or email us at info@thebig3.in')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    setIntroDone(false)
    if (!isOpen) return
    const t = setTimeout(() => setIntroDone(true), 1000)
    return () => clearTimeout(t)
  }, [step, isOpen])

  const go = (next: Step, direction = 1) => { setIntroDone(false); setSendError(''); setDir(direction); setStep(next) }

  const toggleService = (s: string) =>
    setForm(f => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s],
    }))

  const isNameValid = form.name.trim().length >= 2
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const isSayHiValid = isNameValid && isEmailValid && form.message.trim().length >= 10
  const isProjectFormValid = isNameValid && isEmailValid && form.description.trim().length >= 10

  const handleClose = () => {
    onClose()
    setTimeout(() => { setIntroDone(false); setStep('landing'); setSubmitted(false); setSendError('') }, 400)
  }

  const inputCls = 'w-full bg-brand-white border border-brand-border rounded-xl px-4 py-3 font-sans text-brand-ink placeholder:text-brand-ink-muted/50 text-body-lg focus:outline-none focus:ring-2 focus:ring-brand-purple/60 transition shadow-sm'
  const chipCls  = (active: boolean) => cn(
    'px-5 py-2.5 rounded-full font-sans font-semibold text-body-md cursor-pointer select-none transition-all',
    active
      ? 'bg-brand-purple text-white shadow-md scale-105'
      : 'bg-brand-paper text-brand-ink hover:bg-brand-lavender/45 border border-brand-border',
  )

  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[99998] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: isOpen ? 1 : 0.94, y: isOpen ? 0 : 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full bg-brand-paper border border-brand-border/60 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col justify-center"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2.5 bg-brand-border/60 hover:bg-brand-border rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-brand-ink" />
        </button>

        {/* ── Step content ── */}
        <div className="flex-1 overflow-y-auto relative flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-24 md:pb-28" data-lenis-prevent="true">
          <AnimatePresence custom={dir} mode="wait">

            {/* LANDING */}
            {step === 'landing' && (
              <motion.div
                key="landing"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center justify-center text-center gap-8 max-w-3xl mx-auto"
              >
                <h2 className="font-display text-display-lg text-brand-ink leading-tight">
                  Hey there! How can we assist you
                  <br />
                  on this{' '}
                  <span className="text-brand-purple">{greeting.current} in Bengaluru, India?</span>
                </h2>
                <motion.div
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{
                    height: introDone ? 'auto' : 0,
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex flex-wrap items-center justify-center gap-3 w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    data-sound-hover="pop"
                    onClick={() => go('project-services')}
                    className="px-6 py-3 rounded-full bg-brand-border border border-brand-border/60 text-brand-ink font-sans font-semibold text-body-md uppercase tracking-wider hover:bg-brand-lavender/50 transition-colors"
                  >
                    Start a project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    data-sound-hover="pop"
                    onClick={() => go('say-hi')}
                    className="px-6 py-3 rounded-full bg-brand-border border border-brand-border/60 text-brand-ink font-sans font-semibold text-body-md uppercase tracking-wider hover:bg-brand-lavender/50 transition-colors"
                  >
                    Say hi
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* SAY HI FORM */}
            {step === 'say-hi' && !submitted && (
              <motion.div
                key="say-hi"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <p className="font-sans text-body-sm uppercase tracking-widest text-brand-ink-muted mb-1">Say hi</p>
                  <h2 className="font-display text-display-lg text-brand-ink">Give us more deets, please!</h2>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{
                    height: introDone ? 'auto' : 0,
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex flex-col gap-3 w-full max-w-md mx-auto"
                >
                  <input className={inputCls} placeholder="Full Name"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder="Email" type="email"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    <input className={inputCls} placeholder="Phone" type="tel"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/[^\d\s+]/g, '') }))} />
                  </div>
                  <textarea className={cn(inputCls, 'min-h-[100px] resize-none')} placeholder="Message" maxLength={2000}
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </motion.div>
              </motion.div>
            )}

            {/* PROJECT STEP 1 — Services */}
            {step === 'project-services' && (
              <motion.div
                key="project-services"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <p className="font-sans text-body-sm uppercase tracking-widest text-brand-ink-muted mb-1">Start a project</p>
                  <h2 className="font-display text-display-lg text-brand-ink leading-tight">
                    Ready to team up? How can we help you?
                  </h2>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{
                    height: introDone ? 'auto' : 0,
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex flex-col items-center gap-2.5 w-full"
                >
                  {/* Row 1: 4 services */}
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {SERVICES.slice(0, 4).map(s => (
                      <button key={s} data-sound-hover="pop" onClick={() => toggleService(s)} className={chipCls(form.services.includes(s))}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {/* Row 2: 3 services */}
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {SERVICES.slice(4, 7).map(s => (
                      <button key={s} data-sound-hover="pop" onClick={() => toggleService(s)} className={chipCls(form.services.includes(s))}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {/* Row 3: 2 services */}
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {SERVICES.slice(7, 9).map(s => (
                      <button key={s} data-sound-hover="pop" onClick={() => toggleService(s)} className={chipCls(form.services.includes(s))}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {/* Row 4: 1 service */}
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {SERVICES.slice(9, 10).map(s => (
                      <button key={s} data-sound-hover="pop" onClick={() => toggleService(s)} className={chipCls(form.services.includes(s))}>
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* PROJECT STEP 2 — Budget */}
            {step === 'project-budget' && (
              <motion.div
                key="project-budget"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <p className="font-sans text-body-sm uppercase tracking-widest text-brand-ink-muted mb-1">Start a project</p>
                  <h2 className="font-display text-display-lg text-brand-ink leading-tight">
                    What&apos;s your budget for this project?
                  </h2>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{
                    height: introDone ? 'auto' : 0,
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex flex-wrap justify-center gap-2.5 w-full"
                >
                  {BUDGETS.map(b => (
                    <button key={b} data-sound-hover="pop" onClick={() => setForm(f => ({ ...f, budget: b }))} className={chipCls(form.budget === b)}>
                      {b}
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* PROJECT STEP 3 — Final form */}
            {step === 'project-form' && !submitted && (
              <motion.div
                key="project-form"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <p className="font-sans text-body-sm uppercase tracking-widest text-brand-ink-muted mb-1">Start a project</p>
                  <h2 className="font-display text-display-lg text-brand-ink leading-tight">
                    Let&apos;s spice it up! Fill out our project form — and let our adventure begin!
                  </h2>
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0, y: 40 }}
                  animate={{
                    height: introDone ? 'auto' : 0,
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 40,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex flex-col gap-3 w-full max-w-md mx-auto"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder="Full Name"
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))} />
                    <input className={inputCls} placeholder="Email" type="email"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input className={inputCls} placeholder="Company" maxLength={100}
                      value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    <input className={inputCls} placeholder="Phone" type="tel"
                      value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/[^\d\s+]/g, '') }))} />
                  </div>
                  <textarea className={cn(inputCls, 'min-h-[100px] resize-none')} placeholder="Project Description" maxLength={2000}
                    value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </motion.div>
              </motion.div>
            )}

            {/* SUCCESS */}
            {submitted && (
              <motion.div
                key="success"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center justify-center text-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-purple/30 flex items-center justify-center text-3xl">🎉</div>
                <div>
                  <h2 className="font-display text-display-lg text-brand-ink">We&apos;ll be in touch!</h2>
                  <p className="font-sans text-body-lg text-brand-ink-muted mt-2">
                    Thanks for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: introDone ? 1 : 0,
                    y: introDone ? 0 : 30,
                  }}
                  onClick={handleClose}
                  className="px-6 py-3 rounded-full bg-brand-purple text-white font-sans font-semibold text-body-md uppercase tracking-wider hover:bg-brand-purple-light transition-colors"
                >
                  Close
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Send failure notice */}
        <AnimatePresence>
          {sendError && !submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-[5.5rem] left-8 right-8 z-50 text-center font-sans text-body-sm text-red-600"
              role="alert"
            >
              {sendError}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Fixed navigation buttons */}
        <AnimatePresence>
          {step !== 'landing' && !submitted && introDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-6 left-8 md:left-16 z-50"
            >
              {step === 'say-hi' && !isSayHiValid && (
                <PillButton
                  label="Go back"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  iconLeft={true}
                  mirrorIcon={true}
                  soundHover={true}
                  onClick={() => go('landing', -1)}
                />
              )}
              {step === 'project-services' && form.services.length === 0 && (
                <PillButton
                  label="Go back"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  iconLeft={true}
                  mirrorIcon={true}
                  soundHover={true}
                  onClick={() => go('landing', -1)}
                />
              )}
              {step === 'project-budget' && form.budget === '' && (
                <PillButton
                  label="Go back"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  iconLeft={true}
                  mirrorIcon={true}
                  soundHover={true}
                  onClick={() => go('project-services', -1)}
                />
              )}
              {step === 'project-form' && !isProjectFormValid && (
                <PillButton
                  label="Go back"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  iconLeft={true}
                  mirrorIcon={true}
                  soundHover={true}
                  onClick={() => go('project-budget', -1)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step !== 'landing' && !submitted && introDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-6 right-8 md:right-16 z-50"
            >
              {step === 'say-hi' && isSayHiValid && (
                <PillButton
                  label={sending ? 'Sending…' : 'Submit'}
                  variant="purple"
                  staticSrc="/gif/approval-static.webp"
                  gifSrc="/gif/approval.gif"
                  soundHover={true}
                  onClick={() => handleSubmit('say-hi')}
                />
              )}
              {step === 'project-services' && form.services.length > 0 && (
                <PillButton
                  label="Continue"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  soundHover={true}
                  onClick={() => go('project-budget')}
                />
              )}
              {step === 'project-budget' && form.budget !== '' && (
                <PillButton
                  label="Continue"
                  variant="light"
                  staticSrc="/gif/arrow-static.webp"
                  gifSrc="/gif/arrow.gif"
                  soundHover={true}
                  onClick={() => go('project-form')}
                />
              )}
              {step === 'project-form' && isProjectFormValid && (
                <PillButton
                  label={sending ? 'Sending…' : 'Submit'}
                  variant="purple"
                  staticSrc="/gif/approval-static.webp"
                  gifSrc="/gif/approval.gif"
                  soundHover={true}
                  onClick={() => handleSubmit('project')}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export interface PillButtonProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  label: string
  variant: 'purple' | 'light'
  staticSrc: string
  gifSrc: string
  iconLeft?: boolean
  mirrorIcon?: boolean
  soundHover?: boolean
}

export function PillButton({ href, onClick, label, variant, staticSrc, gifSrc, iconLeft = false, mirrorIcon = false, soundHover = false }: PillButtonProps) {
  const [state, setState] = useState({ playing: false, key: 0 })

  const handleHover = () => {
    if (state.playing) return
    setState({ playing: true, key: Date.now() })
    setTimeout(() => setState(prev => ({ playing: false, key: prev.key })), 1500)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onClick) onClick(e)
    handleHover()
  }

  const Component: any = href ? motion.a : motion.button

  const iconEl = (
    <motion.div
      className={cn(
        'flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0',
        variant === 'purple' ? 'bg-white' : 'bg-brand-white',
      )}
      whileHover={{ scale: 1.1 }}
      transition={springTransition}
    >
      <Image
        src={state.playing ? `${gifSrc}?t=${state.key}` : staticSrc}
        alt=""
        width={25}
        height={25}
        className={cn("w-5 h-5 md:w-6 md:h-6 object-contain", mirrorIcon && "scale-x-[-1]")}
        unoptimized
      />
    </motion.div>
  )

  return (
    <Component
      href={href}
      aria-label={label}
      data-sound-hover={soundHover ? "pop" : undefined}
      className={cn(
        'flex items-center gap-2 md:gap-4 py-2 md:py-2.5 rounded-full cursor-pointer select-none',
        iconLeft ? 'pl-2 md:pl-2.5 pr-4 md:pr-6' : 'pl-4 md:pl-6 pr-2 md:pr-2.5',
        'font-sans font-semibold text-[14px] md:text-[17.5px] uppercase tracking-wider',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50',
        variant === 'purple' ? 'bg-brand-purple text-white' : 'bg-brand-border text-brand-ink',
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: variant === 'purple' ? '0 6px 24px rgba(0,0,0,0.40)' : '0 6px 24px rgba(0,0,0,0.14)',
      }}
      transition={springTransition}
      style={{
        boxShadow: variant === 'purple' ? '0 2px 12px rgba(0,0,0,0.25)' : '0 2px 10px rgba(0,0,0,0.08)',
      }}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >
      {iconLeft && iconEl}
      <span>{label}</span>
      {!iconLeft && iconEl}
    </Component>
  )
}

/* ─── Contact copy block ─────────────────────────────────────────────── */
function ContactCopy({
  mobile = false,
  onOpenBooking,
  onOpenContact,
}: {
  mobile?: boolean
  onOpenBooking: () => void
  onOpenContact: () => void
}) {
  return (
    <motion.div
      className="flex flex-col items-start"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.h2
        id={mobile ? 'contact-heading-mobile' : 'contact-heading'}
        variants={fadeUp}
        className={cn(
          'font-display text-brand-ink',
          mobile
            ? 'text-[clamp(3.75rem,16vw,5rem)] leading-[0.9]'
            : 'text-[clamp(5.5rem,9.5vw,10rem)] leading-[0.9]',
        )}
      >
        Don&apos;t
        <br />
        Be Shy
      </motion.h2>

      <motion.div
        variants={fadeUp}
        className={cn('flex gap-3', mobile ? 'mt-6 flex-row flex-wrap' : 'mt-10 flex-row flex-wrap')}
      >
        <PillButton
          onClick={(e) => { e.preventDefault(); onOpenBooking() }}
          label="Book a Meeting"
          variant="purple"
          staticSrc="/gif/meeting-static.webp"
          gifSrc="/gif/meeting.gif"
        />
        <PillButton
          onClick={(e) => { e.preventDefault(); onOpenContact() }}
          label="Contact Us"
          variant="light"
          staticSrc="/gif/form-static.webp"
          gifSrc="/gif/form.gif"
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Main export ────────────────────────────────────────────────────── */
export default function Contact() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const handleOpenContact = () => setIsContactOpen(true)
    document.addEventListener('openContactForm', handleOpenContact)
    return () => document.removeEventListener('openContactForm', handleOpenContact)
  }, [])

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-[#fbf9f8]">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* ── Desktop / Tablet (md+) ── */}
      <div className="relative hidden h-[90svh] min-h-[46rem] max-h-[62rem] md:block">
        <Image
          src="/images/conatct_pc.webp"
          alt="The Big 3 mascot sitting on a bench among lavender flowers"
          fill
          sizes="100vw"
          className="object-cover object-right-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,249,248,0.98)_0%,rgba(251,249,248,0.92)_34%,rgba(251,249,248,0.28)_58%,rgba(251,249,248,0)_74%)]"
        />
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-12 lg:px-20">
          <div className="w-[53%] max-w-[46rem] pt-12">
            <ContactCopy
              onOpenBooking={() => setIsBookingOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile (<md) ── */}
      <div className="relative mx-auto aspect-[862/1824] w-full max-w-[47.9rem] md:hidden">
        <Image
          src="/images/contact_mobile.webp"
          alt="The Big 3 mascot sitting with a notebook among lavender flowers"
          fill
          sizes="100vw"
          className="object-contain object-top"
        />
        <div className="absolute inset-x-0 top-[58%] z-10 px-6 pb-8 sm:px-10">
          <ContactCopy
            mobile
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>
      </div>
    </section>
  )
}
