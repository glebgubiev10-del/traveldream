import { NextResponse } from 'next/server'

const tours = [
  { id: 1, name: "Волшебный Бали", destination_id: 1, description: "Незабываемое путешествие на остров богов. Посещение храмов, рисовых террас и вулкана Батур.", price: 85000, duration_days: 10, image: "/images/bali.jpg", rating: 4.9, max_people: 12, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки, экскурсии, трансфер", category: "classic", destination_name: "Бали", destination_country: "Индонезия" },
  { id: 2, name: "Романтика Парижа", destination_id: 2, description: "Тур в самое романтичное место планеты. Эйфелева башня, круиз по Сене, Монмартр и Лувр.", price: 120000, duration_days: 7, image: "/images/paris.jpg", rating: 4.8, max_people: 10, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки, экскурсии, страховка", category: "romantic", destination_name: "Париж", destination_country: "Франция" },
  { id: 3, name: "Мальдивская идиллия", destination_id: 3, description: "Роскошный отдых на вилле над океаном. Сноркелинг, дайвинг и спа-процедуры.", price: 180000, duration_days: 8, image: "/images/maldives.jpg", rating: 5.0, max_people: 6, difficulty: "easy", includes: "Перелёт, вилла 5★, всё включено, спа, трансфер", category: "luxury", destination_name: "Мальдивы", destination_country: "Мальдивская Республика" },
  { id: 4, name: "Откройте Токио", destination_id: 4, description: "Погружение в контрасты Японии. Храмы Киото, неоновый Синдзюку и гора Фудзи.", price: 140000, duration_days: 12, image: "/images/tokyo.jpg", rating: 4.7, max_people: 8, difficulty: "medium", includes: "Перелёт, рёканы + отель, завтраки, JR Pass, экскурсии", category: "adventure", destination_name: "Токио", destination_country: "Япония" },
  { id: 5, name: "Древний Рим", destination_id: 5, description: "Путешествие во времена императоров. Колизей, Форум, Ватикан и дегустация вин.", price: 95000, duration_days: 6, image: "/images/rome.jpg", rating: 4.8, max_people: 14, difficulty: "easy", includes: "Перелёт, отель 3★+, завтраки, экскурсии, дегустация", category: "classic", destination_name: "Рим", destination_country: "Италия" },
  { id: 6, name: "Дубай Люкс", destination_id: 6, description: "Роскошь и инновации. Бурдж-Халифа, Пальма Джумейра, пустынное сафари.", price: 150000, duration_days: 5, image: "/images/dubai.jpg", rating: 4.6, max_people: 10, difficulty: "easy", includes: "Перелёт, отель 5★, завтраки, сафари, шопинг-тур", category: "luxury", destination_name: "Дубай", destination_country: "ОАЭ" },
  { id: 7, name: "Майянская тайна", destination_id: 7, description: "Путешествие к древним цивилизациям. Чичен-Ица, сеноты и карибские пляжи.", price: 110000, duration_days: 9, image: "/images/cancun.jpg", rating: 4.5, max_people: 8, difficulty: "medium", includes: "Перелёт, отель 4★, завтраки, экскурсии, дайвинг", category: "adventure", destination_name: "Канкун", destination_country: "Мексика" },
  { id: 8, name: "Сейшельский рай", destination_id: 8, description: "Уединённый отдых на островах. Пляжи Анс-Сурс-д'Аржан, дайвинг и прогулки по джунглям.", price: 200000, duration_days: 10, image: "/images/seychelles.jpg", rating: 4.9, max_people: 4, difficulty: "easy", includes: "Перелёт, лодж 5★, всё включено, экскурсии, спа", category: "luxury", destination_name: "Сейшелы", destination_country: "Сейшельские Острова" },
  { id: 9, name: "Искусство Барселоны", destination_id: 9, description: "Следами Гауди. Саграда Фамилия, Парк Гуэль, Готический квартал и средиземноморские пляжи.", price: 90000, duration_days: 7, image: "/images/barcelona.jpg", rating: 4.7, max_people: 12, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки, экскурсии, тапас-тур", category: "cultural", destination_name: "Барселона", destination_country: "Испания" },
  { id: 10, name: "Тайский бриз", destination_id: 10, description: "Пляжи Пхукета, храмы Бангкока и ночные рынки. Тайский массаж и кулинарные курсы.", price: 75000, duration_days: 11, image: "/images/phuket.jpg", rating: 4.6, max_people: 16, difficulty: "easy", includes: "Перелёт, отель 3★+, завтраки, экскурсии, массаж", category: "classic", destination_name: "Пхукет", destination_country: "Таиланд" },
  { id: 11, name: "Нью-Йорк экспресс", destination_id: 11, description: "Мегаполис мечты. Таймс-сквер, Центральный парк, Статуя Свободы и Бродвей.", price: 135000, duration_days: 6, image: "/images/newyork.jpg", rating: 4.5, max_people: 10, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки, экскурсии, билеты на шоу", category: "classic", destination_name: "Нью-Йорк", destination_country: "США" },
  { id: 12, name: "Закат Санторини", destination_id: 12, description: "Греческая сказка. Белые домики Ии, закаты на кальдере, виноградники и чёрные пляжи.", price: 105000, duration_days: 8, image: "/images/santorini.jpg", rating: 4.9, max_people: 8, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки, круиз, дегустация вин", category: "romantic", destination_name: "Санторини", destination_country: "Греция" },
  { id: 13, name: "Бали Экстрим", destination_id: 1, description: "Активный тур для искателей приключений. Рафтинг, серфинг, треккинг к вулкану.", price: 95000, duration_days: 8, image: "/images/bali.jpg", rating: 4.7, max_people: 8, difficulty: "hard", includes: "Перелёт, отель 3★, завтраки, активити, инструктор", category: "adventure", destination_name: "Бали", destination_country: "Индонезия" },
  { id: 14, name: "Париж для двоих", destination_id: 2, description: "Романтическое путешествие. Ужин на Эйфелевой башне, круиз с шампанским, Лувр.", price: 160000, duration_days: 5, image: "/images/paris.jpg", rating: 5.0, max_people: 4, difficulty: "easy", includes: "Перелёт, отель 5★, завтраки + ужины, круиз, спа", category: "romantic", destination_name: "Париж", destination_country: "Франция" },
  { id: 15, name: "Гастрономическая Италия", destination_id: 5, description: "Вкусы Италии. Кулинарные мастер-классы, винные туры, посещение Неаполя и Помпей.", price: 130000, duration_days: 9, image: "/images/rome.jpg", rating: 4.8, max_people: 10, difficulty: "easy", includes: "Перелёт, отель 4★, завтраки + обеды, мастер-классы, дегустации", category: "cultural", destination_name: "Рим", destination_country: "Италия" },
  { id: 16, name: "Японская весна", destination_id: 4, description: "Сакура и чайные церемонии. Токио, Киото, Осака и Нара в цвету.", price: 165000, duration_days: 14, image: "/images/tokyo.jpg", rating: 4.9, max_people: 6, difficulty: "medium", includes: "Перелёт, рёканы + отель 5★, пансион, JR Pass, экскурсии", category: "cultural", destination_name: "Токио", destination_country: "Япония" },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const destination_id = searchParams.get('destination_id')
  const min_price = searchParams.get('min_price')
  const max_price = searchParams.get('max_price')
  const difficulty = searchParams.get('difficulty')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'rating'

  let result = [...tours]

  if (category) result = result.filter(t => t.category === category)
  if (destination_id) result = result.filter(t => t.destination_id === Number(destination_id))
  if (min_price) result = result.filter(t => t.price >= Number(min_price))
  if (max_price) result = result.filter(t => t.price <= Number(max_price))
  if (difficulty) result = result.filter(t => t.difficulty === difficulty)
  if (search) {
    const q = search.toLowerCase()
    result = result.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.destination_name.toLowerCase().includes(q)
    )
  }

  const sortMap: Record<string, (a: typeof tours[0], b: typeof tours[0]) => number> = {
    rating: (a, b) => b.rating - a.rating,
    price_asc: (a, b) => a.price - b.price,
    price_desc: (a, b) => b.price - a.price,
    duration: (a, b) => a.duration_days - b.duration_days,
  }

  result.sort(sortMap[sort] || sortMap.rating)
  return NextResponse.json(result)
}
