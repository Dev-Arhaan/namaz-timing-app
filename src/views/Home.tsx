import { useEffect } from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import { getCityAndCountry } from '../services/nominatimAPI'
import { getPrayerTimes } from '../services/aladhanAPI'
import { usePrayerStore } from '../store/usePrayerStore'
import Header from '../components/Header'
import PrayerCard from '../components/PrayerCard'

const Home = () => {
  const coords = useGeolocation()
  const {
    setLocation,
    setPrayerTimes,
    updateNextPrayer,
    // currentLocation,
    prayerTimes,
    nextPrayer,
    timeToNextPrayer,
    setLoading,
    setError,
  } = usePrayerStore()

  useEffect(() => {
    const fetchData = async () => {
      if (!coords || coords.error) return

      try {
        setLoading(true)
        const { city, country } = await getCityAndCountry(coords.lat, coords.lon)
        setLocation({ city, country })

        const timings = await getPrayerTimes(coords.lat, coords.lon, Intl.DateTimeFormat().resolvedOptions().timeZone)
        setPrayerTimes(timings)
        updateNextPrayer()
        setError(null)
      } catch (err) {
        setError('Something went wrong while fetching prayer data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [coords?.lat, coords?.lon])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="p-4">
        <PrayerCard
          nextPrayer={nextPrayer || 'Fajr'}
          timeToNextPrayer={timeToNextPrayer}
          prayerTimes={prayerTimes}
        />
      </main>
    </div>
  )
}

export default Home
