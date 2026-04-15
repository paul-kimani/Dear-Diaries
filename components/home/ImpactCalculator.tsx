'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ImpactSetting } from '@/types'
import { Heart, Utensils, Calculator, Sparkles } from 'lucide-react'

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000]

interface ImpactResult {
  pads: number
  meals: number
}

interface ImpactCalculatorProps {
  onDonateClick: (amount: number) => void
}

export default function ImpactCalculator({ onDonateClick }: ImpactCalculatorProps) {
  const [amount, setAmount] = useState<number>(2500)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isCustom, setIsCustom] = useState(false)
  const [settings, setSettings] = useState<Record<string, number>>({
    pad_cost_ksh: 50,
    meal_cost_ksh: 30,
  })
  const [loading, setLoading] = useState(true)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient()
      const { data } = await supabase.from('impact_settings').select('*')
      if (data) {
        const map: Record<string, number> = {}
        data.forEach((s: ImpactSetting) => { map[s.setting_name] = s.setting_value })
        setSettings(map)
      }
      setLoading(false)
    }
    fetchSettings()
  }, [])

  const effectiveAmount = isCustom ? (parseFloat(customAmount) || 0) : amount

  const impact: ImpactResult = {
    pads: Math.floor(effectiveAmount / (settings.pad_cost_ksh || 50)),
    meals: Math.floor(effectiveAmount / (settings.meal_cost_ksh || 30)),
  }

  const handleAmountChange = (val: number) => {
    setAmount(val)
    setIsCustom(false)
    setCustomAmount('')
    setAnimate(true)
    setTimeout(() => setAnimate(false), 600)
  }

  const handleCustom = (val: string) => {
    setCustomAmount(val)
    setIsCustom(true)
    setAnimate(true)
    setTimeout(() => setAnimate(false), 600)
  }

  return (
    <section id="impact" className="section-padding bg-gradient-to-br from-turkana-deep via-turkana-blue to-turkana-deep relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-terracotta-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-accent-orange blur-3xl" />
      </div>

      <div className="container-width relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-terracotta-600/30 border border-terracotta-400/40 text-terracotta-400 text-xs font-outfit font-semibold px-4 py-2 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Impact Calculator
          </div>
          <h2 className="font-outfit font-bold text-white text-3xl md:text-5xl mb-4">
            See Your Impact <span className="gradient-text">in Real Time</span>
          </h2>
          <p className="text-sand-200/80 text-lg max-w-2xl mx-auto">
            Choose an amount and instantly see how many lives you can transform across Kenya.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Amount selector */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-6">
            <label className="block text-sand-200 font-outfit font-semibold mb-4 text-sm uppercase tracking-wider">
              Select Donation Amount (KES)
            </label>
            <div className="flex flex-wrap gap-3 mb-5">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleAmountChange(preset)}
                  className={`px-5 py-3 rounded-full font-outfit font-semibold text-sm transition-all duration-200 ${
                    !isCustom && amount === preset
                      ? 'bg-cta-gradient text-white shadow-lg shadow-terracotta-600/30 scale-105'
                      : 'bg-white/10 text-sand-100 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  KES {preset.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-300 font-outfit font-semibold">KES</span>
              <input
                id="custom-amount-input"
                type="number"
                min="1"
                placeholder="Enter custom amount..."
                value={customAmount}
                onChange={(e) => handleCustom(e.target.value)}
                className={`w-full bg-white/10 border rounded-xl pl-14 pr-4 py-4 text-white placeholder-sand-300/50 font-inter text-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-terracotta-400 ${
                  isCustom ? 'border-terracotta-400' : 'border-white/20'
                }`}
              />
            </div>
          </div>

          {/* Impact display */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ${animate ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
            {/* Pads */}
            <div className="bg-gradient-to-br from-terracotta-600/20 to-terracotta-800/20 rounded-2xl p-6 border border-terracotta-400/30 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-terracotta-600/30 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-terracotta-400 fill-current" />
                </div>
                <span className="text-terracotta-400 text-xs font-outfit font-semibold bg-terracotta-400/10 px-3 py-1 rounded-full">
                  Sanitary Pads
                </span>
              </div>
              <div className={`font-outfit font-bold text-white mb-1 transition-all duration-300 ${loading ? 'animate-pulse' : ''}`}>
                <span className="text-4xl md:text-5xl">{loading ? '...' : impact.pads}</span>
                <span className="text-xl ml-2">pads</span>
              </div>
              <p className="text-sand-200/70 text-sm leading-relaxed">
                Reusable sanitary pads for women &amp; girls across Kenya — Takaungu, Voi, Chanagande and beyond.
              </p>
              <div className="mt-4 text-xs text-sand-300/60 font-inter">
                @ KES {settings.pad_cost_ksh} per pad
              </div>
            </div>

            {/* Meals */}
            <div className="bg-gradient-to-br from-turkana-light/20 to-turkana-blue/20 rounded-2xl p-6 border border-turkana-light/30 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-turkana-light/20 flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-turkana-pale" />
                </div>
                <span className="text-turkana-pale text-xs font-outfit font-semibold bg-turkana-light/10 px-3 py-1 rounded-full">
                  Disability Support
                </span>
              </div>
              <div className={`font-outfit font-bold text-white mb-1 transition-all duration-300 ${loading ? 'animate-pulse' : ''}`}>
                <span className="text-4xl md:text-5xl">{loading ? '...' : impact.meals}</span>
                <span className="text-xl ml-2">people</span>
              </div>
              <p className="text-sand-200/70 text-sm leading-relaxed">
                People supported with assistive devices, advocacy, and resources — wheelchairs, walkers, crutches &amp; more.
              </p>
              <div className="mt-4 text-xs text-sand-300/60 font-inter">
                @ KES {settings.meal_cost_ksh} per person supported
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <button
              id="calculator-donate-btn"
              onClick={() => onDonateClick(effectiveAmount)}
              disabled={effectiveAmount <= 0}
              className="btn-primary text-lg px-10 py-4 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              Make This Impact — KES {effectiveAmount.toLocaleString()}
            </button>
            <p className="text-sand-300/60 text-xs mt-3 font-inter">
              Secure payment via Paystack · 100% goes to the programme
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
