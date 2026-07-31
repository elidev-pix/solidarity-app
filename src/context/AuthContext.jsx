import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMembers } from '../data/mockMembers.js'

const AuthContext = createContext(null)

const DEMO_ACCOUNTS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' },
  member: { username: 'SG-2026-001', password: 'member123', role: 'member' },
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const { data: members } = useMembers()

  useEffect(() => {
    // Deviendra : supabase.auth.getSession() + supabase.auth.onAuthStateChange(...)
    const stored = localStorage.getItem('sg_session')
    setSession(stored ? JSON.parse(stored) : null)
    setAuthLoading(false)
  }, [])

  useEffect(() => {
    if (session) {
      localStorage.setItem('sg_session', JSON.stringify(session))
    } else {
      localStorage.removeItem('sg_session')
    }
  }, [session])

  async function login(username, password) {
    // Deviendra : supabase.auth.signInWithPassword({ email, password })
    await new Promise((r) => setTimeout(r, 500))

    if (username === DEMO_ACCOUNTS.admin.username && password === DEMO_ACCOUNTS.admin.password) {
      const newSession = { role: 'admin', user: { name: 'Administrateur' } }
      setSession(newSession)
      return { success: true, role: 'admin' }
    }
    if (username === DEMO_ACCOUNTS.member.username && password === DEMO_ACCOUNTS.member.password) {
      const memberData = members?.find((m) => m.id === username) || members?.[0]
      const newSession = { role: 'member', user: memberData }
      setSession(newSession)
      return { success: true, role: 'member' }
    }
    return { success: false, error: 'Identifiants incorrects' }
  }

  function logout() {
    setSession(null)
    // Deviendra : await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  return ctx
}