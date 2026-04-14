import { createClient } from '@/lib/supabase/server'
import FinancialLiteracyClient from './client'

export const metadata = {
  title: 'Financial Literacy Hub | Dear Diaries Initiative',
  description: 'Free financial education resources for everyone — learn to budget smarter, save better, and build a more secure future. Curated by Paul Mwaniki Kimani.',
}

export default async function FinancialLiteracyPage() {
  const supabase = await createClient()

  const [{ data: notes }, { data: videos }] = await Promise.all([
    supabase
      .from('financial_notes')
      .select('id, title, slug, published_at, created_at')
      .eq('published', true)
      .order('published_at', { ascending: false }),
    supabase
      .from('video_links')
      .select('*')
      .order('added_at', { ascending: false }),
  ])

  return <FinancialLiteracyClient notes={notes || []} videos={videos || []} />
}
