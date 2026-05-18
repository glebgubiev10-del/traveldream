'use client'

import { useState, useEffect } from 'react'
import { useNavigation } from '@/store/navigation'
import { travelApi, type Destination, type Tour, type Review, type Stats } from '@/lib/travel-api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Search,
  MapPin,
  Star,
  Clock,
  Users,
  ArrowRight,
  Plane,
  Globe,
  Heart,
  Shield,
  ChevronRight,
  Quote,
  Sparkles,
} from 'lucide-react'

const categoryLabels: Record<string, string> = {
  classic: 'Классика',
  romantic: 'Романтика',
  luxury: 'Люкс',
  adventure: 'Приключения',
  cultural: 'Культура',
}

const categoryColors: Record<string, string> = {
  classic: 'bg-teal-100 text-teal-700',
  romantic: 'bg-rose-100 text-rose-700',
  luxury: 'bg-amber-100 text-amber-700',
  adventure: 'bg-orange-100 text-orange-700',
  cultural: 'bg-purple-100 text-purple-700',
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export function HomePage() {
  const { navigate } = useNavigation()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [tours, setTours] = useState<Tour[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    travelApi.getDestinations({ featured: true }).then(setDestinations).catch(console.error)
    travelApi.getTours({ sort: 'rating' }).then((t) => setTours(t.slice(0, 6))).catch(console.error)
    travelApi.getReviews(undefined, 6).then(setReviews).catch(console.error)
    travelApi.getStats().then(setStats).catch(console.error)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('tours')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Тропический пляж"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Сезон 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Откройте мир
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                путешествий мечты
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Подберём идеальный тур под ваши желания. От тропических пляжей до горных вершин —
              весь мир у ваших ног.
            </p>

            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 max-w-xl">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Куда вы хотите поехать?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 h-12 bg-white/95 border-0 text-gray-900 placeholder:text-gray-400 rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-12 px-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl shadow-lg shadow-teal-500/25"
                >
                  Найти
                </Button>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['Бали', 'Мальдивы', 'Париж', 'Токио'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag)
                      navigate('tours')
                    }}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white/90 text-xs rounded-full transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="relative -mt-16 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, value: `${stats.destinations}+`, label: 'Направлений' },
              { icon: Plane, value: `${stats.tours}+`, label: 'Туров' },
              { icon: Users, value: '10 000+', label: 'Клиентов' },
              { icon: Star, value: stats.avg_rating, label: 'Средний рейтинг' },
            ].map((stat, i) => (
              <Card key={i} className="bg-white shadow-xl border-0 text-center py-5">
                <CardContent className="p-0">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Popular Destinations */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <Badge variant="secondary" className="mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              Топ направлений
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">Популярные направления</h2>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('destinations')}
            className="hidden sm:flex items-center gap-1 text-teal-600 hover:text-teal-700"
          >
            Все направления
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 6).map((dest) => (
            <Card
              key={dest.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate('destinations')}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-900 shadow">
                    <Star className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" />
                    {dest.rating}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-white/80 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {dest.country}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{dest.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {dest.tours_count} туров доступно
                  </span>
                  <span className="text-teal-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Подробнее <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Button variant="outline" onClick={() => navigate('destinations')}>
            Все направления
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">
                <Plane className="w-3 h-3 mr-1" />
                Лучшие предложения
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900">Горящие туры</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('tours')}
              className="hidden sm:flex items-center gap-1 text-teal-600 hover:text-teal-700"
            >
              Все туры
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('tours')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image.replace('/images/', '/images/')}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`${categoryColors[tour.category] || 'bg-gray-100 text-gray-700'} text-xs`}
                    >
                      {categoryLabels[tour.category] || tour.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-900 shadow">
                      <Star className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" />
                      {tour.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    {tour.destination_name}, {tour.destination_country}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{tour.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tour.duration_days} дней
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      до {tour.max_people} чел.
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-xs text-gray-500">от</span>
                      <span className="text-xl font-bold text-teal-700 ml-1">
                        {formatPrice(tour.price)}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate('contact')
                      }}
                    >
                      Забронировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-2">
            <Heart className="w-3 h-3 mr-1" />
            Почему мы
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900">6 причин выбрать TravelDream</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: 'Гарантия безопасности',
              desc: 'Все туры застрахованы. Мы работаем только с проверенными партнёрами.',
              color: 'bg-teal-50 text-teal-600',
            },
            {
              icon: Heart,
              title: 'Индивидуальный подход',
              desc: 'Подберём тур под ваш бюджет и пожелания. Никаких шаблонов.',
              color: 'bg-rose-50 text-rose-600',
            },
            {
              icon: Globe,
              title: '500+ направлений',
              desc: 'От Мальдив до Исландии — огромный выбор туров на любой вкус.',
              color: 'bg-amber-50 text-amber-600',
            },
            {
              icon: Clock,
              title: 'Поддержка 24/7',
              desc: 'На связи в любой точке мира. Решим любой вопрос моментально.',
              color: 'bg-blue-50 text-blue-600',
            },
            {
              icon: Star,
              title: 'Лучшие цены',
              desc: 'Прямые контракты с отелями и авиакомпаниями без наценок.',
              color: 'bg-emerald-50 text-emerald-600',
            },
            {
              icon: Users,
              title: '10 000+ клиентов',
              desc: 'Доверие тысяч путешественников — наша главная награда.',
              color: 'bg-purple-50 text-purple-600',
            },
          ].map((item, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-2">
              <Quote className="w-3 h-3 mr-1" />
              Отзывы
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">Что говорят наши клиенты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <Card key={review.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.author_name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{review.author_name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-700 p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Готовы к приключению?
            </h2>
            <p className="text-lg text-teal-100 mb-8 max-w-lg mx-auto">
              Оставьте заявку и мы подберём идеальный тур специально для вас
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('contact')}
                className="bg-white text-teal-700 hover:bg-gray-50 shadow-xl px-8"
              >
                Оставить заявку
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('tours')}
                className="border-white/40 text-white hover:bg-white/10 px-8"
              >
                Смотреть туры
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
