import PrayerHeader from './PrayerHeader'
import PrayerTimesRow from './PrayerTimesRow'
import PrayerArc from './PrayerArc'
import { prayerGradients } from '../constants/prayerData'

const PrayerCard = ({
  nextPrayer = 'Fajr',
  timeToNextPrayer = '01:23:45',
  prayerTimes = {
    Fajr: '04:30 AM',
    Dhuhr: '12:15 PM',
    Asr: '03:45 PM',
    Maghrib: '06:55 PM',
    Isha: '08:20 PM',
  },
}: {
  nextPrayer: string
  timeToNextPrayer: string
  prayerTimes: Record<string, string>
}) => {
  const gradient = prayerGradients[nextPrayer] || 'from-gray-200 to-gray-100'

  return (
    <div className={`w-full rounded-xl text-white p-4 bg-gradient-to-b ${gradient}`}>
      <PrayerHeader nextPrayer={nextPrayer} />
      <div className="mb-5">
        <span className="text-sm font-semibold">Next prayer in {timeToNextPrayer}</span>
      </div>
      <PrayerTimesRow prayerTimes={prayerTimes} nextPrayer={nextPrayer} />
      <div className="space-y-4">
        <PrayerArc currentPrayer={nextPrayer} />
      </div>
    </div>
  )
}

export default PrayerCard
