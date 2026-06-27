'use client'
import React, { Fragment } from 'react'

import { MonitorSmartphone, Database, TrendingUp, ShieldCheck, Bot } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────── */

const services = [
  {
    number: '01',
    title: ['Web + App', 'Development'],
    tags: ['NEXT.JS', 'REACT NATIVE', 'SaaS ARCHITECTURE', 'MOBILE ECOSYSTEMS', 'FULL-STACK', 'UI/UX DESIGN', 'SCALABILITY'],
    description:
      'We architect scalable, high-performance web platforms and bespoke mobile ecosystems tailored to your exact workflows. From complex SaaS product architectures to specialized field force automation apps, we build robust digital tools designed for long-term business growth.',
    Icon: MonitorSmartphone,
    bg: '#120E1E',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#7562AB',
  },
  {
    number: '02',
    title: ['ERP, CRM &', 'Custom AI Software'],
    tags: ['CUSTOM ERP', 'CRM SYSTEMS', 'AI SOFTWARE', 'DATA INTEGRATION', 'ENTERPRISE SaaS', 'BUSINESS INTELLIGENCE', 'WORKFLOWS'],
    description:
      'Centralize critical operations and eliminate fragmented data silos with bespoke ERP and CRM architectures. We embed tailored AI software layers directly into your central systems to turn complex enterprise datasets into predictive, actionable business intelligence.',
    Icon: Database,
    bg: '#1E1830',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#7562AB',
  },
  {
    number: '03',
    title: ['Digital', 'Marketing'],
    tags: ['B2B SEO', 'PERFORMANCE MARKETING', 'LEAD GENERATION', 'CONTENT STRATEGY', 'GROWTH HACKING', 'ROI OPTIMIZATION', 'BRANDING'],
    description:
      'Accelerate your market footprint and acquire high-value clients with performance-driven digital marketing frameworks. We leverage rigorous technical SEO and data-first growth strategies to transform your web assets into active, self-sustaining lead-generation engines.',
    Icon: TrendingUp,
    bg: '#2C2344',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#A392C6',
  },
  {
    number: '04',
    title: ['Cyber', 'Security'],
    tags: ['THREAT DETECTION', 'DATA PRIVACY', 'VULNERABILITY ASSESSMENT', 'CLOUD SECURITY', 'COMPLIANCE', 'ENCRYPTION', 'DEFENSE'],
    description:
      'Protect your digital applications and intellectual property from sophisticated, evolving enterprise security threats. We implement proactive vulnerability management, end-to-end encryption, and rigid cloud guardrails to ensure resilient, compliant operational security.',
    Icon: ShieldCheck,
    bg: '#3D3160',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#A392C6',
  },
  {
    number: '05',
    title: ['AI Automation', 'For Business'],
    tags: ['AI AUTOMATION', 'AI AGENTS', 'WHATSAPP CHATBOTS', 'AI VOICE CALLING', 'PRODUCT WRAPPING', 'VIRTUAL ASSISTANTS', 'NLP TOOLS'],
    description:
      'Supercharge day-to-day efficiency by deploying autonomous AI voice calling, smart WhatsApp bots, and specialized virtual assistants. We engineer custom AI automation to eliminate repetitive workflows, significantly reducing operational overhead for your business 24/7.',
    Icon: Bot,
    bg: '#4F407A',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#C4B5FD',
  },
]

/* ─── Component ───────────────────────────────────────────── */

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-brand-white pb-24 md:pb-32"
    >
      {/* ── Heading block ── */}
      <div className="container mx-auto px-5 pb-12 pt-24 md:px-12 md:pb-16 md:pt-32 lg:px-20">
        <p className="mb-4 font-sans text-label font-semibold uppercase tracking-[0.12em] text-brand-purple">
          Services
        </p>
        <h2
          id="services-heading"
          className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-brand-ink"
        >
          We build digital systems that help businesses grow, automate, and scale.
        </h2>
      </div>

      {/* ── Sticky stack ── */}
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {services.map((service, i) => {
          const { Icon } = service
          // Calculate dynamic top offset so cards stack visibly
          const topOffset = `calc(10vh + ${i * 48}px)`

          return (
            <React.Fragment key={service.number}>
              <div
                className="sticky w-full"
                style={{
                  top: topOffset,
                  zIndex: i + 1,
                }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
                  style={{
                    height: '75vh',
                    background: service.bg,
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* ── Inner card content ── */}
                  <div className="flex h-full flex-col justify-between p-8 md:p-12 lg:p-16">
                    {/* Top row: number */}
                    <div className="flex items-start justify-between">
                      <span
                        className="font-sans text-xs font-semibold uppercase tracking-[0.14em]"
                        style={{ color: service.iconColor }}
                      >
                        Service {service.number}
                      </span>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        <Icon
                          className="h-5 w-5 md:h-6 md:w-6"
                          style={{ color: service.iconColor }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Middle: title + tags */}
                    <div className="flex flex-col gap-6 md:gap-8">
                      <h3
                        className="font-display leading-[0.92] tracking-[-0.03em]"
                        style={{
                          color: service.text,
                          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                        }}
                      >
                        {service.title[0]}
                        <br />
                        <span style={{ opacity: 0.6 }}>{service.title[1]}</span>
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 font-sans text-xs font-medium uppercase tracking-wider md:px-4 md:py-1.5 md:text-[11px]"
                            style={{
                              background: service.tagBg,
                              color: service.tagText,
                              border: '1px solid rgba(255,255,255,0.12)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: description */}
                    <p
                      className="max-w-[600px] font-sans text-sm leading-relaxed md:text-base lg:text-lg"
                      style={{ color: service.descColor }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Subtle top-right glow accent */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full md:h-96 md:w-96"
                    style={{
                      background: `radial-gradient(circle, ${service.iconColor}22 0%, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Invisible spacer to align physical bottom edges so all cards un-stick simultaneously */}
                <div style={{ height: `${(services.length - 1 - i) * 48}px` }} aria-hidden="true" />
              </div>

              {/* Scroll distance spacer between cards (and after the last card) */}
              <div style={{ height: '50vh' }} aria-hidden="true" />
            </React.Fragment>
          )
        })}
      </div>
    </section>
  )
}
