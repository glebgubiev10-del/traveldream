import { NextResponse } from 'next/server'

const destinations = [
  { id: 1, name: "Бали", country: "Индонезия", description: "Тропический рай с вулканами, рисовыми террасами и храмами. Идеальное место для расслабления и приключений.", image: "/images/bali.jpg", rating: 4.8, tours_count: 12, continent: "Азия", featured: 1 },
  { id: 2, name: "Париж", country: "Франция", description: "Город любви и света. Эйфелева башня, Лувр, круизы по Сене и лучшая кухня мира.", image: "/images/paris.jpg", rating: 4.9, tours_count: 8, continent: "Европа", featured: 1 },
  { id: 3, name: "Мальдивы", country: "Мальдивская Республика", description: "Белоснежные пляжи, бирюзовая вода и виллы на воде. Идеальный выбор для романтического отдыха.", image: "/images/maldives.jpg", rating: 4.7, tours_count: 6, continent: "Азия", featured: 1 },
  { id: 4, name: "Токио", country: "Япония", description: "Уникальное сочетание древних традиций и ультрасовременных технологий. Храмы, сады, аниме-культура.", image: "/images/tokyo.jpg", rating: 4.6, tours_count: 5, continent: "Азия", featured: 0 },
  { id: 5, name: "Рим", country: "Италия", description: "Вечный город с Колизеем, Ватиканом и потрясающей итальянской кухней.", image: "/images/rome.jpg", rating: 4.8, tours_count: 7, continent: "Европа", featured: 1 },
  { id: 6, name: "Дубай", country: "ОАЭ", description: "Футуристический мегаполис посреди пустыни. Небоскрёбы, шопинг и пустынные сафари.", image: "/images/dubai.jpg", rating: 4.5, tours_count: 4, continent: "Азия", featured: 0 },
  { id: 7, name: "Канкун", country: "Мексика", description: "Карибское побережье с древними руинами майя, сенотами и яркой ночной жизнью.", image: "/images/cancun.jpg", rating: 4.4, tours_count: 3, continent: "Америка", featured: 0 },
  { id: 8, name: "Сейшелы", country: "Сейшельские Острова", description: "Нетронутые пляжи, гранитные скалы и тропические джунгли. Рай для любителей дайвинга.", image: "/images/seychelles.jpg", rating: 4.9, tours_count: 3, continent: "Африка", featured: 1 },
  { id: 9, name: "Барселона", country: "Испания", description: "Архитектура Гауди, средиземноморские пляжи, тапас и фламенко.", image: "/images/barcelona.jpg", rating: 4.7, tours_count: 6, continent: "Европа", featured: 0 },
  { id: 10, name: "Пхукет", country: "Таиланд", description: "Жемчужина Андаманского моря. Пляжи, храмы, тайский массаж и уличная еда.", image: "/images/phuket.jpg", rating: 4.5, tours_count: 8, continent: "Азия", featured: 0 },
  { id: 11, name: "Нью-Йорк", country: "США", description: "Город, который никогда не спит. Статуя Свободы, Таймс-сквер, Центральный парк.", image: "/images/newyork.jpg", rating: 4.6, tours_count: 4, continent: "Америка", featured: 0 },
  { id: 12, name: "Санторини", country: "Греция", description: "Белоснежные дома с синими крышами на краю вулкана. Незабываемые закаты.", image: "/images/santorini.jpg", rating: 4.9, tours_count: 5, continent: "Европа", featured: 1 },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const continent = searchParams.get('continent')
  const featured = searchParams.get('featured')
  const search = searchParams.get('search')

  let result = destinations

  if (continent) result = result.filter(d => d.continent === continent)
  if (featured !== null) result = result.filter(d => d.featured === (featured === 'true' ? 1 : 0))
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    )
  }

  result.sort((a, b) => b.rating - a.rating)
  return NextResponse.json(result)
}
