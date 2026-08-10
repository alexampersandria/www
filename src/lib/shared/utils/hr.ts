export type HeartRateZone = {
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

const HEART_RATE_ZONE_BOUNDARIES = [0.5, 0.6, 0.72, 0.82, 0.95]
const HEART_RATE_ZONE_OFFSETS = [0, 1, 1, 1, 0]

export const calculateHeartRateZones = (options: HeartRateCalculationOptions): HeartRateZones => {
  const { restingHeartRate, maxHeartRate } = options

  if (restingHeartRate > maxHeartRate) throw new Error('restingHeartRate must be less than or equal to maxHeartRate')

  const calculateMin = (zone: number): number => {
    const min = Math.ceil((maxHeartRate - restingHeartRate) * HEART_RATE_ZONE_BOUNDARIES[zone] + restingHeartRate)
    if (isNaN(min)) return options.maxHeartRate
    return min + HEART_RATE_ZONE_OFFSETS[zone]
  }

  const zones = []

  for (let i = 0; i < HEART_RATE_ZONE_BOUNDARIES.length; i++) {
    const min = calculateMin(i)
    const max = calculateMin(i + 1)
    zones.push({ min, max })
  }

  return zones as HeartRateZones
}
