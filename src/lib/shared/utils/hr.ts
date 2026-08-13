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

const HEART_RATE_ZONE_BOUNDARIES = [0, 0.5, 0.72, 0.8, 0.925, 1.0] as const
const HEART_RATE_ZONE_OFFSETS = [0, -1, 2, 1, 1, 0]

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
