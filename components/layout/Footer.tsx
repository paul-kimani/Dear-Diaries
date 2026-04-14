import Link from 'next/link'
import { Heart, Mail, MapPin, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-turkana-deep text-sand-100">
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-cta-gradient flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <div className="font-outfit font-bold text-white text-xl">Dear Diaries Initiative</div>
              </div>
            </div>
            <p className="text-sand-200/80 text-sm leading-relaxed max-w-sm mb-6">
              We serve all disadvantaged individuals — with a special focus on women who
              cannot afford sanitary pads and disabled people who deserve full participation
              in society. Built on empathy, accountability, and action.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta-600 transition-colors">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X (Twitter)" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta-600 transition-colors">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta-600 transition-colors">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="white" strokeWidth="2"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="white" strokeWidth="2"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta-600 transition-colors">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0D2B3E"/></svg>
              </a>
            </div>

          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/#mission', label: 'Our Mission' },
                { href: '/#impact', label: 'Our Impact' },
                { href: '/financial-literacy', label: 'Financial Hub' },
                { href: '/admin', label: 'Admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand-200/80 hover:text-terracotta-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-sand-200/80">
                <MapPin className="w-4 h-4 text-terracotta-400 mt-0.5 shrink-0" />
                Lodwar, Turkana County, Kenya
              </li>
              <li className="flex items-center gap-2.5 text-sm text-sand-200/80">
                <Mail className="w-4 h-4 text-terracotta-400 shrink-0" />
                paul@deardiaries.org
              </li>
              <li className="flex items-center gap-2.5 text-sm text-sand-200/80">
                <Phone className="w-4 h-4 text-terracotta-400 shrink-0" />
                +254 700 000 000
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sand-200/60 text-sm">
            © {new Date().getFullYear()} Dear Diaries Initiative. All rights reserved.
          </p>
          <p className="text-sand-200/60 text-sm">
            Built with ❤️ by{' '}
            <a
              href="https://github.com/paul-kimani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:text-terracotta-300 transition-colors"
            >
              Paul Mwaniki Kimani
            </a>
            {' '}— SBL Volunteer
          </p>
        </div>
      </div>
    </footer>
  )
}
