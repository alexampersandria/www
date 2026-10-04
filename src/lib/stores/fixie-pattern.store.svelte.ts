export type FixiePatternReference = {
  pattern: number
  yours: number
  allowance: number
}

export type FixiePatternMeasurement = {
  id?: string
  value?: number
}

export type FixiePatternModel = {
  reference: FixiePatternReference
  measurements: FixiePatternMeasurement[]

  clear: () => void
  add: () => void
  remove: (id: string) => void

  scale?: number
  scaledMeasurements?: FixiePatternMeasurement[]

  error: string | undefined
}

let reference: FixiePatternModel['reference'] = $state({ pattern: 0, yours: 0, allowance: 0 })
let measurements: FixiePatternModel['measurements'] = $state([])

const scale: FixiePatternModel['scale'] = $derived.by(() => {
  if (reference.pattern <= 0) return
  return reference.yours / reference.pattern
})

const scaledMeasurements: FixiePatternModel['scaledMeasurements'] = $derived.by(() => {
  if (scale === undefined) return
  return measurements.map(m => {
    const value = m.value
    if (value === undefined) return { id: m.id, value: undefined }
    const withoutAllowance = value - reference.allowance
    const scaled = withoutAllowance * scale
    const scaledWithAllowance = scaled + reference.allowance
    return { id: m.id, value: scaledWithAllowance }
  })
})

const error: FixiePatternModel['error'] = $derived.by(() => {
  if (reference.pattern && reference.yours === undefined) return 'References required'
  if (reference.pattern === undefined) return 'Pattern reference is required'
  if (reference.yours === undefined) return 'Your reference is required'
  if (scale === undefined) return 'Invalid reference input'
  return
})

const clear = () => {
  reference = { pattern: 0, yours: 0, allowance: 0 }
  measurements = []
}

const add = () => {
  measurements.push({ id: undefined, value: undefined })
}

const remove = (index: number) => {
  measurements = measurements.filter((_, i) => i !== index)
}

export const useFixiePatternStore = () => {
  return {
    get reference() {
      return reference
    },
    set reference(value: FixiePatternReference) {
      reference = value
    },

    get measurements() {
      return measurements
    },
    set measurements(value: FixiePatternMeasurement[]) {
      measurements = value
    },

    clear,
    add,
    remove,

    get scale() {
      return scale
    },
    get scaledMeasurements() {
      return scaledMeasurements
    },

    get error() {
      return error
    },
  }
}
