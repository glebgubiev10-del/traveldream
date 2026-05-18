import { create } from 'zustand'

export type Page = 'home' | 'destinations' | 'tours' | 'about' | 'contact'

interface NavigationState {
  currentPage: Page
  navigate: (page: Page) => void
}

export const useNavigation = create<NavigationState>((set) => ({
  currentPage: 'home',
  navigate: (page) => {
    set({ currentPage: page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
}))
