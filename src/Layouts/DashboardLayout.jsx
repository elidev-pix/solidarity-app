import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

function DashboardLayout({ links, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar links={links} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-64 p-5 sm:p-8">
        <Topbar title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout