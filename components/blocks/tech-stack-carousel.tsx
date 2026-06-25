"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface TechStackCarouselProps {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const TechStackCarousel = ({
  heading = "Technologies We Master",
  logos = [
    {
      id: "nextjs",
      description: "Next.js",
      image: "https://cdn.simpleicons.org/nextdotjs/1A1A1A",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "react",
      description: "React",
      image: "https://cdn.simpleicons.org/react/61DAFB",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "supabase",
      description: "Supabase",
      image: "https://cdn.simpleicons.org/supabase/3ECF8E",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "postgresql",
      description: "PostgreSQL",
      image: "https://cdn.simpleicons.org/postgresql/4169E1",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "tailwind",
      description: "Tailwind CSS",
      image: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "typescript",
      description: "TypeScript",
      image: "https://cdn.simpleicons.org/typescript/3178C6",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "python",
      description: "Python",
      image: "https://cdn.simpleicons.org/python/3776AB",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "openai",
      description: "OpenAI",
      image: "https://cdn.simpleicons.org/openai/412991",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "nodejs",
      description: "Node.js",
      image: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "vercel",
      description: "Vercel",
      image: "https://cdn.simpleicons.org/vercel/1A1A1A",
      className: "h-8 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all",
    },
  ],
  className,
}: TechStackCarouselProps) => {
  return (
    <section className={`py-12 border-b border-brand-border/40 ${className || ""}`}>
      <div className="container flex flex-col items-center text-center px-4">
        <h2 className="mb-8 text-xl font-medium text-brand-ink/80 tracking-wide uppercase">
          {heading}
        </h2>
      </div>
      <div className="relative mx-auto flex items-center justify-center max-w-[100vw] overflow-hidden lg:max-w-5xl">
        <Carousel
          opts={{ loop: true, dragFree: true }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
          className="w-full"
        >
          <CarouselContent className="ml-0 flex items-center">
            {logos.map((logo) => (
              <CarouselItem
                key={logo.id}
                className="flex basis-1/4 justify-center pl-0 sm:basis-1/5 md:basis-1/6 lg:basis-[14.28%]"
              >
                <div className="mx-6 flex shrink-0 items-center justify-center h-16">
                  <img
                    src={logo.image}
                    alt={logo.description}
                    title={logo.description}
                    className={logo.className}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Gradient Fades for Smooth Scroll Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#fbf9f8] to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fbf9f8] to-transparent"></div>
      </div>
    </section>
  );
};

export { TechStackCarousel };
