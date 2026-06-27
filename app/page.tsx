import {
  Hero,
  About,
  Services,
  SaaSProducts,
  Team,
  Portfolio,
  FAQ,
  Contact,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <SaaSProducts />
      <Team />
      <FAQ />
      <Contact />
    </>
  )
}
