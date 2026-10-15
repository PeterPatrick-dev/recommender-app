import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

function Settings() {
  const navigate = useNavigate()
  const [dailyReminders, setDailyReminders] = useState(
    localStorage.getItem('dailyReminders') !== 'false'
  )
  const [continueReadingAlerts, setContinueReadingAlerts] = useState(true)

  // Read the real logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
  const [name, setName] = useState(storedUser.name || '')
  const [email, setEmail] = useState(storedUser.email || '')

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const isLoggedIn = !!localStorage.getItem('token')

  async function handleSave(e) {
    e.preventDefault()
    setSaved(false)
    setError('')
    setSaving(true)

    try {
      localStorage.setItem('dailyReminders', dailyReminders)

      const token = localStorage.getItem('token')
      const response = await axios.patch(
        `${API_URL}/api/users/me`,
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Update localStorage with the fresh user data so other pages pick it up
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setSaved(true)
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong saving your settings'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  function Toggle({ enabled, onToggle }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
          enabled ? "bg-[#a8763a]" : "bg-[#e3dcc9]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        ></span>
      </button>
    )
  }

  return (
    <div className="max-w-lg py-16">
      <h1 className="text-3xl font-medium mb-10 text-[#2b2620]">Settings</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-8 bg-white border border-[#e3dcc9] rounded-xl p-6">
        <div>
          <h2 className="text-sm tracking-wide text-[#a8763a] uppercase mb-4">Account</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="settings-name" className="block text-sm text-[#7a7060] mb-1">Name</label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a] transition-colors"
              />
            </div>
            <div>
              <label htmlFor="settings-email" className="block text-sm text-[#7a7060] mb-1">Email</label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#e3dcc9] text-[#2b2620] focus:outline-none focus:border-[#a8763a] transition-colors"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-[#a8763a] uppercase mb-4">Notifications</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2b2620]">Daily reading reminders</p>
                <p className="text-xs text-[#7a7060]">Get a gentle nudge to read each day.</p>
              </div>
              <Toggle enabled={dailyReminders} onToggle={() => setDailyReminders(!dailyReminders)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2b2620]">Continue reading alerts</p>
                <p className="text-xs text-[#7a7060]">Reminders for books you haven't opened in a while.</p>
              </div>
              <Toggle enabled={continueReadingAlerts} onToggle={() => setContinueReadingAlerts(!continueReadingAlerts)} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-lg bg-[#a8763a] text-white font-medium hover:bg-[#b8854a] transition-colors self-start disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {saved && (
          <p className="text-sm text-[#a8763a]">
            ✓ Settings saved.
          </p>
        )}
        {error && (
          <p className="text-sm text-[#b4513f]">
            {error}
          </p>
        )}
      </form>

      {isLoggedIn && (
        <div className="mt-6 bg-white border border-[#e3dcc9] rounded-xl p-6">
          <h2 className="text-sm tracking-wide text-[#a8763a] uppercase mb-4">Session</h2>
          <p className="text-sm text-[#7a7060] mb-4">
            Logging out will end your session on this device. You'll need to log in again to access your library.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg border border-[#b4513f] text-[#b4513f] font-medium hover:bg-[#b4513f] hover:text-white transition-colors"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Settings