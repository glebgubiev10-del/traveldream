'use client'

import { useState, useEffect } from 'react'
import { travelApi, type Tour } from '@/lib/travel-api'
import { useNavigation } from '@/store/navigation'
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
  Heart,
  SlidersHorizontal,
  Mountain,
  Gem,
  Palette,
  X,
  Check,
} from 'lucide-react'

const categories = [
  { value: '', label: 'Все', icon: Plane },
  { value: 'classic', label: 'Классика', icon: Star },
  { value: 'romantic', label: 'Романтика', icon: Heart },
  { value: 'luxury', label: 'Люкс', icon: Gem },
  { value: 'adventure', label: 'Приключения', icon: Mountain },
  { value: 'cultural', label: 'Культура', icon: Palette },
]

const categoryColors: Record<string, string> = {
  classic: 'bg-teal-100 text-teal-700',
  romantic: 'bg-rose-100 text-rose-700',
  luxury: 'bg-amber-100 text-amber-700',
  adventure: 'bg-orange-100 text-orange-700',
  cultural: 'bg-purple-100 text-purple-700',
}

const categoryLabels: Record<string, string> = {
  classic: 'Классика',
  romantic: 'Романтика',
  luxury: 'Люкс',
  adventure: 'Приключения',
  cultural: 'Культура',
}

const difficulties = [
  { value: '', label: 'Любая' },
  { value: 'easy', label: 'Лёгкая' },
  { value: 'medium', label: 'Средняя' },
  { value: 'hard', label: 'Сложная' },
]

const sortOptions = [
  { value: 'rating', label: 'По рейтингу' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'duration', label: 'По длительности' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}

export function ToursPage() {
  const { navigate } = useNavigation()
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [sort, setSort] = useState('rating')
  const [search, setSearch] = useState('')
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  const handleCategoryChange = (val: string) => { setCategory(val); setLoading(true) }
  const handleDifficultyChange = (val: string) => { setDifficulty(val); setLoading(true) }
  const handleSortChange = (val: string) => { setSort(val); setLoading(true) }
  const handleSearchChange = (val: string) => { setSearch(val); setLoading(true) }

  useEffect(() => {
    let cancelled = false
    travelApi
      .getTours({ category: category || undefined, difficulty: difficulty || undefined, sort, search: search || undefined })
      .then((data) => { if (!cancelled) setTours(data) })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [category, difficulty, sort, search])

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-emerald-600 via-teal-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">
            <Plane className="w-3 h-3 mr-1" />
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Туры</h1>
          <p className="text-lg text-teal-100 max-w-xl">
            Выберите идеальный тур из нашего каталога. Фильтруйте по категории, сложности и цене.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="shadow-xl border-0">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск по названию тура..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* Category filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-gray-500 shrink-0" />
                {categories.map((c) => (
                  <Button
                    key={c.value}
                    size="sm"
                    variant={category === c.value ? 'default' : 'outline'}
                    onClick={() => handleCategoryChange(c.value)}
                    className={category === c.value ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
                  >
                    <c.icon className="w-3 h-3 mr-1" />
                    {c.label}
                  </Button>
                ))}
              </div>
              {/* Difficulty & Sort */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Сложность:</span>
                  {difficulties.map((d) => (
                    <Button
                      key={d.value}
                      size="sm"
                      variant={difficulty === d.value ? 'default' : 'ghost'}
                      onClick={() => handleDifficultyChange(d.value)}
                      className={
                        difficulty === d.value ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''
                      }
                    >
                      {d.label}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-gray-500 hidden sm:inline">Сортировка:</span>
                  <div className="flex gap-1">
                    {sortOptions.map((s) => (
                      <Button
                        key={s.value}
                        size="sm"
                        variant={sort === s.value ? 'default' : 'ghost'}
                        onClick={() => handleSortChange(s.value)}
                        className={
                          sort === s.value ? 'bg-teal-600 hover:bg-teal-700 text-white text-xs' : 'text-xs'
                        }
                      >
                        {s.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tours Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-5">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16">
            <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Туры не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить фильтры</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
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
                  <h3
                    className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedTour(tour)}
                  >
                    {tour.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tour.description}</p>

                  {/* Includes */}
                  {tour.includes && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tour.includes.split(', ').slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
                        >
                          <Check className="w-2.5 h-2.5 text-teal-500" />
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {tour.duration_days} дней
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      до {tour.max_people} чел.
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        tour.difficulty === 'easy'
                          ? 'bg-green-50 text-green-700'
                          : tour.difficulty === 'medium'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {tour.difficulty === 'easy'
                        ? 'Лёгкая'
                        : tour.difficulty === 'medium'
                        ? 'Средняя'
                        : 'Сложная'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <span className="text-xs text-gray-500">от</span>
                      <span className="text-xl font-bold text-teal-700 ml-1">
                        {formatPrice(tour.price)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedTour(tour)}
                      >
                        Подробнее
                      </Button>
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={() => navigate('contact')}
                      >
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Tour Detail Modal */}
      {selectedTour && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedTour(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedTour.image}
                alt={selectedTour.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge
                  className={`${categoryColors[selectedTour.category]} text-xs mb-2`}
                >
                  {categoryLabels[selectedTour.category]}
                </Badge>
                <h2 className="text-2xl font-bold text-white">{selectedTour.name}</h2>
                <p className="text-sm text-white/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedTour.destination_name}, {selectedTour.destination_country}
                </p>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-amber-100 text-amber-700">
                  <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" />
                  {selectedTour.rating}
                </Badge>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedTour.duration_days} дней
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  до {selectedTour.max_people} чел.
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{selectedTour.description}</p>

              {/* Includes */}
              {selectedTour.includes && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">В стоимость включено:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTour.includes.split(', ').map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-teal-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">Цена от</span>
                  <span className="text-3xl font-bold text-teal-700 ml-2">
                    {formatPrice(selectedTour.price)}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    setSelectedTour(null)
                    navigate('contact')
                  }}
                >
                  Забронировать
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
