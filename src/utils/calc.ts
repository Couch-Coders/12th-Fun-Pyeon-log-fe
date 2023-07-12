export const calcDistance = (
  lat: number,
  lng: number,
  lat2: number,
  lng2: number
) => {
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat) // deg2rad below
  const dLon = deg2rad(lng2 - lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c * 1000 // Distance in m

  return Math.floor(d)
}
