'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, Heart, Home, Loader2, Utensils } from 'lucide-react'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference') || searchParams.get('trxref')
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [donationData, setDonationData] = useState<{
    amount?: number
    email?: string
    currency?: string
  }>({})

  useEffect(() => {
    if (!reference) { setStatus('failed'); return }

    fetch(`/api/paystack/verify?reference=${reference}`)
      .then(r => r.json())
      .then(data => {
        setStatus(data.status === 'success' ? 'success' : 'failed')
        setDonationData({ amount: data.amount, email: data.email, currency: data.currency })
      })
      .catch(() => setStatus('failed'))
  }, [reference])

  const pads = donationData.amount ? Math.floor(donationData.amount / 50) : 0
  const meals = donationData.amount ? Math.floor(donationData.amount / 30) : 0

  return (
    <main className="min-h-screen bg-gradient-to-br from-sand-50 to-sand-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {status === 'loading' && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-turkana-blue/10 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-turkana-blue animate-spin" />
            </div>
            <h1 className="font-outfit font-bold text-turkana-deep text-2xl mb-2">Confirming your gift…</h1>
            <p className="text-gray-500 font-inter">Please wait a moment.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center animate-fade-in">
            {/* Confetti-like decoration */}
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-green-100/50 animate-pulse-slow -z-10" />
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-outfit font-semibold px-3 py-1.5 rounded-full mb-5">
                <CheckCircle className="w-3.5 h-3.5" />
                Payment Confirmed
              </div>

              <h1 className="font-outfit font-bold text-turkana-deep text-3xl mb-3">
                Thank You! ❤️
              </h1>
              <p className="text-gray-600 font-inter mb-6 leading-relaxed">
                Your generous donation of{' '}
                <span className="font-bold text-terracotta-600">
                  {donationData.currency} {donationData.amount?.toLocaleString()}
                </span>{' '}
                has been received. You are making a real difference in Turkana.
              </p>

              {/* Impact summary */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-terracotta-50 rounded-2xl p-4 border border-terracotta-100">
                  <Heart className="w-6 h-6 text-terracotta-500 fill-current mb-2" />
                  <div className="font-outfit font-bold text-2xl text-terracotta-700 mb-0.5">{pads}</div>
                  <div className="text-xs text-gray-500 font-inter">Reusable pads funded</div>
                </div>
                <div className="bg-turkana-blue/5 rounded-2xl p-4 border border-turkana-blue/10">
                  <Utensils className="w-6 h-6 text-turkana-blue mb-2" />
                  <div className="font-outfit font-bold text-2xl text-turkana-blue mb-0.5">{meals}</div>
                  <div className="text-xs text-gray-500 font-inter">Meals provided</div>
                </div>
              </div>

              {donationData.email && (
                <p className="text-sm text-gray-500 font-inter">
                  A receipt has been sent to <strong>{donationData.email}</strong>
                </p>
              )}
            </div>

            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return to Homepage
            </Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <h1 className="font-outfit font-bold text-turkana-deep text-2xl mb-3">Payment Unsuccessful</h1>
              <p className="text-gray-500 font-inter mb-6 leading-relaxed">
                We couldn't confirm your payment. No charges were made. Please try again or contact us if the issue persists.
              </p>
              <Link href="/" className="btn-primary inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Try Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

import { Suspense } from 'react'

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-terracotta-400" />
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  )
}
