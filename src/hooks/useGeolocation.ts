import { useEffect, useState } from 'react'

type Coords = {
  lat: number
  lon: number
  error: string | null
}

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Coords | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setCoords({ lat: 0, lon: 0, error: 'Geolocation not supported' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: null,
        })
      },
      (err) => {
        setCoords({ lat: 0, lon: 0, error: err.message || 'Permission denied' })
      }
    )
  }, [])

  return coords
}
