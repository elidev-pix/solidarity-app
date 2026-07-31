import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { Skeleton } from './Components/ui/skeleton.jsx'

function App() {
  const { session, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Skeleton className="h-8 w-48" />
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />
  return <Navigate to={session.role === 'admin' ? '/admin' : '/member'} replace />
}

export default App