'use client'
import React, { Fragment } from 'react'

import { Globe, Smartphone, Code2, Bot } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────── */

const services = [
  {
    number: '01',
    title: ['Website', 'Development'],
    tags: ['Next.js', 'React', 'TypeScript', 'SEO', 'Performance'],
    description:
      'We design and develop fast, scalable, and SEO-optimised websites that strengthen your online presence and convert visitors into customers. Every website is built for performance, responsiveness, search visibility, and long-term business growth.',
    Icon: Globe,
    // Subtle dark-to-light card palette using existing brand colors
    bg: '#120E1E',           // brand-ink
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#7562AB',
  },
  {
    number: '02',
    title: ['Application', 'Development'],
    tags: ['Web Apps', 'Mobile Apps', 'UI/UX', 'API Integration', 'Cloud'],
    description:
      'We create modern web and mobile applications tailored to your business processes. From customer-facing platforms to internal business systems, our applications are designed for usability, reliability, and future scalability.',
    Icon: Smartphone,
    bg: '#1E1830',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#7562AB',
  },
  {
    number: '03',
    title: ['Custom Software', '+ AI Development'],
    tags: ['Custom Systems', 'AI Tools', 'Dashboards', 'Automation', 'Analytics'],
    description:
      'We develop custom software solutions and AI-powered platforms that solve complex operational challenges. Whether it is workflow management, business intelligence, predictive systems, or intelligent applications, we build software aligned with your goals.',
    Icon: Code2,
    bg: '#2C2344',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#A392C6',
  },
  {
    number: '04',
    title: ['AI Automation', 'For Business'],
    tags: ['AI Agents', 'Lead Generation', 'CRM', 'Voice AI', 'Workflows'],
    description:
      'Automate repetitive tasks, customer communication, lead qualification, reporting, and operational workflows using advanced AI automation systems. Reduce manual effort, improve efficiency, and allow your team to focus on high-value work.',
    Icon: Bot,
    bg: '#3D3160',
    text: '#FFFFFF',
    tagBg: 'rgba(255,255,255,0.10)',
    tagText: 'rgba(255,255,255,0.75)',
    descColor: 'rgba(255,255,255,0.60)',
    iconColor: '#A392C6',
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
