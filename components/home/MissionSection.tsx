import Link from 'next/link'
import { ArrowRight, Heart, Utensils, Users, Package, Accessibility } from 'lucide-react'

const missions = [
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
    title: 'Reusable Sanitary Pads',
    subtitle: 'Dignity that lasts. Empowerment that endures.',
    description:
      'Period poverty keeps girls out of school and limits women\'s full participation in society. Our locally manufactured reusable sanitary pads provide a dignified, eco-friendly, and affordable solution — especially for women in Turkana who face the greatest barriers to access.',
    stats: [
      { label: 'Women Served', value: '1,200+', icon: Users },
      { label: 'Pads Distributed', value: '8,400+', icon: Package },
    ],
    ctaText: 'Learn About the Pads Programme',
    ctaHref: '/#pads',
    accentColor: 'text-terracotta-600',
    glowColor: 'shadow-terracotta-400/10',
  },
  {
    id: 'disability',
    icon: Accessibility,
    iconColor: 'text-turkana-light',
    iconBg: 'bg-turkana-light/10',
    badge: 'Disabled Individuals',
    badgeColor: 'bg-turkana-blue/15 text-turkana-blue border-turkana-blue/30',
    gradientFrom: 'from-turkana-blue/10',
    gradientTo: 'to-sand-50',
    borderColor: 'border-turkana-blue/20',
    title: 'Disability Support Programme',
    subtitle: 'Every person deserves a life of dignity and opportunity.',
    description:
      'Disadvantaged individuals living with disabilities are among the most underserved in our communities. Through targeted support, assistive resources, and community integration programmes, we work to ensure no one is left behind — regardless of their ability.',
    stats: [
      { label: 'Individuals Supported', value: '320+', icon: Users },
      { label: 'Community Partners', value: '8', icon: Package },
    ],
    ctaText: 'Learn About the Disability Programme',
    ctaHref: '/#disability',
    accentColor: 'text-turkana-blue',
    glowColor: 'shadow-turkana-blue/10',
  },
]

export default function MissionSection() {
  return (
    <section id="mission" className="section-padding bg-sand-50">
      <div className="container-width">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-700 text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-4 border border-terracotta-200">
            Our Two Pillars
          </div>
          <h2 className="font-outfit font-bold text-turkana-deep text-3xl md:text-5xl mb-4">
            Two Missions. <span className="gradient-text">One Purpose.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We serve all disadvantaged individuals — with a special focus on women who cannot afford
            sanitary pads, and disabled people who are too often forgotten. Dignity is not a privilege.
          </p>
        </div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {missions.map((mission) => {
            const Icon = mission.icon
            return (
              <div
                key={mission.id}
                className={`bg-gradient-to-br ${mission.gradientFrom} ${mission.gradientTo} rounded-3xl p-8 border ${mission.borderColor} shadow-xl ${mission.glowColor} card-hover group`}
              >
                {/* Badge */}
                <div className={`inline-flex items-center gap-1.5 text-xs font-outfit font-semibold px-3 py-1.5 rounded-full border mb-6 ${mission.badgeColor}`}>
                  {mission.badge}
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${mission.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${mission.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-turkana-deep text-2xl mb-1">{mission.title}</h3>
                    <p className={`font-inter text-sm font-medium italic ${mission.accentColor}`}>{mission.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-7 font-inter">{mission.description}</p>

                {/* Stats */}
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

                {/* CTA */}
                <Link
                  href={mission.ctaHref}
                  className={`inline-flex items-center gap-2 font-outfit font-semibold text-sm ${mission.accentColor} group/link`}
                >
                  {mission.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Global stats bar */}
        <div className="mt-16 bg-turkana-deep rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,500+', label: 'Lives Impacted' },
            { value: 'KES 2.1M', label: 'Raised to Date' },
            { value: '8', label: 'Community Partners' },
            { value: '4', label: 'Years Operating' },
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
