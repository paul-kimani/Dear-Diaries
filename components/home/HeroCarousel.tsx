'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/hero-disability.jpg',
    badge: 'Disability Support & Awareness',
    headline: 'DISABILITY\nis not INABILITY',
    subtext: 'Dear Diary Initiatives Kenya has been empowering people living with disabilities since 2011 — providing wheelchairs, advocating for rights, and building a society where every person is seen, heard, and valued.',
    cta: 'Support the Cause',
    ctaSecondary: 'Our Story',
  },
  {
    id: 2,
    image: '/hero-pads.jpg',
    badge: 'Period Poverty',
    headline: 'Reusable Pads,\nEndless Dignity',
    subtext: 'We distribute reusable sanitary pads to women and girls across Kenya — from Takaungu to Voi to Chanagande — keeping girls in school and giving every woman the dignity she deserves.',
    cta: 'Fund Dignity',
    ctaSecondary: 'Learn More',
  },
  {
    id: 3,
    image: '/hero-community.jpg',
    badge: 'Women Empowerment',
    headline: 'Empowered Women,\nEmpower the World',
    subtext: 'Through sewing machines, business support, and financial skills — we help women build economic independence and reshape their futures on their own terms.',
    cta: 'Empower a Woman',
    ctaSecondary: 'Our Mission',
  },
]

const gradients = [
  'linear-gradient(135deg, #0D2B3E 0%, #1B4F72 40%, #8B3A28 100%)',
  'linear-gradient(135deg, #7d5733 0%, #C45E43 50%, #1B4F72 100%)',
  'linear-gradient(135deg, #0D2B3E 0%, #2980B9 40%, #8B3A28 100%)',
]

interface HeroCarouselProps {
  onDonateClick: () => void
}

export default function HeroCarousel({ onDonateClick }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 5500)
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="relative flex-none w-full h-full"
              style={{ background: gradients[i] }}
            >
              {!imageErrors[i] && (
                <Image
                  src={slide.image}
                  alt={slide.badge}
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  onError={() => setImageErrors((prev) => ({ ...prev, [i]: true }))}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-turkana-deep/92 via-turkana-deep/65 to-turkana-deep/20 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-turkana-deep/80 via-transparent to-transparent z-10" />

              <div className="relative z-20 h-full flex items-center">
                <div className="container-width">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-terracotta-600/90 text-white text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      {slide.badge}
                    </div>

                    <h1 className="font-outfit font-bold text-white text-5xl md:text-7xl leading-tight mb-6 animate-slide-up whitespace-pre-line">
                      {slide.headline}
                    </h1>

                    <p className="text-sand-100/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
                      {slide.subtext}
                    </p>

                    <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                      <button
                        id={`hero-donate-${slide.id}`}
                        onClick={onDonateClick}
                        className="btn-primary text-base px-8 py-4"
                      >
                        {slide.cta}
                      </button>
                      <button className="btn-secondary border-white/70 text-white hover:bg-white/10 hover:border-white text-base px-8 py-4">
                        {slide.ctaSecondary}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all group" aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button onClick={scrollNext} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all group" aria-label="Next slide">
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${selectedIndex === i ? 'w-8 h-2.5 bg-terracotta-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
            aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase font-inter">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
