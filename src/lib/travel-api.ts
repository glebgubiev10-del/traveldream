async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, options)
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export interface Destination {
  id: number
  name: string
  country: string
  description: string
  image: string
  rating: number
  tours_count: number
  continent: string
  featured: number
}

export interface Tour {
  id: number
  name: string
  destination_id: number
  description: string
  price: number
  duration_days: number
  image: string
  rating: number
  max_people: number
  difficulty: string
  includes: string
  category: string
  destination_name: string
  destination_country: string
}

export interface Review {
  id: number
  author_name: string
  author_avatar: string
  text: string
  rating: number
  tour_id: number
  created_at: string
}

export interface Stats {
  destinations: number
  tours: number
  reviews: number
  avg_rating: number
}

export interface ContactRequest {
  name: string
  email: string
  phone: string
  message: string
}

export const travelApi = {
  getDestinations: (params?: { continent?: string; featured?: boolean; search?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.continent) searchParams.set('continent', params.continent)
    if (params?.featured !== undefined) searchParams.set('featured', String(params.featured))
    if (params?.search) searchParams.set('search', params.search)
    const qs = searchParams.toString()
    return apiFetch<Destination[]>(`/destinations${qs ? `?${qs}` : ''}`)
  },

  getDestination: (id: number) => apiFetch<Destination>(`/destinations/${id}`),

  getTours: (params?: {
    category?: string
    destination_id?: number
    min_price?: number
    max_price?: number
    difficulty?: string
    search?: string
    sort?: string
  }) => {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set('category', params.category)
    if (params?.destination_id) searchParams.set('destination_id', String(params.destination_id))
    if (params?.min_price !== undefined) searchParams.set('min_price', String(params.min_price))
    if (params?.max_price !== undefined) searchParams.set('max_price', String(params.max_price))
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty)
    if (params?.search) searchParams.set('search', params.search)
    if (params?.sort) searchParams.set('sort', params.sort)
    const qs = searchParams.toString()
    return apiFetch<Tour[]>(`/tours${qs ? `?${qs}` : ''}`)
  },

  getTour: (id: number) => apiFetch<Tour>(`/tours/${id}`),

  getReviews: (tourId?: number, limit?: number) => {
    const searchParams = new URLSearchParams()
    if (tourId) searchParams.set('tour_id', String(tourId))
    if (limit) searchParams.set('limit', String(limit))
    const qs = searchParams.toString()
    return apiFetch<Review[]>(`/reviews${qs ? `?${qs}` : ''}`)
  },

  getStats: () => apiFetch<Stats>('/stats'),

  submitContact: (data: ContactRequest) =>
    apiFetch<{ success: boolean; message: string }>('/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
}
