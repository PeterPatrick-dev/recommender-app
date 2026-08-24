import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="w-full border-b border-[#2a2520] px-6 py-4 flex gap-6 flex-wrap">
      <Link to="/" className="text-[#c9a96e] hover:underline">Home</Link>
      <Link to="/login" className="text-[#c9a96e] hover:underline">Login</Link>
      <Link to="/signup" className="text-[#c9a96e] hover:underline">Sign Up</Link>
      <Link to="/recommend" className="text-[#c9a96e] hover:underline">Recommend</Link>
      <Link to="/profile" className="text-[#c9a96e] hover:underline">Profile</Link>
      <Link to="/library" className="text-[#c9a96e] hover:underline">My Library</Link>
      <Link to="/progress" className="text-[#c9a96e] hover:underline">Progress</Link>
      <Link to="/settings" className="text-[#c9a96e] hover:underline">Settings</Link>
    </nav>
  )
}

export default NavBar