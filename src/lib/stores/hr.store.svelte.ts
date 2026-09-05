import { calculateHeartRateZones, type HeartRateZones } from '$lib/shared/utils/hr'

export const themeList = ['paper', 'moon', 'lavender', 'forest', 'cornflower', 'campfire'] as const
export type Theme = (typeof themeList)[number]

export type HeartRateModel = {
  restingHeartRate?: number
  maxHeartRate?: number
  zones?: HeartRateZones

  clear: () => void
}

let restingHeartRate: number | undefined = $state(undefined)
let maxHeartRate: number | undefined = $state(undefined)

const zones = $derived.by(() => {
  if (restingHeartRate === undefined) return undefined
  if (maxHeartRate === undefined) return undefined
  if (restingHeartRate <= 0) return undefined
  if (maxHeartRate <= 0) return undefined
  if (restingHeartRate > maxHeartRate) return undefined
  return calculateHeartRateZones({ restingHeartRate, maxHeartRate })
})

const clear = () => {
  restingHeartRate = undefined
  maxHeartRate = undefined
}

export const useHeartRateStore: () => HeartRateModel = () => {
  return {
    get restingHeartRate() {
      return restingHeartRate
    },
    set restingHeartRate(value: number | undefined) {
      restingHeartRate = value
    },
    get maxHeartRate() {
      return maxHeartRate
    },
    set maxHeartRate(value: number | undefined) {
      maxHeartRate = value
    },
    get zones() {
      return zones
    },
    clear,
  }
}
