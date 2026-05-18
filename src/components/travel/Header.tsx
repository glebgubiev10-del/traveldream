'use client'

import { useState, useEffect } from 'react'
import { useNavigation, type Page } from '@/store/navigation'
import { Plane, Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems: { key: Page; label: string }[] = [
  { key: 'home', label: 'Главная' },
  { key: 'destinations', label: 'Направления' },
  { key: 'tours', label: 'Туры' },
  { key: 'about', label: 'О нас' },
  { key: 'contact', label: 'Контакты' },
]

export function Header() {
  const { currentPage, navigate } = useNavigation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (page: Page) => {
    navigate(page)
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/30 transition-shadow">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold leading-tight transition-colors ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                TravelDream
              </span>
              <span
                className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${
                  scrolled ? 'text-teal-600' : 'text-teal-300'
                }`}
              >
                Турагентство
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.key
                    ? scrolled
                      ? 'bg-teal-50 text-teal-700'
                      : 'bg-white/20 text-white'
                    : scrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Phone & Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+78001234567"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              <Phone className="w-4 h-4" />
              8 (800) 123-45-67
            </a>
            <Button
              onClick={() => handleNav('contact')}
              className={`hidden lg:flex transition-all ${
                scrolled
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              Забронировать
            </Button>
            <button
              className="md:hidden p-2 rounded-lg cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className={scrolled ? 'w-6 h-6 text-gray-900' : 'w-6 h-6 text-white'} />
              ) : (
                <Menu className={scrolled ? 'w-6 h-6 text-gray-900' : 'w-6 h-6 text-white'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-xl">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNav(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.key
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t mt-2">
              <a
                href="tel:+78001234567"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700"
              >
                <Phone className="w-4 h-4" />
                8 (800) 123-45-67
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
