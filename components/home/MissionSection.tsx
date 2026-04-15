import Link from 'next/link'
import { ArrowRight, Heart, Accessibility, Users, Package, Shirt } from 'lucide-react'

const missions = [
  {
    id: 'disability',
    icon: Accessibility,
    iconColor: 'text-turkana-light',
    iconBg: 'bg-turkana-light/10',
    badge: 'Since 2011',
    badgeColor: 'bg-turkana-blue/15 text-turkana-blue border-turkana-blue/30',
    gradientFrom: 'from-turkana-blue/10',
    gradientTo: 'to-sand-50',
    borderColor: 'border-turkana-blue/20',
    title: 'Disability Support & Awareness',
    subtitle: 'DISABILITY is not INABILITY.',
    description:
      'We are committed to empowering people with disabilities in Kenya by advocating for their rights and creating a non-discriminative society. We provide essential assistive devices — wheelchairs, walkers, and crutches — to improve mobility and independence for people with disabilities across Kenya.',
    stats: [
      { label: 'People Supported', value: '500+', icon: Users },
      { label: 'Devices Donated', value: '80+', icon: Package },
    ],
    ctaText: 'Learn About Disability Support',
    ctaHref: 'https://deardiaryinitiatives.com/disabilities/',
    accentColor: 'text-turkana-blue',
    glowColor: 'shadow-turkana-blue/10',
  },
  {
    id: 'pads',
    icon: Heart,
    iconColor: 'text-terracotta-400',
    iconBg: 'bg-terracotta-400/10',
    badge: 'Women & Girls',
    badgeColor: 'bg-terracotta-400/15 text-terracotta-600 border-terracotta-400/30',
    gradientFrom: 'from-terracotta-400/10',
    gradientTo: 'to-sand-100',
    borderColor: 'border-terracotta-400/20',
    title: 'Period Poverty',
    subtitle: 'No girl should miss school because of her period.',
    description:
      'Dear Diary Initiatives Kenya distributes reusable sanitary pads to women and girls across Kenya — in Takaungu (Kilifi), Voi, Chanagande and beyond. These initiatives reduce absenteeism among schoolgirls, alleviate the financial burden of monthly menstrual supplies, and promote environmental sustainability.',
    stats: [
      { label: 'Women & Girls Reached', value: '1,200+', icon: Users },
      { label: 'Pads Distributed', value: '8,400+', icon: Package },
    ],
    ctaText: 'Learn About Period Poverty',
    ctaHref: 'https://deardiaryinitiatives.com/period-poverty/',
    accentColor: 'text-terracotta-600',
    glowColor: 'shadow-terracotta-400/10',
  },
  {
    id: 'women',
    icon: Shirt,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-400/10',
    badge: 'Economic Independence',
    badgeColor: 'bg-amber-400/15 text-amber-700 border-amber-400/30',
    gradientFrom: 'from-amber-400/10',
    gradientTo: 'to-sand-50',
    borderColor: 'border-amber-400/20',
    title: 'Women Empowerment',
    subtitle: 'Empowered women, empower the world.',
    description:
      'Only 29% of women in Kenya are considered empowered (UN/KNBS 2020). We donate sewing machines and overlock machines, help women open small businesses (kibanda/hoteli), and tackle root causes: disability, period poverty, lack of education. Financial independence is the fundamental principle of women\'s empowerment.',
    stats: [
      { label: 'Women Empowered', value: '300+', icon: Users },
      { label: 'Machines Donated', value: '40+', icon: Package },
    ],
    ctaText: 'Learn About Women Empowerment',
    ctaHref: 'https://deardiaryinitiatives.com/women-empowerment-2/',
    accentColor: 'text-amber-700',
    glowColor: 'shadow-amber-400/10',
  },
]

export default function MissionSection() {
  return (
    <section id="mission" className="section-padding bg-sand-50">
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-700 text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-4 border border-terracotta-200">
            Our Programmes
          </div>
          <h2 className="font-outfit font-bold text-turkana-deep text-3xl md:text-5xl mb-4">
            Three Pillars. <span className="gradient-text">One Mission.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything we do is rooted in dignity, equity, and the belief that every person —
            regardless of ability, gender, or income — deserves a full and meaningful life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {missions.map((mission) => {
            const Icon = mission.icon
            return (
              <div
                key={mission.id}
                className={`bg-gradient-to-br ${mission.gradientFrom} ${mission.gradientTo} rounded-3xl p-8 border ${mission.borderColor} shadow-xl ${mission.glowColor} card-hover group flex flex-col`}
              >
                <div className={`inline-flex items-center gap-1.5 text-xs font-outfit font-semibold px-3 py-1.5 rounded-full border mb-6 ${mission.badgeColor}`}>
                  {mission.badge}
                </div>

                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${mission.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${mission.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-turkana-deep text-xl mb-1">{mission.title}</h3>
                    <p className={`font-inter text-sm font-medium italic ${mission.accentColor}`}>{mission.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-7 font-inter flex-1">{mission.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-7">
                  {mission.stats.map((stat) => {
                    const StatIcon = stat.icon
                    return (
                      <div key={stat.label} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                        <div className={`font-outfit font-bold text-2xl ${mission.accentColor} mb-1`}>{stat.value}</div>
                        <div className="text-gray-500 text-xs font-inter flex items-center gap-1.5">
                          <StatIcon className="w-3.5 h-3.5" />
                          {stat.label}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Link href={mission.ctaHref} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 font-outfit font-semibold text-sm ${mission.accentColor} group/link`}>
                  {mission.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-turkana-deep rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '2011', label: 'Year Founded' },
            { value: '2,000+', label: 'Lives Impacted' },
            { value: 'CBO #09138', label: 'Registered Org' },
            { value: '30+', label: 'Years of Service' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-outfit font-bold text-3xl md:text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-sand-300/70 text-sm font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
