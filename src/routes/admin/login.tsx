import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export const Route = createFileRoute('/admin/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin/dashboard' })
    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-border rounded px-4 py-2 text-sm bg-background"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-border rounded px-4 py-2 text-sm bg-background"
          required
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background rounded px-4 py-2 text-sm hover:opacity-80 transition-opacity"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </main>
  )
}