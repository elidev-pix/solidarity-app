import React, { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { useSettings, updateSettings } from '../../data/mockSettings.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-8 rounded-full transition-colors ${checked ? 'bg-[#D6336C]' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}
      />
    </button>
  )
}

function AdminSettings() {
  const { data: settings, loading } = useSettings()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (settings) setForm(settings)
  }, [settings])

  async function handleSave() {
    setSaving(true)
    await updateSettings(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading || !form) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 max-w-xl">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Ouverture des adhésions</h3>
          <p className="text-sm text-gray-500 mt-1">
            Active ou ferme la candidature en ligne sur la page "Rejoindre".
          </p>
        </div>
        <ToggleSwitch
          checked={form.registrationOpen}
          onChange={(val) => setForm({ ...form, registrationOpen: val })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Date d'ouverture de la campagne</label>
          <input
            type="date"
            value={form.campaignStart}
            onChange={(e) => setForm({ ...form, campaignStart: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">Date de fermeture de la campagne</label>
          <input
            type="date"
            value={form.campaignEnd}
            onChange={(e) => setForm({ ...form, campaignEnd: e.target.value })}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C]"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="glow-pink flex items-center justify-center gap-2 self-start bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
      >
        <Save size={16} /> {saving ? 'Enregistrement...' : saved ? 'Enregistré ✓' : 'Enregistrer les paramètres'}
      </button>
    </div>
  )
}

export default AdminSettings