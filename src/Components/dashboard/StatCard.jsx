import React from 'react'

function StatCard({ icon: Icon, label, value, badge, iconBg = 'bg-[#D6336C]/10', iconColor = 'text-[#D6336C]' }) {
  return (
    <div className="glow-pink bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
        {badge && (
          <span className="text-xs font-semibold bg-green-50 text-green-600 px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  )
}

export default StatCard