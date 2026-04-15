import Image from 'next/image'
import { Award, Heart, Users, Star } from 'lucide-react'

export default function FounderSection() {
  return (
    <section id="founder" className="section-padding bg-turkana-deep relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-terracotta-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-turkana-blue/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="container-width relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-terracotta-600/20 text-terracotta-300 text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-4 border border-terracotta-600/30">
            <Star className="w-3.5 h-3.5 fill-current" />
            About the Founder
          </div>
          <h2 className="font-outfit font-bold text-white text-3xl md:text-5xl mb-4">
            Miss <span className="text-terracotta-400">Nafisa Khanbhai</span>
          </h2>
          <p className="text-sand-300/70 text-lg max-w-xl mx-auto font-inter">
            Physically challenged from birth. Unstoppable for 30 years.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-80 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                <Image
                  src="/founder-nafisa.jpg"
                  alt="Nafisa Khanbhai — Founder of Dear Diary Initiatives Kenya"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Doctorate badge */}
              <div className="absolute -bottom-4 -right-4 bg-terracotta-600 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                <Award className="w-5 h-5" />
                <div>
                  <div className="font-outfit font-bold text-xs">Doctorate</div>
                  <div className="text-terracotta-200 text-xs font-inter">Award Recipient</div>
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div>
            <p className="text-sand-200/90 leading-relaxed text-lg mb-5 font-inter">
              Dear Diary Initiatives Kenya was born from a{' '}
              <span className="text-terracotta-400 font-semibold">stage play</span> — scripted by Nafisa Khanbhai
              in 2006 and performed at the Little Theatre Club in Mombasa. The play portrayed the
              day-to-day struggles and silent battles of a disabled person — battles many take for granted.
            </p>
            <p className="text-sand-200/80 leading-relaxed mb-5 font-inter">
              After <span className="text-white font-semibold">7 successful shows</span>, the story was
              highlighted in national media and received a groundswell of public response. In 2011, what
              began as a Self Help Group became a fully registered Community Based Organisation
              <span className="text-sand-300"> (CBO #09138)</span>.
            </p>
            <p className="text-sand-200/80 leading-relaxed mb-8 font-inter">
              Nafisa has dedicated <span className="text-white font-semibold">30 years</span> to community service —
              serving as president of the Leo Club, Rotaract Club, and Innerwheel Club of Mombasa.
              Her work has been recognised internationally and she has received a Doctorate Award in honour
              of her lifetime of service.
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Heart, label: 'Dignity' },
                { icon: Users, label: 'Equity' },
                { icon: Star, label: 'Inspiration' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-sm">
                  <Icon className="w-5 h-5 text-terracotta-400 mx-auto mb-1.5" />
                  <div className="text-white text-xs font-outfit font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Our Mission',
              text: 'To empower people living with disabilities in Kenya through education, art, community development and advocating for their rights & needs.',
            },
            {
              label: 'Our Vision',
              text: 'A Kenya where people with disabilities are fully included and empowered, enjoying equal rights, opportunities, and a high quality of life.',
            },
            {
              label: 'Our Values',
              text: 'Dignity · Equity · Sustainability · Inspiration · Innovation · Partnership',
            },
          ].map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="font-outfit font-bold text-terracotta-400 text-sm uppercase tracking-wider mb-3">{item.label}</div>
              <p className="text-sand-200/80 font-inter text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
