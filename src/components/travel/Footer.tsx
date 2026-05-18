'use client'

import { useNavigation, type Page } from '@/store/navigation'
import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

const footerLinks: { page: Page; label: string }[] = [
  { page: 'home', label: 'Главная' },
  { page: 'destinations', label: 'Направления' },
  { page: 'tours', label: 'Туры' },
  { page: 'about', label: 'О нас' },
  { page: 'contact', label: 'Контакты' },
]

export function Footer() {
  const { navigate } = useNavigation()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Plane className="w-5 h-5 text-white transform -rotate-45" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">TravelDream</span>
                <span className="block text-[10px] tracking-wider uppercase text-teal-400">
                  Турагентство
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Открываем мир вместе с 2015 года. Более 10 000 довольных клиентов и 500+ направлений
              по всему миру.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Популярные направления</h4>
            <ul className="space-y-2">
              {['Бали', 'Мальдивы', 'Париж', 'Санторини', 'Дубай'].map((dest) => (
                <li key={dest}>
                  <button
                    onClick={() => navigate('destinations')}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-teal-400 shrink-0" />
                <div>
                  <a href="tel:+78001234567" className="text-sm hover:text-teal-400 transition-colors">
                    8 (800) 123-45-67
                  </a>
                  <p className="text-xs text-gray-500">Бесплатно по РФ</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-teal-400 shrink-0" />
                <a
                  href="mailto:info@traveldream.ru"
                  className="text-sm hover:text-teal-400 transition-colors"
                >
                  info@traveldream.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-teal-400 shrink-0" />
                <span className="text-sm">Москва, ул. Тверская, 12</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 TravelDream. Все права защищены.</p>
          <p className="text-xs text-gray-500">
            Сделано с ❤️ для путешественников
          </p>
        </div>
      </div>
    </footer>
  )
}
