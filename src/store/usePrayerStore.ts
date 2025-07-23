import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { differenceInSeconds, format } from 'date-fns'

type Location = {
  city: string
  country: string
}

type PrayerTimes = {
  Fajr: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

type PrayerStore = {
  currentLocation: Location
  prayerTimes: PrayerTimes
  nextPrayer: keyof PrayerTimes | null
  timeToNextPrayer: string
  loading: boolean
  error: string | null

  setLocation: (location: Location) => void
  setPrayerTimes: (prayers: PrayerTimes) => void
  updateNextPrayer: () => void
  setLoading: (value: boolean) => void
  setError: (msg: string | null) => void
}

export const usePrayerStore = create<PrayerStore>()(
  persist(
    (set, get) => ({
      currentLocation: { city: '', country: '' },
      prayerTimes: {
        Fajr: '',
        Dhuhr: '',
        Asr: '',
        Maghrib: '',
        Isha: '',
      },
      nextPrayer: null,
      timeToNextPrayer: '',
      loading: false,
      error: null,

      setLocation: (location) => set({ currentLocation: location }),
      setPrayerTimes: (prayers) => {
        set({ prayerTimes: prayers })
        get().updateNextPrayer()
      },
      setLoading: (value) => set({ loading: value }),
      setError: (msg) => set({ error: msg }),

      updateNextPrayer: () => {
        const now = new Date()
        const prayers = get().prayerTimes
        const entries = Object.entries(prayers)

        let next: string | null = null
        let minDiff = Infinity
        let timeToNext = ''

        for (const [name, time] of entries) {
          try {
            const fullTime = new Date(`${format(now, 'yyyy-MM-dd')} ${time}`)
            const diff = differenceInSeconds(fullTime, now)

            if (diff > 0 && diff < minDiff) {
              minDiff = diff
              next = name
              const hours = Math.floor(diff / 3600)
              const minutes = Math.floor((diff % 3600) / 60)
            //   const seconds = diff % 60
              timeToNext = `${String(hours)}h ${String(minutes).padStart(2, '0')}m`
            }
          } catch (e) {
            continue
          }
        }

        if (next) {
          set({ nextPrayer: next as keyof PrayerTimes, timeToNextPrayer: timeToNext })
        } else {
          set({ nextPrayer: null, timeToNextPrayer: '' })
        }
      },
    }),
    {
      name: 'prayer-store',
    }
  )
)
