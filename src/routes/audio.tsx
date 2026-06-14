import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/audio')({
  component: AudioPage,
})

function AudioPage() {
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('category', 'audio')
        .order('created_at', { ascending: false })
      setEntries(data ?? [])
    }
    fetch()
  }, [])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <p className="text-xs text-muted-foreground tracking-widest mb-2">ii. Audio</p>
      <h1 className="text-3xl font-bold mb-2">청각 AUDIO</h1>
      <p className="text-muted-foreground italic mb-12">"I listened to that song, hoping to feel what you felt."</p>

      <div className="flex flex-col gap-8">
        {entries.length === 0 && (
          <p className="text-muted-foreground text-sm">아직 작성된 글이 없어요.</p>
        )}
        {entries.map((entry) => (
          <article key={entry.id} className="border-b border-border pb-8">
            <h2 className="text-xl font-semibold mb-1">{entry.title}</h2>
            {entry.artist && <p className="text-sm text-muted-foreground mb-1">{entry.artist}</p>}
            {entry.duration && <p className="text-xs text-muted-foreground mb-2">{entry.duration}</p>}
            {entry.body && <p className="text-sm leading-relaxed whitespace-pre-line">{entry.body}</p>}
          </article>
        ))}
      </div>
    </main>
  )
}