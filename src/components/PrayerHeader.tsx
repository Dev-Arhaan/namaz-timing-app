import { format } from 'date-fns'
import { prayerIcons } from '../constants/prayerData'

const PrayerHeader = ({ nextPrayer }: { nextPrayer: string }) => {
  const currentDay = format(new Date(), 'EEEE')

  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        {prayerIcons[nextPrayer]}
        <span className="text-lg font-semibold">{nextPrayer}</span>
      </div>
      <div className="rounded-full bg-white/30 px-2 py-1 text-xs font-semibold text-white">
        {currentDay}
      </div>
    </div>
  )
}

export default PrayerHeader
