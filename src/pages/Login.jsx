import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/profile')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-3xl font-medium mb-2 text-center">Welcome back</h1>
      <p className="text-[#9a9186] text-center mb-8">Log in to continue your reading journey.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-[#c9a96e] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#161310] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-[#c9a96e] mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#161310] border border-[#3a352d] text-[#f4ede1] focus:outline-none focus:border-[#c9a96e] transition-colors"
          />
        </div>

        {error && <p className="text-sm text-[#c97a6e]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-3 rounded-lg bg-[#c9a96e] text-[#0e0c0a] font-medium hover:bg-[#d9bc85] transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="text-sm text-[#9a9186] text-center mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#c9a96e] hover:underline">Sign up</Link>
      </p>
    </div>
  )
}

export default Login