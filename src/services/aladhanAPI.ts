import axios from 'axios'

export const getPrayerTimes = async (lat: number, lon: number, timezone?: string) => {
  const today = new Date()
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

  const res = await axios.get(`https://api.aladhan.com/v1/timings/${dateStr}`, {
    params: {
      latitude: lat,
      longitude: lon,
      method: 2,
      timezonestring: timezone,
    },
  })

  const data = res.data.data.timings

  return {
    Fajr: data.Fajr,
    Dhuhr: data.Dhuhr,
    Asr: data.Asr,
    Maghrib: data.Maghrib,
    Isha: data.Isha,
  }
}
