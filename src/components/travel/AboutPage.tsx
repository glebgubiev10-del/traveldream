'use client'

import { useState, useEffect } from 'react'
import { travelApi, type Stats } from '@/lib/travel-api'
import { useNavigation } from '@/store/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Award,
  Globe,
  Heart,
  Users,
  Shield,
  Clock,
  Phone,
  ArrowRight,
  Target,
  Eye,
  Sparkles,
} from 'lucide-react'

const team = [
  { name: 'Елена Соколова', role: 'Генеральный директор', exp: '15 лет в туризме' },
  { name: 'Дмитрий Волков', role: 'Руководитель отдела туров', exp: '12 лет в туризме' },
  { name: 'Мария Иванова', role: 'Менеджер по работе с клиентами', exp: '8 лет в туризме' },
  { name: 'Алексей Петров', role: 'Специалист по Азии', exp: '10 лет в туризме' },
  { name: 'Ольга Козлова', role: 'Специалист по Европе', exp: '9 лет в туризме' },
  { name: 'Игорь Сидоров', role: 'Логистика и визы', exp: '11 лет в туризме' },
]

const milestones = [
  { year: '2015', text: 'Основание TravelDream' },
  { year: '2017', text: '1000-й довольный клиент' },
  { year: '2019', text: 'Открытие офиса в Санкт-Петербурге' },
  { year: '2021', text: 'Онлайн-платформа запущена' },
  { year: '2023', text: '10 000+ клиентов' },
  { year: '2025', text: '500+ направлений по всему миру' },
]

export function AboutPage() {
  const { navigate } = useNavigation()
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    travelApi.getStats().then(setStats).catch(console.error)
  }, [])

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-emerald-700 via-teal-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">
            <Heart className="w-3 h-3 mr-1" />
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">О нас</h1>
          <p className="text-lg text-teal-100 max-w-xl">
            Мы создаём незабываемые путешествия уже более 10 лет. Узнайте нашу историю.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="w-3 h-3 mr-1" />
              Наша история
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Путешествия — это не просто отдых, это образ жизни
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                TravelDream был основан в 2015 году группой увлечённых путешественников, которые
                верили: каждый заслуживает незабываемых впечатлений. Мы начинали как маленькое
                агентство с тремя сотрудниками и большой мечтой.
              </p>
              <p>
                Сегодня мы — команда из 25 профессионалов, которая организует туры по 500+
                направлениям по всему миру. Наши клиенты — это наша семья, и мы относимся к
                каждому с такой же заботой, как к себе.
              </p>
              <p>
                Мы работаем напрямую с отелями, авиакомпаниями и локальными гидами, чтобы
                предлагать лучшие цены без ущерба для качества. Каждый тур — это тщательно
                продуманный маршрут, созданный с любовью.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/about-team.jpg"
              alt="Команда TravelDream"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">10+</div>
                  <div className="text-xs text-gray-500">Лет опыта</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Наша миссия</h3>
                <p className="text-gray-600 leading-relaxed">
                  Делать путешествия доступными каждому. Мы подбираем идеальные решения под любой
                  бюджет, сохраняя при этом высочайший уровень сервиса и безопасности.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Наше видение</h3>
                <p className="text-gray-600 leading-relaxed">
                  Стать самым доверенным турагентством в России, известным персональным подходом,
                  инновационными решениями и искренней заботой о каждом клиенте.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Globe, value: `${stats.destinations}+`, label: 'Направлений', color: 'text-teal-600' },
              { icon: Users, value: '10 000+', label: 'Довольных клиентов', color: 'text-emerald-600' },
              { icon: Award, value: '25+', label: 'Экспертов в команде', color: 'text-amber-600' },
              { icon: Clock, value: '10+', label: 'Лет на рынке', color: 'text-rose-600' },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-2">
              <Clock className="w-3 h-3 mr-1" />
              Наш путь
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900">История компании</h2>
          </div>
          <div className="space-y-6">
            {milestones.map((ms, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-16 text-right">
                  <span className="text-lg font-bold text-teal-600">{ms.year}</span>
                </div>
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-teal-500 border-4 border-teal-100" />
                  {i < milestones.length - 1 && <div className="w-0.5 h-12 bg-teal-100" />}
                </div>
                <div className="pb-6">
                  <p className="text-gray-700 font-medium">{ms.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-2">
            <Users className="w-3 h-3 mr-1" />
            Команда
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900">Наши эксперты</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-teal-600 font-medium">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">{member.exp}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Готовы отправиться в путешествие?
          </h2>
          <p className="text-lg text-teal-100 mb-8">
            Свяжитесь с нами, и мы подберём идеальный тур для вас
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('contact')}
              className="bg-white text-teal-700 hover:bg-gray-50 shadow-xl px-8"
            >
              Связаться с нами
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a href="tel:+78001234567">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 px-8 w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                8 (800) 123-45-67
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
