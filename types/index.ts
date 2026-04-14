// types/index.ts
export interface Donation {
  id: string
  amount: number
  currency: string
  payment_method: string
  status: string
  user_email: string
  reference: string | null
  created_at: string
}

export interface ImpactSetting {
  id: string
  setting_name: string
  setting_value: number
  label: string
  updated_at: string
}

export interface FinancialNote {
  id: string
  title: string
  content: string
  slug: string
  published: boolean
  published_at: string | null
  created_at: string
}

export interface VideoLink {
  id: string
  youtube_url: string
  title: string
  description: string
  added_at: string
}
