"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, ShieldCheck, FileText, BarChart2, ArrowUpRight, X, Link2, Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Modals ──────────────────────────────────────────────────────────────────

function KnowMoreModal({ isOpen, onClose, src }: { isOpen: boolean, onClose: () => void, src: string }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-brand-ink/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            className="w-full max-w-6xl h-[90vh] bg-brand-white rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-brand-border bg-brand-paper">
              <span className="font-semibold text-brand-ink text-body-sm px-2">Landing Page Preview</span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-ink hover:bg-brand-border transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe src={src} className="w-full flex-1 border-none bg-brand-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LiveDemoModal({ isOpen, onClose, productName }: { isOpen: boolean, onClose: () => void, productName: string }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-brand-ink/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            className="w-full max-w-lg bg-brand-white rounded-3xl overflow-hidden flex flex-col shadow-2xl relative p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-ink hover:bg-brand-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="font-display text-display-md mb-2">Book a Demo</h3>
            <p className="text-brand-ink-muted mb-8">Schedule a personalized walkthrough of {productName} for your team.</p>
            
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); onClose(); }}>
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Full Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-paper focus:outline-none focus:border-brand-purple" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Work Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-paper focus:outline-none focus:border-brand-purple" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-ink mb-1">Company Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-paper focus:outline-none focus:border-brand-purple" placeholder="Acme Corp" />
              </div>
              <Button type="submit" className="w-full h-12 bg-brand-purple hover:bg-brand-ink text-brand-white rounded-xl mt-2 text-body-md">
                Schedule Demo
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const products = [
  {
    number: "01",
    titleText: "FieldTrack",
    titleItalic: "Pro",
    subtitle: "Field Workforce & Expense Management Platform",
    desc: "Real-time GPS tracking, automated expense approvals, and intelligent analytics for global field teams.",
    features: [
      { icon: MapPin, title: "Live GPS Tracking", desc: "Every 15 minutes" },
      { icon: ShieldCheck, title: "Policy Compliance", desc: "Enforce & Protect" },
      { icon: FileText, title: "Automated Expenses", desc: "OCR & Smart Approvals" },
      { icon: BarChart2, title: "Powerful Analytics", desc: "Insights that matter" }
    ],
    image: "/images/fieldtrack_pro.png",
    bg: "#E4D8EB", // saas 1
    textColor: "text-brand-ink",
    mutedColor: "text-brand-ink/70",
    italicColor: "text-brand-purple",
    featureBg: "bg-brand-white text-brand-purple border-brand-border/50",
    btnPrimary: "bg-brand-ink text-brand-white hover:bg-brand-purple border-transparent",
    btnSecondary: "bg-brand-white border-transparent text-brand-ink hover:bg-brand-paper",
    knowMoreLink: "/products/fieldtrack_pro_global.html",
  },
  {
    number: "02",
    titleText: "Cloud",
    titleItalic: "Comm",
    subtitle: "One System for Every Order, Every Channel",
    desc: "Connect all your sales channels and warehouses in one powerful platform. Automate orders, manage inventory and deliver happy customers.",
    features: [
      { icon: Link2, title: "All Channels", desc: "Shopify, Amazon, Flipkart & more" },
      { icon: Package, title: "Smart Inventory", desc: "Real-time stock across all warehouses" },
      { icon: ShoppingCart, title: "Order Automation", desc: "Pick, Pack, Ship on autopilot" },
      { icon: BarChart2, title: "Real-time Insights", desc: "Analytics that help you decide faster" }
    ],
    image: "/images/cloudcomm.png",
    bg: "#ECE3F1", // saas 2
    textColor: "text-brand-ink",
    mutedColor: "text-brand-ink/70",
    italicColor: "text-brand-purple",
    featureBg: "bg-brand-white text-brand-purple border-brand-border/50",
    btnPrimary: "bg-brand-ink text-brand-white hover:bg-brand-purple border-transparent",
    btnSecondary: "bg-brand-white border-transparent text-brand-ink hover:bg-brand-paper",
    knowMoreLink: "/products/cloudcomm.html",
  },
  {
    number: "03",
    titleText: "Digi",
    titleItalic: "Studio",
    subtitle: "Digital Asset Management & Workflow",
    desc: "Centralize your creative assets, streamline approvals, and distribute content globally.",
    features: [
      { icon: MapPin, title: "Asset Organization", desc: "AI auto-tagging" },
      { icon: ShieldCheck, title: "Version Control", desc: "Never lose a draft" },
      { icon: FileText, title: "Review Workflows", desc: "Client approvals" },
      { icon: BarChart2, title: "Distribution", desc: "CDN powered" }
    ],
    image: "/images/fieldtrack_pro.png",
    bg: "#F5F0F8", // saas 3
    textColor: "text-brand-ink",
    mutedColor: "text-brand-ink/70",
    italicColor: "text-brand-purple",
    featureBg: "bg-brand-white text-brand-purple border-brand-border/50",
    btnPrimary: "bg-brand-ink text-brand-white hover:bg-brand-purple border-transparent",
    btnSecondary: "bg-brand-white border-transparent text-brand-ink hover:bg-brand-paper",
    knowMoreLink: "/products/fieldtrack_pro_global.html", // Fallback for now
  }
]

