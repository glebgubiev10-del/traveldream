'use client'

import { useState, useEffect, useMemo } from 'react'
import { travelApi, type Destination } from '@/lib/travel-api'
import { useNavigation } from '@/store/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MapPin, Star, Search, SlidersHorizontal, ArrowRight } from 'lucide-react'

const continents = [
  { value: '', label: 'Все' },
  { value: 'Европа', label: '🇪🇺 Европа' },
  { value: 'Азия', label: '🌏 Азия' },
  { value: 'Америка', label: '🌎 Америка' },
  { value: 'Африка', label: '🌍 Африка' },
]

export function DestinationsPage() {
  const { navigate } = useNavigation()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [continent, setContinent] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    travelApi.getDestinations().then(setDestinations).catch(console.error).finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let result = destinations
    if (continent) result = result.filter((d) => d.continent === continent)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [destinations, continent, search])

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-white rounded-full translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">
            <MapPin className="w-3 h-3 mr-1" />
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Направления</h1>
          <p className="text-lg text-teal-100 max-w-xl">
            Откройте для себя удивительные места по всему миру. Выберите свой идеальный маршрут.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="shadow-xl border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Поиск по названию или стране..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <SlidersHorizontal className="w-4 h-4 text-gray-500 hidden sm:block" />
                {continents.map((c) => (
                  <Button
                    key={c.value}
                    size="sm"
                    variant={continent === c.value ? 'default' : 'outline'}
                    onClick={() => setContinent(c.value)}
                    className={
                      continent === c.value
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : ''
                    }
                  >
                    {c.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-md">
                <div className="h-56 bg-gray-200 animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((dest) => (
              <Card
                key={dest.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate('tours')}
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
                  {dest.featured ? (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-500 text-white shadow">Хит</Badge>
                    </div>
                  ) : null}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                    <p className="text-sm text-white/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {dest.country} · {dest.continent}
                    </p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{dest.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {dest.tours_count} туров доступно
                    </span>
                    <span className="text-teal-600 text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Смотреть туры <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
