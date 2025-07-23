import { CloudMoonIcon, SunIcon, CloudSunIcon, SunHorizonIcon, MoonStarsIcon } from '@phosphor-icons/react'
import { format } from 'date-fns'
import type { JSX } from 'react'
import PrayerArc from './PrayerArc'
import { to12HourFormat } from '../utils/time'

const prayerIcons: Record<string, JSX.Element> = {
  Fajr: <CloudMoonIcon size={24} weight="bold" />,
  Dhuhr: <SunIcon size={24} weight="bold" />,
  Asr: <CloudSunIcon size={24} weight="bold" />,
  Maghrib: <SunHorizonIcon size={24} weight="bold" />,
  Isha: <MoonStarsIcon size={24} weight="bold" />,
}

const prayerGradients: Record<string, string> = {
  Fajr: 'from-[#3F7CE6] to-[#D6BDFF]',
  Dhuhr: 'from-[#E9801F] to-[#FEDF8E]',
  Asr: 'from-[#117765] to-[#C1EEAF]',
  Maghrib: 'from-[#FF9453] to-[#FF88A6]',
  Isha: 'from-[#381079] to-[#811DEC]',
}

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
  const currentDay = format(new Date(), 'EEEE')

  return (
    <div
      className={`w-full rounded-xl text-white p-4 bg-gradient-to-b ${gradient}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          {prayerIcons[nextPrayer]}
          <span className="text-lg font-semibold">{nextPrayer}</span>
        </div>
        <div className='rounded-full bg-white/30 px-2 py-1 text-xs font-semibold text-white'>
            <span>{currentDay}</span>
        </div>
      </div>

      <div className='mb-5'>
        <span className="text-sm font-semibold">Next prayer in {timeToNextPrayer}</span>
      </div>

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
      <div className='space-y-4'>
        <PrayerArc currentPrayer={nextPrayer} />
      </div>
    </div>
  )
}

export default PrayerCard
