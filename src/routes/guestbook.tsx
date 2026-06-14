import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/guestbook')({
  component: GuestbookPage,
})

function GuestbookPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadEntries() {
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
    setEntries(data ?? [])
  }

  useEffect(() => {
    loadEntries()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name, message }])

    if (error) {
      alert('저장 실패: ' + error.message)
    } else {
      setName('')
      setMessage('')
      loadEntries()
    }
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Guestbook</h1>
      <p className="text-muted-foreground italic text-sm mb-12">방명록</p>

      {/* 작성 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-16">
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-border rounded px-3 py-2 text-sm bg-background"
        />
        <textarea
          placeholder="메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="border border-border rounded px-3 py-2 text-sm bg-background resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-foreground text-background rounded px-4 py-2 text-sm hover:opacity-80 transition-opacity self-end"
        >
          {loading ? '저장 중...' : '남기기'}
        </button>
      </form>

      {/* 메시지 목록 */}
      <div className="flex flex-col gap-6">
        {entries.length === 0 && (
          <p className="text-muted-foreground text-sm">아직 방명록이 비어있어요.</p>
        )}
        {entries.map((entry) => (
          <div key={entry.id} className="border-b border-border pb-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(entry.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-line">{entry.message}</p>
          </div>
        ))}
      </div>
    </main>
  )
}