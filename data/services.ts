import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'web-development',
    icon: 'Globe',
    name: 'Website Development',
    shortDescription: 'Fast, SEO-optimised websites built with modern frameworks.',
    features: ['Next.js / React', 'Responsive design', 'Performance-first', 'CMS integration'],
    highlighted: false,
  },
  {
    id: 'app-development',
    icon: 'Smartphone',
    name: 'App Development',
    shortDescription: 'Cross-platform mobile apps with native-quality experience.',
    features: ['React Native', 'iOS & Android', 'Offline support', 'App Store deployment'],
    highlighted: false,
  },
  {
    id: 'software-development',
    icon: 'Code2',
    name: 'Software Development',
    shortDescription: 'Custom software solutions built to your exact requirements.',
    features: ['Desktop apps', 'SaaS platforms', 'Enterprise tools', 'API development'],
    highlighted: false,
  },
  {
    id: 'ai-automation',
    icon: 'Bot',
    name: 'AI Automation',
    shortDescription: 'Automate repetitive workflows with intelligent AI pipelines.',
    features: ['LLM integration', 'Process automation', 'Custom AI agents', 'Data pipelines'],
    highlighted: true,
  },
]
