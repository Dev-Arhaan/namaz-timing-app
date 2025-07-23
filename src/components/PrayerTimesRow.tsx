import { prayerIcons } from '../constants/prayerData'
import { to12HourFormat } from '../utils/time'

type Props = {
  prayerTimes: Record<string, string>
  nextPrayer: string
}

const PrayerTimesRow = ({ prayerTimes, nextPrayer }: Props) => {
  return (
    <div className="flex justify-between text-xs font-medium text-white/90">
      {Object.entries(prayerTimes).map(([prayer, time]) => (
        <div
          key={prayer}
          className={`flex flex-col items-center ${
            prayer === nextPrayer ? 'font-bold text-white' : 'text-white/70'
          }`}
        >
          {prayerIcons[prayer]}
          <span>{prayer}</span>
          <span>{to12HourFormat(time)}</span>
        </div>
      ))}
    </div>
  )
}

export default PrayerTimesRow
