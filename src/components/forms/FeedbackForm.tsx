'use client'

import { useActionState, useEffect, useRef } from 'react'
import { Loader2, Send } from 'lucide-react'
import { submitFeedback } from '@/app/actions'

export default function FeedbackForm() {
  const [state, action, pending] = useActionState(submitFeedback, null)
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.ok) ref.current?.reset()
  }, [state])

  return (
    <form ref={ref} action={action} className="card p-6 space-y-4">
      <div>
        <label className="label">Kategori</label>
        <select name="category" required defaultValue="" className="input">
          <option value="" disabled>
            Seçiniz…
          </option>
          <option value="kulup_istegi">Kulüp İsteği</option>
          <option value="etkinlik_istegi">Etkinlik İsteği</option>
          <option value="oneri">Öneri / Talep</option>
          <option value="elestiri">Eleştiri</option>
          <option value="fikir">Alternatif Fikir</option>
        </select>
      </div>
      <div>
        <label className="label">Detay</label>
        <textarea
          name="content"
          rows={6}
          required
          className="input resize-none"
          placeholder="Düşüncelerini paylaş…"
        />
      </div>
      {state?.error && (
        <p
          role="alert"
          className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-md px-3 py-2"
        >
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p
          role="status"
          className="text-sm text-yesilay-800 bg-yesilay-50 border border-yesilay-100 rounded-md px-3 py-2"
        >
          Bildirimin alındı, teşekkürler.
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Gönder
      </button>
    </form>
  )
}
