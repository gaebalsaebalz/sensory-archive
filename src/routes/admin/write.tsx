import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export const Route = createFileRoute('/admin/write')({
  component: WritePage,
})

const categories = ['visual', 'audio', 'tactile', 'taste', 'scent']

function WritePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    category: 'visual',
    type: '',
    title: '',
    subtitle: '',
    body: '',
    image_url: '',
    entry_no: '',
    plate_no: '',
    artist: '',
    duration: '',
    brand: '',
    brew_notes: '',
    color_code: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('entries').insert([{
      ...form,
      plate_no: form.plate_no ? parseInt(form.plate_no) : null,
    }])

    if (error) {
      alert('저장 실패: ' + error.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin/dashboard' })
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">카테고리</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">제목 *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">부제목</label>
          <input name="subtitle" value={form.subtitle} onChange={handleChange}
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">본문</label>
          <textarea name="body" value={form.body} onChange={handleChange} rows={6}
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full resize-none" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">이미지 URL</label>
          <input name="image_url" value={form.image_url} onChange={handleChange}
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Entry No. (예: 25-01)</label>
          <input name="entry_no" value={form.entry_no} onChange={handleChange}
            className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
        </div>

        {form.category === 'visual' && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Plate No.</label>
            <input name="plate_no" value={form.plate_no} onChange={handleChange} type="number"
              className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
          </div>
        )}

        {form.category === 'audio' && (
          <>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">아티스트</label>
              <input name="artist" value={form.artist} onChange={handleChange}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">재생시간 (예: 05:27)</label>
              <input name="duration" value={form.duration} onChange={handleChange}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
            </div>
          </>
        )}

        {form.category === 'taste' && (
          <>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">브랜드</label>
              <input name="brand" value={form.brand} onChange={handleChange}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">브루잉 메모</label>
              <textarea name="brew_notes" value={form.brew_notes} onChange={handleChange} rows={3}
                className="border border-border rounded px-3 py-2 text-sm bg-background w-full resize-none" />
            </div>
          </>
        )}

        {form.category === 'scent' && (
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">색상 코드 (예: #SC-04)</label>
            <input name="color_code" value={form.color_code} onChange={handleChange}
              className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
          </div>
        )}

        <button type="submit" disabled={loading}
          className="bg-foreground text-background rounded px-4 py-2 text-sm hover:opacity-80 transition-opacity mt-4">
          {loading ? '저장 중...' : '저장'}
        </button>
      </form>
    </main>
  )
}