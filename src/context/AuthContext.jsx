import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('sg_token')
    const storedSession = localStorage.getItem('sg_session')

    if (storedToken && storedSession) {
      try {
        setSession(JSON.parse(storedSession))
      } catch {
        localStorage.removeItem('sg_token')
        localStorage.removeItem('sg_session')
      }
    } else {
      localStorage.removeItem('sg_token')
      localStorage.removeItem('sg_session')
    }

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
    try {
      const { data } = await authApi.login(username.trim(), password)
      localStorage.setItem('sg_token', data.token)

      const newSession = {
        role: data.user.role,
        user: data.user,
        isFirstLogin: data.user.isFirstLogin,
      }
      setSession(newSession)

      return {
        success: true,
        role: data.user.role,
        isFirstLogin: data.user.isFirstLogin,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Impossible de contacter le serveur.',
      }
    }
  }

  function logout() {
    setSession(null)
    localStorage.removeItem('sg_token')
  }

  function markPasswordChanged() {
    setSession((current) => current && {
      ...current,
      isFirstLogin: false,
      user: { ...current.user, isFirstLogin: false },
    })
  }

  return (
    <AuthContext.Provider value={{ session, authLoading, login, logout, markPasswordChanged }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans un <AuthProvider>')
  return ctx
}