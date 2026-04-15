'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DonationModal from '@/components/donation/DonationModal'
import { BookOpen, Play, ArrowRight, GraduationCap, Clock } from 'lucide-react'
import { FinancialNote, VideoLink } from '@/types'

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

interface Props {
  notes: Partial<FinancialNote>[]
  videos: VideoLink[]
}

export default function FinancialLiteracyClient({ notes, videos }: Props) {
  const [donationOpen, setDonationOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <>
      <Navbar onDonateClick={() => setDonationOpen(true)} />
      <main className="min-h-screen bg-sand-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-turkana-deep to-turkana-blue section-padding pt-32">
          <div className="container-width text-center">
            <div className="inline-flex items-center gap-2 bg-terracotta-600/30 border border-terracotta-400/40 text-terracotta-400 text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-5">
              <GraduationCap className="w-3.5 h-3.5" />
              Financial Literacy Hub
            </div>
            <h1 className="font-outfit font-bold text-white text-4xl md:text-6xl mb-5">
              Knowledge is the <span className="gradient-text">Foundation</span> of Freedom
            </h1>
            <p className="text-sand-200/80 text-xl max-w-2xl mx-auto font-inter leading-relaxed">
              Free financial education for <em>everyone</em> — regardless of income or background.
              Learn to budget, save, and build a more secure future. Curated by
              {' '}<span className="text-terracotta-400 font-semibold">Paul Mwaniki Kimani</span>,
              a volunteer who served in Turkana and continues to give back.
            </p>
          </div>
        </section>

        {/* Video section */}
        {videos.length > 0 && (
          <section className="section-padding">
            <div className="container-width">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Video Lessons</h2>
                  <p className="text-gray-500 font-inter">Watch and learn at your own pace</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Play className="w-4 h-4" />
                  {videos.length} videos
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => {
                  const videoId = getYouTubeId(video.youtube_url)
                  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null

                  return (
                    <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-sand-100 group">
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-turkana-deep overflow-hidden">
                        {activeVideo === video.id ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            {thumbnail && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            )}
                            <div className="absolute inset-0 bg-turkana-deep/40 flex items-center justify-center">
                              <button
                                onClick={() => setActiveVideo(video.id)}
                                className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg pl-1"
                              >
                                <Play className="w-6 h-6 text-turkana-deep fill-current" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-outfit font-bold text-turkana-deep text-base mb-1">{video.title}</h3>
                        {video.description && (
                          <p className="text-gray-500 text-sm font-inter line-clamp-2">{video.description}</p>
                        )}
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(video.added_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Notes section */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Reading Materials</h2>
                <p className="text-gray-500 font-inter">In-depth articles and guides</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <BookOpen className="w-4 h-4" />
                {notes.length} articles
              </div>
            </div>

            {notes.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-inter">No articles published yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => (
                  <Link
                    key={note.id}
                    href={`/financial-literacy/${note.slug}`}
                    className="group bg-sand-50 hover:bg-sand-100 rounded-2xl p-6 border border-sand-100 hover:border-sand-200 transition-all card-hover block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-terracotta-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-terracotta-600" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-terracotta-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-outfit font-bold text-turkana-deep text-xl mb-2 group-hover:text-terracotta-700 transition-colors">
                      {note.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-inter">
                      <Clock className="w-3 h-3" />
                      {note.published_at
                        ? new Date(note.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Recently published'}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <DonationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} />
    </>
  )
}