// ─── Section ───────────────────────────────────────────────────────────────

export default function SaaSProducts() {
  const [activeTab, setActiveTab] = useState(0)
  const [knowMoreOpen, setKnowMoreOpen] = useState(false)
  const [activeKnowMoreUrl, setActiveKnowMoreUrl] = useState("")
  const [demoOpen, setDemoOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState("")

  const handleDemo = (name: string) => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
    document.dispatchEvent(new Event('openContactForm'))
  }

  const handleKnowMore = (url: string) => {
    setActiveKnowMoreUrl(url)
    setKnowMoreOpen(true)
  }

  return (
    <section className="relative bg-brand-white pb-24 md:pb-32" id="products">
      
      {/* Header */}
      <div className="container mx-auto px-5 pb-12 pt-24 md:px-12 md:pb-16 md:pt-32 lg:px-20">
        <div className="mb-8">
          <p className="mb-4 font-sans text-label font-semibold uppercase tracking-[0.12em] text-brand-purple">Our SaaS Products</p>
          <h2 className="font-display max-w-4xl text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-brand-ink mb-6">
            Powerful software built by <br className="hidden sm:block" />The Big3
          </h2>
          <p className="text-body-lg text-brand-ink-muted max-w-3xl">Three products. Endless possibilities. Built to simplify, scale and succeed.</p>
        </div>
      </div>

      {/* Sticky Stack Cards */}
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {products.map((product, i) => {
          // Dynamic top offset so they stack visibly just like services
          const topOffset = `calc(10vh + ${i * 48}px)`

          return (
            <React.Fragment key={product.number}>
              <div
                className="sticky w-full"
                style={{
                  top: topOffset,
                  zIndex: i + 1,
                }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] flex flex-col lg:flex-row shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
                  style={{
                    minHeight: '75vh',
                    background: product.bg,
                  }}
                >
                  
                  {/* Left Content */}
                  <div className={`lg:w-7/12 p-8 md:p-12 lg:p-16 relative z-10 ${product.textColor}`}>
                    
                    <div className="inline-flex items-center gap-2 mb-8">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-600 font-bold text-[11px] uppercase tracking-widest">Active Now</span>
                    </div>

                    <h3 className="font-display text-[3rem] md:text-[4rem] leading-[1.1] mb-6 tracking-tight">
                      {product.titleText} <span className={`italic ${product.italicColor}`}>{product.titleItalic}</span>
                    </h3>
                    
                    <p className="text-xl md:text-2xl font-medium mb-4">
                      {product.subtitle}
                    </p>
                    
                    <p className={`text-body-lg mb-10 max-w-xl leading-relaxed ${product.mutedColor}`}>
                      {product.desc}
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border ${product.featureBg}`}>
                            <feature.icon className="w-5 h-5 stroke-[2]" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">{feature.title}</h4>
                            <p className={`text-body-sm ${product.mutedColor}`}>{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        onClick={() => handleKnowMore(product.knowMoreLink)}
                        className={`h-14 px-8 rounded-xl text-body-md font-semibold flex items-center gap-2 shadow-lg border ${product.btnPrimary}`}
                      >
                        Know More
                        <ArrowUpRight className="w-5 h-5" />
                      </Button>
                      <Button 
                        onClick={() => handleDemo(`${product.titleText} ${product.titleItalic}`)}
                        variant="outline"
                        className={`h-14 px-8 rounded-xl text-body-md font-semibold flex items-center gap-2 shadow-sm border ${product.btnSecondary}`}
                      >
                        Live Demo
                        <ArrowUpRight className="w-5 h-5" />
                      </Button>
                    </div>

                  </div>

                  {/* Right Image */}
                  <div className="lg:w-5/12 relative min-h-[350px] lg:min-h-0 flex items-center justify-center p-8 lg:p-12 lg:pr-16">
                    <Image 
                      src={product.image} 
                      alt={`${product.titleText} Dashboard`} 
                      width={1000} 
                      height={800} 
                      className="w-full h-auto max-w-[500px] lg:max-w-none object-contain drop-shadow-2xl"
                      priority={i === 0}
                    />
                  </div>
                </div>

                {/* Invisible spacer to align physical bottom edges so all cards un-stick simultaneously */}
                <div style={{ height: `${(products.length - 1 - i) * 48}px` }} aria-hidden="true" />
              </div>

              {/* Scroll distance spacer between cards (and after the last card) */}
              <div style={{ height: '50vh' }} aria-hidden="true" />
            </React.Fragment>
          )
        })}
      </div>

      <KnowMoreModal 
        isOpen={knowMoreOpen} 
        onClose={() => setKnowMoreOpen(false)} 
        src={activeKnowMoreUrl} 
      />
      <LiveDemoModal 
        isOpen={demoOpen} 
        onClose={() => setDemoOpen(false)} 
        productName={activeProduct}
      />
    </section>
  )
}
