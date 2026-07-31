import { useState, useEffect } from 'react'

let _settings = {
  registrationOpen: true,
  campaignStart: '2026-08-01',
  campaignEnd: '2026-09-15',
}

// Deviendra : supabase.from('settings').select().single()
export function useSettings() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    const timer = setTimeout(() => {
      if (!active) return
      setData({ ..._settings })
      setLoading(false)
    }, 400)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  return { data, loading }
}

// Deviendra : supabase.from('settings').update(patch).eq('id', 1)
export async function updateSettings(patch) {
  await new Promise((r) => setTimeout(r, 300))
  _settings = { ..._settings, ...patch }
  return _settings
}