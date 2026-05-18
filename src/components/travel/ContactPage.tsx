'use client'

import { useState } from 'react'
import { travelApi, type ContactRequest } from '@/lib/travel-api'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '8 (800) 123-45-67',
    sub: 'Бесплатно по РФ',
    href: 'tel:+78001234567',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@traveldream.ru',
    sub: 'Ответим в течение 2 часов',
    href: 'mailto:info@traveldream.ru',
  },
  {
    icon: MapPin,
    title: 'Офис',
    value: 'Москва, ул. Тверская, 12',
    sub: 'Пн-Пт 9:00-20:00',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Режим работы',
    value: 'Пн-Пт: 9:00-20:00',
    sub: 'Сб-Вс: 10:00-18:00',
    href: '#',
  },
]

export function ContactPage() {
  const [form, setForm] = useState<ContactRequest>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await travelApi.submitContact(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (field: keyof ContactRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-white rounded-full translate-y-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">
            <MessageSquare className="w-3 h-3 mr-1" />
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Контакты</h1>
          <p className="text-lg text-teal-100 max-w-xl">
            Свяжитесь с нами любым удобным способом. Мы всегда рады помочь!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <a key={i} href={info.href}>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 bg-teal-50 rounded-xl flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{info.title}</h3>
                    <p className="text-sm text-gray-700">{info.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{info.sub}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form */}
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Оставить заявку</h2>
              <p className="text-gray-500 mb-6">
                Заполните форму, и мы свяжемся с вами в ближайшее время
              </p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500 mb-6">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="outline">
                    Отправить ещё
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите, куда вы хотите поехать, сколько человек, какие даты..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Произошла ошибка. Попробуйте ещё раз.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white h-12"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Map / Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-64 sm:h-80 bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-teal-500 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-900">Наш офис</h3>
                  <p className="text-gray-600">Москва, ул. Тверская, 12</p>
                  <p className="text-sm text-gray-400 mt-1">5 минут от м. Пушкинская</p>
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Частые вопросы</h3>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Как быстро вы отвечаете?',
                      a: 'Мы отвечаем в течение 2 часов в рабочее время. По выходным — до 4 часов.',
                    },
                    {
                      q: 'Можно забронировать тур онлайн?',
                      a: 'Да! Оставьте заявку, и мы оформим бронирование удалённо.',
                    },
                    {
                      q: 'Есть ли рассрочка?',
                      a: 'Да, мы предлагаем рассрочку до 12 месяцев без процентов.',
                    },
                  ].map((faq, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-medium text-gray-900">{faq.q}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
