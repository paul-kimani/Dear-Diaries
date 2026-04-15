import { ExternalLink, Code2, GraduationCap, Heart } from 'lucide-react'

export default function MyContribution() {
  return (
    <section id="contribution" className="section-padding bg-gradient-to-br from-sand-100 to-sand-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="container-width relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="relative">
                <div className="w-36 h-36 rounded-3xl bg-cta-gradient flex items-center justify-center shadow-2xl shadow-terracotta-400/30 animate-float">
                  <Code2 className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-turkana-blue rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-terracotta-100 text-terracotta-700 text-xs font-outfit font-semibold px-3 py-1.5 rounded-full mb-4 border border-terracotta-200">
                <GraduationCap className="w-3.5 h-3.5" />
                Built with Heart
              </div>
              <h2 className="font-outfit font-bold text-turkana-deep text-3xl md:text-4xl mb-3">
                By Paul Mwaniki Kimani
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-3 max-w-xl">
                I am not the founder — I am simply someone who did my{' '}
                <span className="font-semibold text-terracotta-600">Service-Based Learning</span>{' '}
                with Dear Diary Initiatives Kenya, witnessed the incredible work of Miss Nafisa Khanbhai
                and her team firsthand, and came back wanting to do more.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6 max-w-xl">
                Building this platform is my small contribution to a cause that gave me more than I could
                ever give back. I also personally believe in{' '}
                <span className="font-semibold text-turkana-blue">financial literacy for everyone</span>{' '}
                — and the Financial Literacy Hub here is my way of paying that forward.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a id="portfolio-link" href="https://linkedin.com/in/paul-mwaniki" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 justify-center">
                  <ExternalLink className="w-4 h-4" /> LinkedIn Profile
                </a>
                <a id="github-link" href="https://github.com/paul-kimani" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 justify-center">
                  <Code2 className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Next.js 16', desc: 'App Router + TypeScript' },
              { label: 'Supabase', desc: 'Database + Auth + RLS' },
              { label: 'Paystack', desc: 'M-Pesa + Card Payments' },
              { label: 'Tailwind CSS', desc: 'Custom Design System' },
            ].map((tech) => (
              <div key={tech.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-white/80 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="font-outfit font-bold text-turkana-deep text-sm mb-1">{tech.label}</div>
                <div className="text-gray-500 text-xs font-inter">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
