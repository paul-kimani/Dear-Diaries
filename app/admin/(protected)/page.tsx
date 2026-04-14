import { createClient } from '@/lib/supabase/server'
import { Heart, Utensils, DollarSign, TrendingUp, Users, Clock } from 'lucide-react'
import { Donation } from '@/types'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { data: donations },
    { data: impactSettings },
    { count: totalDonations },
  ] = await Promise.all([
    supabase
      .from('donations')
      .select('*')
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase.from('impact_settings').select('*'),
    supabase.from('donations').select('*', { count: 'exact', head: true }).eq('status', 'success'),
  ])

  const settings: Record<string, number> = {}
  impactSettings?.forEach((s) => { settings[s.setting_name] = s.setting_value })

  const allDonations = await supabase.from('donations').select('amount').eq('status', 'success')
  const grandTotal = allDonations.data?.reduce((sum, d) => sum + d.amount, 0) || 0
  const totalPads = Math.floor(grandTotal / (settings.pad_cost_ksh || 50))
  const totalMeals = Math.floor(grandTotal / (settings.meal_cost_ksh || 30))

  const statCards = [
    { label: 'Total Raised', value: `KES ${grandTotal.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    { label: 'Successful Donations', value: totalDonations?.toLocaleString() || '0', icon: Users, color: 'text-turkana-blue', bg: 'bg-turkana-blue/5', border: 'border-turkana-blue/10' },
    { label: 'Pads Funded', value: totalPads.toLocaleString(), icon: Heart, color: 'text-terracotta-600', bg: 'bg-terracotta-50', border: 'border-terracotta-100' },
    { label: 'Meals Provided', value: totalMeals.toLocaleString(), icon: Utensils, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-outfit font-bold text-turkana-deep text-3xl mb-1">Dashboard</h1>
        <p className="text-gray-500 font-inter text-sm">Overview of your impact and donations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`bg-white rounded-2xl p-6 border ${card.border} shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-300" />
              </div>
              <div className={`font-outfit font-bold text-2xl ${card.color} mb-0.5`}>{card.value}</div>
              <div className="text-gray-500 text-sm font-inter">{card.label}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-outfit font-semibold text-turkana-deep text-lg">Recent Donations</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            Last 10 transactions
          </div>
        </div>

        {!donations || donations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="font-inter">No donations yet. Share your donation link!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Email', 'Amount', 'Method', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider font-inter">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(donations as Donation[]).map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700 font-inter">{d.user_email || '—'}</td>
                    <td className="px-6 py-4 text-sm font-outfit font-semibold text-turkana-deep">{d.currency} {d.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-sand-100 text-sand-600 px-2 py-1 rounded-full font-inter capitalize">{d.payment_method}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium font-inter ${d.status === 'success' ? 'bg-green-100 text-green-700' : d.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-inter">
                      {new Date(d.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
