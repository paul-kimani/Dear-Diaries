import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('financial_notes')
    .select('title, content')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  return {
    title: data ? `${data.title} | Financial Hub` : 'Article Not Found',
    description: data?.content.slice(0, 160) || '',
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: note } = await supabase
    .from('financial_notes')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!note) notFound()

  const wordCount = note.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200) // ~200 wpm

  return (
    <main className="min-h-screen bg-sand-50">
      {/* Top bar */}
      <div className="bg-turkana-deep py-4">
        <div className="container-width">
          <Link
            href="/financial-literacy"
            className="inline-flex items-center gap-2 text-sand-200 hover:text-white text-sm font-inter transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Financial Hub
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-turkana-deep to-turkana-blue py-16">
        <div className="container-width max-w-3xl">
          <div className="flex items-center gap-4 text-sand-300/70 text-sm font-inter mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(note.published_at || note.created_at).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime} min read
            </span>
          </div>
          <h1 className="font-outfit font-bold text-white text-3xl md:text-5xl leading-tight">
            {note.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-width max-w-3xl py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sand-100 prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>

        <div className="mt-8 text-center">
          <Link href="/financial-literacy" className="btn-secondary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Read more articles
          </Link>
        </div>
      </div>
    </main>
  )
}
