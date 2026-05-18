'use client'

import { useNavigation } from '@/store/navigation'
import { Header } from '@/components/travel/Header'
import { Footer } from '@/components/travel/Footer'
import { HomePage } from '@/components/travel/HomePage'
import { DestinationsPage } from '@/components/travel/DestinationsPage'
import { ToursPage } from '@/components/travel/ToursPage'
import { AboutPage } from '@/components/travel/AboutPage'
import { ContactPage } from '@/components/travel/ContactPage'

const pages = {
  home: HomePage,
  destinations: DestinationsPage,
  tours: ToursPage,
  about: AboutPage,
  contact: ContactPage,
}

export default function Home() {
  const { currentPage } = useNavigation()
  const PageComponent = pages[currentPage]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageComponent />
      </main>
      <Footer />
    </div>
  )
}
