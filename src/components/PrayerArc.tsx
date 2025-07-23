import { motion } from 'motion/react'

const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

const radius = 45
const centerX = 50
const centerY = 50

// Util to convert degrees to SVG path for arc
const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const angleRad = (angleDeg * Math.PI) / 180.0
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy - r * Math.sin(angleRad),
  }
}

const PrayerArc = ({ currentPrayer }: { currentPrayer: string }) => {
  const activeIndex = prayers.findIndex((p) => p === currentPrayer)

  const segments = prayers.map((_, i) => {
    const startAngle = 180 - i * 36
    const endAngle = 180 - (i + 1) * 36

    const start = polarToCartesian(centerX, centerY, radius, startAngle)
    const end = polarToCartesian(centerX, centerY, radius, endAngle)

    const d = [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`,
    ].join(' ')

    const isActive = i === activeIndex

    return (
      <motion.path
        key={i}
        d={d}
        fill="none"
        stroke={isActive ? '#fff' : 'rgba(255,255,255,0.3)'}
        strokeWidth={isActive ? 4 : 3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, scale: isActive ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        strokeLinecap="round"
      />
    )
  })

  return (
    <div className="w-full h-38">
      <svg viewBox="0 0 100 50" className="w-full h-full mt-6">
        {segments}
      </svg>
    </div>
  )
}

export default PrayerArc

