import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/scent')({
  component: ScentPage,
})

function ScentPage() {
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('category', 'scent')
        .order('created_at', { ascending: false })
      setEntries(data ?? [])
    }
    fetch()
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs text-muted-foreground tracking-widest mb-2">v. Scent</p>
      <h1 className="text-3xl font-bold mb-2">후각 SCENT</h1>
      <p className="text-muted-foreground italic mb-12">"A scent can carry you back in an instant."</p>

      <div className="flex flex-col gap-8">
        {entries.length === 0 && (
          <p className="text-muted-foreground text-sm">아직 작성된 글이 없어요.</p>
        )}
        {entries.map((entry) => (
          <article key={entry.id} className="border-b border-border pb-8">
            {entry.color_code && <p className="text-xs text-muted-foreground mb-1">{entry.color_code}</p>}
            <h2 className="text-xl font-semibold mb-1">{entry.title}</h2>
            {entry.subtitle && <p className="text-muted-foreground italic text-sm mb-2">{entry.subtitle}</p>}
            {entry.body && <p className="text-sm leading-relaxed whitespace-pre-line">{entry.body}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}