'use client'

import { useState, useCallback, useEffect } from 'react'
import { X, Heart, Shield, Loader2, CreditCard, Smartphone, ChevronRight } from 'lucide-react'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
  initialAmount?: number
}

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000]

type Step = 'amount' | 'details' | 'processing'

export default function DonationModal({ isOpen, onClose, initialAmount }: DonationModalProps) {
  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState<number>(initialAmount || 2500)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isCustom, setIsCustom] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialAmount) {
      setAmount(initialAmount)
      setIsCustom(false)
      setCustomAmount('')
    }
  }, [initialAmount])

  useEffect(() => {
    if (isOpen) {
      setStep('amount')
      setError(null)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const effectiveAmount = isCustom ? (parseFloat(customAmount) || 0) : amount

  const handleAmountNext = () => {
    if (effectiveAmount < 10) {
      setError('Minimum donation is KES 10')
      return
    }
    setError(null)
    setStep('details')
  }

  const handleSubmit = useCallback(async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    setError(null)
    setLoading(true)
    setStep('processing')

    try {
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          email,
          firstName,
          lastName,
        }),
      })
      const data = await res.json()
      if (data.authorization_url) {
        window.location.href = data.authorization_url
      } else {
        setError(data.error || 'Payment initialization failed. Please try again.')
        setStep('details')
      }
    } catch {
      setError('Network error. Please try again.')
      setStep('details')
    } finally {
      setLoading(false)
    }
  }, [effectiveAmount, email, firstName, lastName])

  if (!isOpen) return null

  return (
    <div className="modal-overlay animate-fade-in" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-turkana-deep to-turkana-blue p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-5 h-5 text-terracotta-400 fill-current" />
                <span className="font-outfit font-bold text-white text-xl">Make a Donation</span>
              </div>
              <p className="text-sand-200/80 text-sm font-inter">100% goes directly to the programme</p>
            </div>
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex gap-2 mt-5">
            {['amount', 'details', 'processing'].map((s, i) => (
              <div
                key={s}
                className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                  step === s ? 'bg-terracotta-400' :
                  ['amount', 'details', 'processing'].indexOf(step) > i ? 'bg-terracotta-400/60' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Step 1: Amount */}
          {step === 'amount' && (
            <div className="animate-fade-in">
              <h3 className="font-outfit font-semibold text-turkana-deep text-lg mb-4">Choose an Amount</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { setAmount(preset); setIsCustom(false); setCustomAmount('') }}
                    className={`py-3 px-2 rounded-xl font-outfit font-semibold text-sm transition-all duration-200 ${
                      !isCustom && amount === preset
                        ? 'bg-cta-gradient text-white shadow-md shadow-terracotta-400/30'
                        : 'bg-sand-100 text-turkana-deep hover:bg-sand-200'
                    }`}
                  >
                    KES {preset >= 1000 ? `${preset / 1000}K` : preset}
                  </button>
                ))}
              </div>

              <div className="relative mb-5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-outlet font-semibold text-sm">KES</span>
                <input
                  id="modal-custom-amount"
                  type="number"
                  min="10"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setIsCustom(true) }}
                  className={`w-full border rounded-xl pl-12 pr-4 py-3.5 font-inter text-sm outline-none transition-all ${
                    isCustom && customAmount ? 'border-terracotta-400 bg-terracotta-50' : 'border-gray-200 bg-gray-50'
                  } focus:border-terracotta-400 focus:bg-white`}
                />
              </div>

              {/* Impact preview */}
              {effectiveAmount > 0 && (
                <div className="bg-sand-100 rounded-2xl p-4 mb-4 border border-sand-200">
                  <p className="text-turkana-deep text-sm font-inter font-medium text-center">
                    KES {effectiveAmount.toLocaleString()} provides{' '}
                    <span className="text-terracotta-600 font-bold">{Math.floor(effectiveAmount / 50)} pads</span>{' '}
                    or{' '}
                    <span className="text-turkana-blue font-bold">{Math.floor(effectiveAmount / 30)} meals</span>
                  </p>
                </div>
              )}

              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

              <button
                id="amount-next-btn"
                onClick={handleAmountNext}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <div className="animate-fade-in">
              <h3 className="font-outfit font-semibold text-turkana-deep text-lg mb-1">Your Details</h3>
              <p className="text-gray-500 text-sm mb-5">
                Donating{' '}
                <span className="text-terracotta-600 font-bold font-outfit">KES {effectiveAmount.toLocaleString()}</span>
              </p>

              <div className="space-y-3 mb-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">First Name</label>
                    <input
                      id="donor-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-terracotta-400 font-inter"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Last Name</label>
                    <input
                      id="donor-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-terracotta-400 font-inter"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                  <input
                    id="donor-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    required
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm outline-none focus:border-terracotta-400 font-inter"
                  />
                </div>
              </div>

              {/* Payment methods info */}
              <div className="bg-sand-50 rounded-2xl p-4 mb-5 border border-sand-200">
                <p className="text-xs text-gray-500 font-inter mb-3">Accepted payment methods:</p>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <Smartphone className="w-4 h-4 text-green-600" />
                    M-Pesa
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <CreditCard className="w-4 h-4 text-turkana-blue" />
                    Visa / Mastercard
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('amount')}
                  className="btn-secondary flex-1 py-3.5 text-sm"
                >
                  Back
                </button>
                <button
                  id="pay-now-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary flex-1 py-3.5 text-sm flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                  Pay Securely
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="animate-fade-in text-center py-8">
              <div className="w-16 h-16 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                <Loader2 className="w-8 h-8 text-terracotta-600 animate-spin" />
              </div>
              <h3 className="font-outfit font-bold text-turkana-deep text-xl mb-2">Processing…</h3>
              <p className="text-gray-500 text-sm">You'll be redirected to the payment page in a moment.</p>
            </div>
          )}

          {/* Trust badge */}
          {step !== 'processing' && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-400 font-inter">Secured by Paystack · SSL Encrypted</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
