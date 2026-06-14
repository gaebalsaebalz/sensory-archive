import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/visual')({
  component: VisualPage,
})

function VisualPage() {
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('category', 'visual')
        .order('plate_no', { ascending: true })
      setEntries(data ?? [])
    }
    fetch()
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs text-muted-foreground tracking-widest mb-2">An Exhibition · i. Visual</p>
      <h1 className="text-3xl font-bold mb-2">시각 VISUAL</h1>
      <p className="text-muted-foreground italic mb-12">"Eternity consists of infinite moments."</p>

      <div className="flex flex-col gap-16">
        {entries.length === 0 && (
          <p className="text-muted-foreground text-sm">아직 작성된 글이 없어요.</p>
        )}
        {entries.map((entry) => (
          <article key={entry.id}>
            {entry.image_url && (
              <img
                src={entry.image_url}
                alt={entry.title}
                className="w-full aspect-video object-cover mb-4"
              />
            )}
            <p className="text-xs text-muted-foreground tracking-widest mb-1">
              {entry.plate_no && `Plate ${toRoman(entry.plate_no)} · `}{entry.entry_no}
            </p>
            <h2 className="text-xl font-semibold mb-1">{entry.title}</h2>
            {entry.subtitle && <p className="text-muted-foreground italic text-sm mb-2">{entry.subtitle}</p>}
            {entry.body && <p className="text-sm leading-relaxed whitespace-pre-line">{entry.body}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}

function toRoman(num: number): string {
  const map: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ]
  let result = ''
  for (const [val, sym] of map) {
    while (num >= val) { result += sym; num -= val }
  }
  return result
}