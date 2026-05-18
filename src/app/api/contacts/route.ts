import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Заполните обязательные поля' },
        { status: 400 }
      )
    }

    // In production, this would save to database and send notifications
    console.log('New contact request:', { name, email, phone, message })

    return NextResponse.json({
      success: true,
      message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки' },
      { status: 500 }
    )
  }
}
