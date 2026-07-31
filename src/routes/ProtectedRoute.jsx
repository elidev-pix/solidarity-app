import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Skeleton } from '../Components/ui/skeleton.jsx'

function ProtectedRoute({ children, requiredRole }) {
  const { session, authLoading } = useAuth()

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && session.role !== requiredRole) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/member'} replace />
  }

  return children
}

export default ProtectedRoute