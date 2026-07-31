import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './Home.jsx'
import App from './App.jsx'
import JoinUs from './Pages/JoinUs.jsx'
import Login from './Pages/Login.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DashboardLayout from './Layouts/DashboardLayout.jsx'

import {
  LayoutDashboard, CalendarDays, Wallet, Lightbulb, UserCircle,
  Users, ClipboardList, CalendarPlus, Settings,
} from 'lucide-react'

import MemberDashboard from './Pages/member/MemberDashboard.jsx'
import MemberActivities from './Pages/member/MemberActivities.jsx'
import MemberContributions from './Pages/member/MemberContributions.jsx'
import MemberInitiatives from './Pages/member/MemberInitiatives.jsx'
import MemberAccount from './Pages/member/MemberAccount.jsx'

import AdminDashboard from './Pages/admin/AdminDashboard.jsx'
import AdminMembers from './Pages/admin/AdminMembers.jsx'
import AdminRequests from './Pages/admin/AdminRequests.jsx'
import AdminEvents from './Pages/admin/AdminEvents.jsx'
import AdminContributions from './Pages/admin/AdminContributions.jsx'
import AdminInitiatives from './Pages/admin/AdminInitiatives.jsx'
import AdminSettings from './Pages/admin/AdminSettings.jsx'

const memberLinks = [
  { label: 'Dashboard', to: '/member', icon: LayoutDashboard },
  { label: 'Mes activités', to: '/member/activites', icon: CalendarDays },
  { label: 'Mes cotisations', to: '/member/cotisations', icon: Wallet },
  { label: 'Mes initiatives', to: '/member/initiatives', icon: Lightbulb },
  { label: 'Mon compte', to: '/member/compte', icon: UserCircle },
]

const adminLinks = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Membres', to: '/admin/membres', icon: Users },
  { label: 'Demandes', to: '/admin/demandes', icon: ClipboardList },
  { label: 'Événements', to: '/admin/evenements', icon: CalendarPlus },
  { label: 'Cotisations', to: '/admin/cotisations', icon: Wallet },
  { label: 'Initiatives', to: '/admin/initiatives', icon: Lightbulb },
  { label: 'Paramètres', to: '/admin/parametres', icon: Settings },
]

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/app', element: <App /> },
  { path: '/join', element: <JoinUs /> },
  { path: '/login', element: <Login /> },

  {
    path: '/member',
    element: (
      <ProtectedRoute requiredRole="member">
        <DashboardLayout links={memberLinks} title="Mon espace membre" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <MemberDashboard /> },
      { path: 'activites', element: <MemberActivities /> },
      { path: 'cotisations', element: <MemberContributions /> },
      { path: 'initiatives', element: <MemberInitiatives /> },
      { path: 'compte', element: <MemberAccount /> },
    ],
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout links={adminLinks} title="Administration" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'membres', element: <AdminMembers /> },
      { path: 'demandes', element: <AdminRequests /> },
      { path: 'evenements', element: <AdminEvents /> },
      { path: 'cotisations', element: <AdminContributions /> },
      { path: 'initiatives', element: <AdminInitiatives /> },
      { path: 'parametres', element: <AdminSettings /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)