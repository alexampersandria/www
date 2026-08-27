export type HeartRateZone = {
  zone: number
  min: number
  max: number
}

export type HeartRateZones = [
  /** recovery */
  HeartRateZone,
  /** endurance */
  HeartRateZone,
  /** tempo */
  HeartRateZone,
  /** threshold */
  HeartRateZone,
  /** vo2 max */
  HeartRateZone,
]

export type HeartRateCalculationOptions = {
  restingHeartRate: number
  maxHeartRate: number
}

// zones based on adjusted blended zones between Karvonen and Norweigan zones
// with offsets to make it "easier" to stay in zone 2 or 4, this is done because
// your bike computer will tell you you are in zone 3 if you drift by 1 bpm
// but that is not big enough of a difference to warrant a zone change imo
//
// const PURE_KARVONEN_ZONE_BOUNDARIES = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0] as const
// const PURE_NORWEIGAN_ZONE_BOUNDARIES = [0.55, 0.72, 0.82, 0.87, 0.92, 1.0] as const
// const BLENDED_ZONE_BOUNDARIES = PURE_KARVONEN_ZONE_BOUNDARIES.map((karvonenZone, index) => {
//   const norweiganZone = PURE_NORWEIGAN_ZONE_BOUNDARIES[index]
//   return (karvonenZone + norweiganZone) / 2
// })
// would give [0.525, 0.6599999999999999, 0.76, 0.835, 0.91, 1]
//
// first version based on vibes no math is below for refence
// const HEART_RATE_ZONE_BOUNDARIES = [0, 0.5, 0.72, 0.8, 0.925, 1.0] as const
//
// final version is a slightly adjusted version of the blended zone boundaries

const HEART_RATE_ZONE_BOUNDARIES = [0, 0.6, 0.75, 0.825, 0.92, 1] as const
const HEART_RATE_ZONE_OFFSETS = [0, -1, 1, -1, 0, 0]

export const calculateHeartRateZones = (options: HeartRateCalculationOptions): HeartRateZones => {
  const { restingHeartRate, maxHeartRate } = options

  if (restingHeartRate > maxHeartRate) throw new Error('restingHeartRate must be less than or equal to maxHeartRate')

  const heartRateReserve = maxHeartRate - restingHeartRate

  const zoneBoundary = (zone: number): number => {
    const percentage = HEART_RATE_ZONE_BOUNDARIES[zone]
    const offset = HEART_RATE_ZONE_OFFSETS[zone]
    return Math.ceil(restingHeartRate + heartRateReserve * percentage + offset)
  }

  return [
    {
      zone: 1,
      min: zoneBoundary(0),
      max: zoneBoundary(1),
    },
    {
      zone: 2,
      min: zoneBoundary(1),
      max: zoneBoundary(2),
    },
    {
      zone: 3,
      min: zoneBoundary(2),
      max: zoneBoundary(3),
    },
    {
      zone: 4,
      min: zoneBoundary(3),
      max: zoneBoundary(4),
    },
    {
      zone: 5,
      min: zoneBoundary(4),
      max: zoneBoundary(5),
    },
  ]
}
