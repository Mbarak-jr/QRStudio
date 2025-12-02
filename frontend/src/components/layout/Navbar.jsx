import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Generate QR' },
    { path: '/history', label: 'History' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const isHistoryPage = location.pathname === "/history"

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl border-b border-purple-500/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl shadow-lg group-hover:shadow-cyan-500/25 group-hover:scale-105 transition-all duration-300">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" 
                />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              QRStudio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">

            {/* Show Back Button ONLY on History page */}
            {isHistoryPage && (
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 text-cyan-300 hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            )}

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-white bg-white/20 shadow-lg backdrop-blur-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
          >
            <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-cyan-400' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 mt-1.5 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-cyan-400' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-40 opacity-100 py-2' : 'max-h-0 opacity-0'
        }`}>

          {/* Back button for MOBILE ONLY on history page */}
          {isHistoryPage && (
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-cyan-300 bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          )}

          <div className="flex flex-col space-y-2 pb-2 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 backdrop-blur-sm ${
                  location.pathname === item.path
                    ? 'text-white bg-cyan-500/20 border-l-4 border-cyan-400 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border-l-4 border-transparent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
