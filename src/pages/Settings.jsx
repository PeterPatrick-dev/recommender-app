import { useState } from 'react'

function Settings() {
  const [dailyReminders, setDailyReminders] = useState(
  localStorage.getItem('dailyReminders') !== 'false')
  const [continueReadingAlerts, setContinueReadingAlerts] = useState(true)
  const [name, setName] = useState("Priest Peterson")
  const [email, setEmail] = useState("priest@example.com")
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
  e.preventDefault()
  localStorage.setItem('dailyReminders', dailyReminders)
  console.log("Settings saved:", { name, email, dailyReminders, continueReadingAlerts })
  setSaved(true)
}

  function Toggle({ enabled, onToggle }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${
          enabled ? "bg-[#c9a96e]" : "bg-[#3a352d]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#0e0c0a] transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        ></span>
      </button>
    )
  }

  return (
    <div className="max-w-lg mx-auto py-16">
      <h1 className="text-3xl font-medium mb-10">Settings</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        <div>
          <h2 className="text-sm tracking-wide text-[#c9a96e] uppercase mb-4">Account</h2>
          <div className="flex flex-col gap-4">
           <div>
  <label htmlFor="settings-name" className="block text-sm text-[#9a9186] mb-1">Name</label>
  <input
    id="settings-name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-4 py-3 rounded-lg bg-[#161310] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e] transition-colors"
  />
</div>
            <div>
  <label htmlFor="settings-email" className="block text-sm text-[#9a9186] mb-1">Email</label>
  <input
    id="settings-email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full px-4 py-3 rounded-lg bg-[#161310] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e] transition-colors"
  />
</div>
          </div>
        </div>

        <div>
          <h2 className="text-sm tracking-wide text-[#c9a96e] uppercase mb-4">Notifications</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Daily reading reminders</p>
                <p className="text-xs text-[#9a9186]">Get a gentle nudge to read each day.</p>
              </div>
              <Toggle enabled={dailyReminders} onToggle={() => setDailyReminders(!dailyReminders)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Continue reading alerts</p>
                <p className="text-xs text-[#9a9186]">Reminders for books you haven't opened in a while.</p>
              </div>
              <Toggle enabled={continueReadingAlerts} onToggle={() => setContinueReadingAlerts(!continueReadingAlerts)} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors self-start"
        >
          Save Changes
        </button>

        {saved && (
          <p className="text-sm text-[#9a9186]">
            (Mock save — real persistence coming in a later phase.)
          </p>
        )}
      </form>
    </div>
  )
}

export default Settings