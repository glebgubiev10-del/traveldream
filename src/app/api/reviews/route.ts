import { NextResponse } from 'next/server'

const reviews = [
  { id: 1, author_name: "Анна К.", author_avatar: "", text: "Невероятное путешествие на Бали! Всё было организовано на высшем уровне. Гиды — настоящие профессионалы.", rating: 5, tour_id: 1, created_at: "2025-01-15" },
  { id: 2, author_name: "Дмитрий С.", author_avatar: "", text: "Париж превзошёл все ожидания. Особенно запомнился круиз по Сене вечером.", rating: 5, tour_id: 2, created_at: "2025-01-20" },
  { id: 3, author_name: "Мария В.", author_avatar: "", text: "Мальдивы — это рай на земле. Вилла над океаном — лучшее, что мы когда-либо видели!", rating: 5, tour_id: 3, created_at: "2025-02-01" },
  { id: 4, author_name: "Алексей П.", author_avatar: "", text: "Токио — это другой мир. Удивительный контраст традиций и технологий. Рекомендую!", rating: 4, tour_id: 4, created_at: "2025-02-10" },
  { id: 5, author_name: "Елена М.", author_avatar: "", text: "Рим — город, в который влюбляешься навсегда. А итальянская кухня — отдельный восторг!", rating: 5, tour_id: 5, created_at: "2025-02-15" },
  { id: 6, author_name: "Игорь Л.", author_avatar: "", text: "Дубай поразил масштабами. Бурдж-Халифа ночью — незабываемое зрелище.", rating: 4, tour_id: 6, created_at: "2025-03-01" },
  { id: 7, author_name: "Ольга Р.", author_avatar: "", text: "Канкун — идеальное сочетание пляжного и культурного отдыха. Сеноты — магия!", rating: 4, tour_id: 7, created_at: "2025-03-10" },
  { id: 8, author_name: "Сергей Н.", author_avatar: "", text: "Сейшелы — самое красивое место из всех, где я был. Обязательно вернусь!", rating: 5, tour_id: 8, created_at: "2025-03-20" },
  { id: 9, author_name: "Наталья Т.", author_avatar: "", text: "Барселона Гауди — это феерия! Парк Гуэль и Саграда — шедевры.", rating: 5, tour_id: 9, created_at: "2025-04-01" },
  { id: 10, author_name: "Павел Д.", author_avatar: "", text: "Пхукет — отличный выбор для семьи. Дети в восторге от слонов и пляжей.", rating: 4, tour_id: 10, created_at: "2025-04-10" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tourId = searchParams.get('tour_id')
  const limit = Number(searchParams.get('limit') || 10)

  let result = [...reviews]
  if (tourId) result = result.filter(r => r.tour_id === Number(tourId))
  result.sort((a, b) => b.created_at.localeCompare(a.created_at))
  return NextResponse.json(result.slice(0, limit))
}
