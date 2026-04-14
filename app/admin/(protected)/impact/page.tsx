'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ImpactSetting } from '@/types'
import { Calculator, Save, Loader2, CheckCircle } from 'lucide-react'

export default function ImpactSettingsPage() {
  const [settings, setSettings] = useState<ImpactSetting[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('impact_settings').select('*').order('setting_name')
      if (data) {
        setSettings(data)
        const vals: Record<string, string> = {}
        data.forEach((s: ImpactSetting) => { vals[s.id] = String(s.setting_value) })
        setValues(vals)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true); setError(null)
    const supabase = createClient()
    const updates = settings.map((s) => ({
      id: s.id, setting_name: s.setting_name,
      setting_value: parseFloat(values[s.id]) || s.setting_value,
      label: s.label, updated_at: new Date().toISOString(),
    }))
    const { error: err } = await supabase.from('impact_settings').upsert(updates)
    setSaving(false)
    if (err) { setError(err.message) } else { setSaved(true); setTimeout(() => setSaved(false), 3000) }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Impact Settings</h1>
        <p className="text-gray-500 font-inter text-sm">These values control the Impact Calculator on the homepage.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-terracotta-50 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-terracotta-600" />
          </div>
          <div>
            <h2 className="font-outfit font-semibold text-turkana-deep">Conversion Rates</h2>
            <p className="text-xs text-gray-400 font-inter">Cost per unit in Kenyan Shillings (KES)</p>
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-terracotta-400" /></div>
        ) : (
          <div className="p-6 space-y-5">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <label className="block font-outfit font-semibold text-turkana-deep text-sm mb-0.5">{setting.label}</label>
                  <p className="text-xs text-gray-400 font-inter font-mono">{setting.setting_name}</p>
                </div>
                <div className="relative w-40">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-inter">KES</span>
                  <input
                    type="number" min="1" step="0.5"
                    value={values[setting.id] || ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, [setting.id]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-3 py-3 text-sm font-outfit font-semibold text-turkana-deep outline-none focus:border-terracotta-400 transition-colors"
                  />
                </div>
              </div>
            ))}

            <div className="bg-sand-50 rounded-xl p-4 border border-sand-100 mt-4">
              <p className="text-xs font-outfit font-semibold text-turkana-deep mb-2 uppercase tracking-wider">Live Preview — KES 1,000</p>
              {settings.map((s) => {
                const rate = parseFloat(values[s.id]) || s.setting_value
                const count = Math.floor(1000 / rate)
                return (
                  <p key={s.id} className="text-sm font-inter text-gray-600">
                    → <span className="font-semibold text-terracotta-600">{count}</span>{' '}
                    {s.setting_name.includes('pad') ? 'reusable pads' : 'madrasa meals'} @ KES {rate} each
                  </p>
                )
              })}
            </div>

            {error && <div className="text-red-500 text-sm bg-red-50 rounded-xl p-3 font-inter">{error}</div>}

            <button id="save-impact-btn" onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
