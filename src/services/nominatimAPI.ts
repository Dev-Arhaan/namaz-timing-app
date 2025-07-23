import axios from 'axios'

export const getCityAndCountry = async (lat: number, lon: number) => {
  const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
    params: {
      lat,
      lon,
      format: 'json',
    },
  })

  const address = res.data.address
  const city = address.city || address.town || address.village || 'Unknown'
  const country = address.country || 'Unknown'

  return { city, country }
}
export const getCoordinates = async (city: string, country: string) => {
  const res = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: `${city}, ${country}`,
      format: 'json',
      addressdetails: 1,
      limit: 1,
    },
  })

  if (res.data.length === 0) {
    throw new Error('Location not found')
  }

  const { lat, lon } = res.data[0]
  return { lat: parseFloat(lat), lon: parseFloat(lon) }
}