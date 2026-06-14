import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export const Route = createFileRoute('/admin/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate({ to: '/admin/login' })
        return
      }
      setUser(user)

      const { data } = await supabase
        .from('entries')
        .select('*')
        .order('created_at', { ascending: false })
      setEntries(data ?? [])
    }
    init()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate({ to: '/admin/login' })
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/admin/write"
            className="bg-foreground text-background text-sm px-4 py-2 rounded hover:opacity-80 transition-opacity"
          >
            + 새 글
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="text-muted-foreground text-sm">아직 작성된 글이 없어요.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-2">제목</th>
              <th className="pb-2">카테고리</th>
              <th className="pb-2">날짜</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-border py-2">
                <td className="py-3">{entry.title}</td>
                <td className="py-3 text-muted-foreground">{entry.category}</td>
                <td className="py-3 text-muted-foreground">
                  {new Date(entry.created_at).toLocaleDateString('ko-KR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}