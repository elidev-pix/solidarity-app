import { useState, useEffect, useCallback } from 'react'

/**
 * Fabrique un hook + des mutations pour une "table" mock, avec la même
 * forme { data, loading, error } que retournera Supabase plus tard.
 * Bascule Supabase : remplacer le contenu par supabase.from('table').select()
 * / .insert() / .update() / .delete() — les composants appelants ne changent pas.
 */
export function createMockResource(initialData, { delay = 400 } = {}) {
  let store = [...initialData]
  const listeners = new Set()

  function notify() {
    listeners.forEach((fn) => fn([...store]))
  }

  function useResource() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error] = useState(null)

    const refetch = useCallback(() => {
      setLoading(true)
      const timer = setTimeout(() => {
        setData([...store])
        setLoading(false)
      }, delay)
      return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
      const cleanup = refetch()
      const listener = (next) => setData(next)
      listeners.add(listener)
      return () => {
        cleanup()
        listeners.delete(listener)
      }
    }, [refetch])

    return { data, loading, error }
  }

  async function add(item) {
    await new Promise((r) => setTimeout(r, 300))
    store = [...store, item]
    notify()
    return item
  }

  async function update(id, patch) {
    await new Promise((r) => setTimeout(r, 300))
    store = store.map((it) => (it.id === id ? { ...it, ...patch } : it))
    notify()
  }

  async function remove(id) {
    await new Promise((r) => setTimeout(r, 300))
    store = store.filter((it) => it.id !== id)
    notify()
  }

  return { useResource, add, update, remove }
}