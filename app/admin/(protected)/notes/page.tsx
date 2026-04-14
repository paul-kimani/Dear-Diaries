'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FinancialNote } from '@/types'
import { BookOpen, Plus, Edit2, Trash2, Eye, EyeOff, Save, Loader2, CheckCircle, X, ArrowLeft } from 'lucide-react'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

type Mode = 'list' | 'edit'

export default function AdminNotesPage() {
  const [notes, setNotes] = useState<FinancialNote[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<Mode>('list')
  const [editingNote, setEditingNote] = useState<Partial<FinancialNote> | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedMsg, setSavedMsg] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => { fetchNotes() }, [])

  async function fetchNotes() {
    setLoading(true)
    const { data } = await supabase.from('financial_notes').select('*').order('created_at', { ascending: false })
    setNotes(data || [])
    setLoading(false)
  }

  function startNew() { setEditingNote({ title: '', content: '', slug: '', published: false }); setMode('edit'); setError(null) }
  function startEdit(note: FinancialNote) { setEditingNote({ ...note }); setMode('edit'); setError(null) }

  async function handleSave(publish?: boolean) {
    if (!editingNote?.title?.trim()) { setError('Title is required.'); return }
    if (!editingNote?.content?.trim()) { setError('Content is required.'); return }
    setSaving(true); setError(null)
    const slug = editingNote.slug || slugify(editingNote.title)
    const isPublishing = publish !== undefined ? publish : editingNote.published
    const payload = { title: editingNote.title.trim(), content: editingNote.content.trim(), slug, published: isPublishing, published_at: isPublishing ? (editingNote.published_at || new Date().toISOString()) : null }
    let err
    if (editingNote.id) {
      const res = await supabase.from('financial_notes').update(payload).eq('id', editingNote.id)
      err = res.error
    } else {
      const res = await supabase.from('financial_notes').insert(payload)
      err = res.error
    }
    setSaving(false)
    if (err) { setError(err.message); return }
    setSavedMsg(isPublishing ? 'Published!' : 'Saved as draft!')
    setTimeout(() => setSavedMsg(''), 3000)
    fetchNotes(); setMode('list'); setEditingNote(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    setDeletingId(id)
    await supabase.from('financial_notes').delete().eq('id', id)
    setDeletingId(null)
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  async function togglePublish(note: FinancialNote) {
    const newPublished = !note.published
    await supabase.from('financial_notes').update({ published: newPublished, published_at: newPublished ? new Date().toISOString() : null }).eq('id', note.id)
    fetchNotes()
  }

  if (mode === 'edit' && editingNote !== null) {
    return (
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => { setMode('list'); setEditingNote(null) }} className="flex items-center gap-2 text-gray-500 hover:text-turkana-deep font-inter text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </button>
          <span className="text-gray-300">|</span>
          <h1 className="font-outfit font-bold text-turkana-deep text-xl">{editingNote.id ? 'Edit Article' : 'New Article'}</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">Title *</label>
            <input id="note-title" type="text" value={editingNote.title || ''} placeholder="Article title..."
              onChange={(e) => setEditingNote((prev) => ({ ...prev, title: e.target.value, slug: prev?.slug || slugify(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base font-outfit font-semibold text-turkana-deep outline-none focus:border-terracotta-400 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-inter bg-gray-50 px-3 py-3 rounded-l-xl border border-gray-200 border-r-0">/financial-literacy/</span>
              <input id="note-slug" type="text" value={editingNote.slug || ''}
                onChange={(e) => setEditingNote((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                className="flex-1 border border-gray-200 rounded-r-xl px-4 py-3 text-sm font-mono text-gray-600 outline-none focus:border-terracotta-400 transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5 font-inter">Content (Markdown) *</label>
            <textarea id="note-content" value={editingNote.content || ''} rows={20}
              placeholder={`# Heading\n\nWrite in **Markdown** format.\n\n- Lists work\n- **Bold** and *italic* too`}
              onChange={(e) => setEditingNote((prev) => ({ ...prev, content: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono text-gray-700 outline-none focus:border-terracotta-400 transition-colors resize-y leading-relaxed" />
            <p className="text-xs text-gray-400 font-inter mt-1.5">Supports full Markdown syntax</p>
          </div>

          {error && <div className="text-red-500 text-sm bg-red-50 rounded-xl p-3 font-inter">{error}</div>}
          {savedMsg && <div className="text-green-700 text-sm bg-green-50 rounded-xl p-3 font-inter flex items-center gap-2"><CheckCircle className="w-4 h-4" /> {savedMsg}</div>}

          <div className="flex flex-wrap gap-3 pt-2">
            <button id="save-draft-btn" onClick={() => handleSave(false)} disabled={saving} className="btn-secondary flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Draft
            </button>
            <button id="publish-btn" onClick={() => handleSave(true)} disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              {editingNote.published ? 'Update & Publish' : 'Publish Now'}
            </button>
            <button onClick={() => { setMode('list'); setEditingNote(null) }} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-inter transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Articles</h1>
          <p className="text-gray-500 font-inter text-sm">Manage Financial Literacy Hub content.</p>
        </div>
        <button id="new-article-btn" onClick={startNew} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Article</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-terracotta-400" /></div>
        ) : notes.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-inter mb-4">No articles yet.</p>
            <button onClick={startNew} className="btn-primary">Write your first article</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-outfit font-semibold text-turkana-deep text-sm truncate">{note.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-inter shrink-0 ${note.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {note.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">/financial-literacy/{note.slug}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(note)} title={note.published ? 'Unpublish' : 'Publish'}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${note.published ? 'bg-green-50 text-green-600 hover:bg-red-50 hover:text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-green-50 hover:text-green-600'}`}>
                    {note.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => startEdit(note)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-turkana-blue/10 hover:text-turkana-blue transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(note.id)} disabled={deletingId === note.id}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                    {deletingId === note.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
