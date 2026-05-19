'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { submitMotivation } from '@/app/actions'

const MAX = 1000

export default function MotivationForm({ disabled }: { disabled?: boolean }) {
  const [state, formAction, pending] = useActionState(submitMotivation, null)
  const [count, setCount] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.ok) formRef.current?.reset()
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="card p-6 space-y-4">
      <div>
        <label htmlFor="content" className="label">
          Motivasyon / Fikir
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          maxLength={MAX}
          required
          disabled={disabled}
          onChange={(e) => setCount(e.target.value.length)}
          placeholder="Topluluğa ne hissettirdiğini söyle, bir fikrini paylaş…"
          className="input resize-none"
        />
        <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
          <span>İncelemeden geçtikten sonra anasayfada görünür.</span>
          <span>
            {count}/{MAX}
          </span>
        </div>
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
          Paylaşımın incelemeye gönderildi.
        </p>
      )}
      <button
        type="submit"
        disabled={disabled || pending}
        className="btn-primary disabled:opacity-50"
      >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Gönder
      </button>
    </form>
  )
}
