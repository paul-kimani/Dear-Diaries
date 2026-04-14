import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from '../AdminSidebar'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar userEmail={user.email || ''} />
      <main className="flex-1 ml-0 md:ml-64 p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
