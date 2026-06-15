import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export const Route = createFileRoute('/admin/edit/$id')({
  component: EditPage,
})

const categories = ['visual', 'audio', 'tactile', 'taste', 'scent']

function EditPage() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [form, setForm] = useState({
    category: 'visual',
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

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('id', id)
        .single()
      if (data) {
        setForm({
          ...data,
          plate_no: data.plate_no?.toString() ?? '',
        })
        setPreviewUrl(data.image_url ?? '')
      }
    }
    load()
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (error) {
      alert('업로드 실패: ' + error.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    setForm({ ...form, image_url: publicUrl })
    setPreviewUrl(publicUrl)
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('entries')
      .update({
        ...form,
        plate_no: form.plate_no ? parseInt(form.plate_no) : null,
      })
      .eq('id', id)

    if (error) {
      alert('수정 실패: ' + error.message)
      setLoading(false)
    } else {
      navigate({ to: '/admin/dashboard' })
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">글 수정</h1>
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
          <label className="text-xs text-muted-foreground mb-1 block">이미지</label>
          {previewUrl && (
            <img src={previewUrl} alt="preview" className="mb-2 w-full max-h-48 object-cover rounded" />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
          {uploading && <p className="text-xs text-muted-foreground mt-1">업로드 중...</p>}
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Entry No.</label>
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
              <label className="text-xs text-muted-foreground mb-1 block">재생시간</label>
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
            <label className="text-xs text-muted-foreground mb-1 block">색상 코드</label>
            <input name="color_code" value={form.color_code} onChange={handleChange}
              className="border border-border rounded px-3 py-2 text-sm bg-background w-full" />
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button type="submit" disabled={loading || uploading}
            className="bg-foreground text-background rounded px-4 py-2 text-sm hover:opacity-80 transition-opacity flex-1">
            {loading ? '저장 중...' : '수정 완료'}
          </button>
          <button type="button" onClick={() => navigate({ to: '/admin/dashboard' })}
            className="border border-border rounded px-4 py-2 text-sm hover:bg-muted transition-colors">
            취소
          </button>
        </div>
      </form>
    </main>
  )
}