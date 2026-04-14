'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { VideoLink } from '@/types'
import { Video, Plus, Trash2, Loader2, CheckCircle, ExternalLink } from 'lucide-react'

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\s]+)/)
  return match ? match[1] : null
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoLink[]>([])
  const [loading, setLoading] = useState(true)
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchVideos() }, [])

  async function fetchVideos() {
    setLoading(true)
    const { data } = await supabase.from('video_links').select('*').order('added_at', { ascending: false })
    setVideos(data || [])
    setLoading(false)
  }

  async function handleAdd() {
    if (!newUrl.trim() || !newTitle.trim()) { setError('URL and Title are required.'); return }
    if (!getYouTubeId(newUrl)) { setError('Invalid YouTube URL.'); return }
    setAdding(true); setError(null)
    const { error: err } = await supabase.from('video_links').insert({ youtube_url: newUrl.trim(), title: newTitle.trim(), description: newDesc.trim() })
    setAdding(false)
    if (err) { setError(err.message); return }
    setSuccess(true); setNewUrl(''); setNewTitle(''); setNewDesc('')
    setTimeout(() => setSuccess(false), 3000)
    fetchVideos()
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    await supabase.from('video_links').delete().eq('id', id)
    setDeletingId(null)
    setVideos((prev) => prev.filter((v) => v.id !== id))
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Video Library</h1>
        <p className="text-gray-500 font-inter text-sm">Manage YouTube videos shown in the Financial Literacy Hub.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="font-outfit font-semibold text-turkana-deep mb-5 flex items-center gap-2">
          <Plus className="w-4 h-4 text-terracotta-500" /> Add New Video
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">YouTube URL *</label>
            <input id="new-video-url" type="url" placeholder="https://www.youtube.com/watch?v=..." value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-inter outline-none focus:border-terracotta-400 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">Video Title *</label>
            <input id="new-video-title" type="text" placeholder="e.g. Financial Literacy Basics" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-inter outline-none focus:border-terracotta-400 transition-colors" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">Description (optional)</label>
          <input id="new-video-desc" type="text" placeholder="Short description..." value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-inter outline-none focus:border-terracotta-400 transition-colors" />
        </div>

        {newUrl && getYouTubeId(newUrl) && (
          <div className="mb-4 rounded-xl overflow-hidden w-48 h-28 bg-gray-100 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://img.youtube.com/vi/${getYouTubeId(newUrl)}/mqdefault.jpg`} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}

        {error && <div className="text-red-500 text-sm bg-red-50 rounded-xl p-3 mb-4 font-inter">{error}</div>}
        {success && <div className="text-green-700 text-sm bg-green-50 rounded-xl p-3 mb-4 font-inter flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Video added!</div>}

        <button id="add-video-btn" onClick={handleAdd} disabled={adding} className="btn-primary flex items-center gap-2">
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          {adding ? 'Adding…' : 'Add Video'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-outfit font-semibold text-turkana-deep">All Videos ({videos.length})</h2>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-terracotta-400" /></div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-inter">No videos yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {videos.map((video) => {
              const id = getYouTubeId(video.youtube_url)
              return (
                <div key={video.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  {id && <img src={`https://img.youtube.com/vi/${id}/default.jpg`} alt={video.title} className="w-20 h-14 object-cover rounded-lg shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-outfit font-semibold text-turkana-deep text-sm mb-0.5 truncate">{video.title}</div>
                    <div className="text-xs text-gray-400 font-inter truncate">{video.youtube_url}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={video.youtube_url} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-turkana-blue/10 hover:text-turkana-blue transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button onClick={() => handleDelete(video.id)} disabled={deletingId === video.id}
                      className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                      {deletingId === video.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
