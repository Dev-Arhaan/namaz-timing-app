import { CloudMoonIcon, SunIcon, CloudSunIcon, SunHorizonIcon, MoonStarsIcon } from '@phosphor-icons/react'
import type { JSX } from 'react'

export const prayerIcons: Record<string, JSX.Element> = {
  Fajr: <CloudMoonIcon size={24} weight="bold" />,
  Dhuhr: <SunIcon size={24} weight="bold" />,
  Asr: <CloudSunIcon size={24} weight="bold" />,
  Maghrib: <SunHorizonIcon size={24} weight="bold" />,
  Isha: <MoonStarsIcon size={24} weight="bold" />,
}

export const prayerGradients: Record<string, string> = {
  Fajr: 'from-[#3F7CE6] to-[#D6BDFF]',
  Dhuhr: 'from-[#E9801F] to-[#FEDF8E]',
  Asr: 'from-[#117765] to-[#C1EEAF]',
  Maghrib: 'from-[#FF9453] to-[#FF88A6]',
  Isha: 'from-[#381079] to-[#811DEC]',
}

