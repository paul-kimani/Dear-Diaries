import { NextRequest, NextResponse } from 'next/server'
import { initializePayment } from '@/lib/paystack'

export async function POST(req: NextRequest) {
  try {
    const { amount, email, firstName, lastName } = await req.json()

    if (!amount || !email) {
      return NextResponse.json({ error: 'Amount and email are required' }, { status: 400 })
    }

    // Generate a unique reference
    const reference = `THF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    const result = await initializePayment(email, amount, reference)

    if (!result.status) {
      return NextResponse.json({ error: result.message || 'Payment initialization failed' }, { status: 400 })
    }

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      access_code: result.data.access_code,
      reference: result.data.reference,
    })
  } catch (err) {
    console.error('Paystack initialize error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
