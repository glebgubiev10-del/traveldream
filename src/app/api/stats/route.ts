import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    destinations: 12,
    tours: 16,
    reviews: 10,
    avg_rating: 4.7,
  })
}
