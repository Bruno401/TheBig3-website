"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What core services does The Big 3 Digital Solutions provide?",
    answer: "We specialize in driving business growth through tailored digital transformation. Our core services include bespoke web development, mobile app development, custom SaaS product creation, and advanced AI software solutions—including end-to-end AI automation designed to optimize complex workflow processes."
  },
  {
    question: "How do your AI automation solutions benefit specialized industries?",
    answer: "We design and deploy intelligent, no-code and coded AI agents tailored to specific industry demands. Whether it is deploying virtual assistants for medical clinics to manage administrative workflows or integrating smart automation into enterprise operations, our AI software solutions eliminate repetitive tasks, reduce operational costs, and minimize human error."
  },
  {
    question: "What is your team’s experience with bespoke software and application ecosystems?",
    answer: "Our team brings a proven track record of engineering scalable, high-performance digital products, having successfully delivered over 15 targeted projects. Our portfolio spans specialized mobile application ecosystems—including field force automation systems, audit tracking tools, and expense trackers—built for seamless performance and data precision."
  },
  {
    question: "Can you help build and scale a custom SaaS product from scratch?",
    answer: "Yes. We specialize in comprehensive SaaS architecture and product creation. A prime example of our capability is our flagship SaaS product, MenuVerse, which we engineered to streamline operations, ordering, and management for restaurants and cafes. We handle everything from initial database design to scalable cloud deployment."
  },
  {
    question: "Why choose an agile IT firm over a traditional legacy tech agency?",
    answer: "Legacy agencies often come with bureaucratic delays and generic, one-size-fits-all code. As an agile, partner-led digital solutions firm, we prioritize fast execution, software craftsmanship, and deep technical alignment with your business goals. You work directly with dedicated experts who treat your project as their own."
  },
  {
    question: "How does bespoke web and app development support digital transformation?",
    answer: "Off-the-shelf software forces your business to adapt to the limitations of a tool. Bespoke web and app development flips the script by creating software that conforms precisely to your unique operational workflows, giving you a distinct competitive advantage and a foundation for long-term scalability."
  },
  {
    question: "What is the typical process for kicking off a project with your team?",
    answer: "We begin with a deep-dive discovery phase to analyze your current technical infrastructure and business objectives. From there, we map out a clear blueprint for your web, app, or AI automation project, moving rapidly into agile development sprints with transparent milestones and regular deployment updates."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-brand-paper section-padding relative overflow-hidden text-brand-ink">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column - Title & Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="font-display text-display-md mb-8">
              Frequently
              <br />
              asked questions
            </h2>
            <Button 
              className="bg-brand-ink text-brand-white rounded-full hover:bg-brand-purple px-6 h-12"
            >
              Get a demo
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7">
            <div className="border-t border-brand-border">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={index} className="border-b border-brand-border">
                    <button
                      className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-body-lg pr-8">{faq.question}</span>
                      <span className="text-brand-ink-muted flex-shrink-0">
                        {isOpen ? <Minus className="w-5 h-5 stroke-[1.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 text-brand-ink-muted text-body-md pr-12">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
