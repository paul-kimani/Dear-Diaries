import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/paystack'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const reference = searchParams.get('reference')

  if (!reference) {
    return NextResponse.json({ error: 'Reference is required' }, { status: 400 })
  }

  try {
    const result = await verifyPayment(reference)

    if (!result.status) {
      return NextResponse.json({ error: result.message, status: 'failed' }, { status: 400 })
    }

    const txData = result.data
    const status = txData.status === 'success' ? 'success' : 'failed'

    // Log to Supabase
    const supabase = await createClient()
    const { error: dbError } = await supabase.from('donations').upsert(
      {
        amount: txData.amount / 100, // Convert from kobo back to KES
        currency: txData.currency,
        payment_method: txData.channel || 'card',
        status,
        user_email: txData.customer?.email || '',
        reference: txData.reference,
      },
      { onConflict: 'reference' }
    )

    if (dbError) {
      console.error('Supabase insert error:', dbError)
    }

    return NextResponse.json({
      status,
      amount: txData.amount / 100,
      currency: txData.currency,
      email: txData.customer?.email,
      reference: txData.reference,
    })
  } catch (err) {
    console.error('Paystack verify error:', err)
    return NextResponse.json({ error: 'Verification failed', status: 'failed' }, { status: 500 })
  }
}
