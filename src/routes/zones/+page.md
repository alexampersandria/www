---
title: 'Heart Rate Zones'
date: '2026-08-08'
---

<script lang="ts">
import HeartRateZoneCalculator from '$lib/components/tools/HeartRateZoneCalculator.svelte'
</script>

# Heart Rate Zones

## Calculator

You need to know your resting and maximum heart rates to establish your heart rate zones.

<HeartRateZoneCalculator />

---

## Method

Estimate your heart rate zones based on your resting and maximum heart rates. These calculations are based on the [Karvonen method](https://en.wikipedia.org/wiki/Heart_rate#Karvonen_method), blended with the Norwegian intensity-zone boundaries described in [Seiler-Viken, S.A., Mentzoni, F., Seiler, S. et al. Contextualizing the Norwegian standardized intensity zone framework in an international sample of endurance practitioners.](https://rdcu.be/fy0MW), then adjusted slightly for practical use.

## Training based on heart rate zones

Your heart rate zones do not actually have a hard cutoff at a certain heart rate, but rather have more gradual transitions between zones, so being ± a few bpm for example does not neccesarily mean you aren't in your target zone, but you can still use these as a reference point.

The zones in this calculator are not a pure Karvonen implementation. They use blended boundaries and small BPM offsets to make zone transitions less jittery when your heart rate drifts by small amounts.

### Lactate Threshold (LT1 + LT2)

If you want **perfectly accurate** heart rate zones, you should perform a lactate threshold test to determine your LT1 and LT2 and derive your zones from there.

## Implementation

This is different from pure Karvonen zones (50/60/70/80/90/100% of heart rate reserve). Here, the boundaries are blended toward the Norwegian model and then nudged with small offsets to reduce over-sensitive zone switching at boundary edges.

### Boundary definition

The boundaries are determined as a blend of the Karvonen method and the Norwegian intensity-zone boundaries

```ts
const karvonen = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
const norwegian = [0.55, 0.72, 0.82, 0.87, 0.92, 1.0]
const blended = karvonen.map((karvonenZone, index) => {
  const norwegianZone = norwegian[index]
  return (karvonenZone + norwegianZone) / 2
})
```

Which gives us the blended zone boundaries as

```ts
;[0.525, 0.6599999999999999, 0.76, 0.835, 0.91, 1]
```

The blended values are then adjusted slightly, generally skewed towards the Karvonen model, with 1 bpm offsets at either end of zone 2 and 4.

The final zones end up looking like

- Zone 1: up to 56.5% HRR - 1 bpm
- Zone 2: up to 75% HRR + 1 bpm
- Zone 3: up to 82.5% HRR - 1 bpm
- Zone 4: up to 92% HRR + 1 bpm
- Zone 5: up to max heart rate

### Code

The zone boundaries and offsets are then defined as the following:

```ts
const boundaries = [0, 0.565, 0.75, 0.825, 0.92, 1]
const offsets = [0, -1, 1, -1, 1, 0]
```

Where the boundary is percentage of heart rate reserve, calculated as

```ts
const heartRateReserve = maxHeartRate - restingHeartRate

const zoneBoundary = (zone: number): number => {
  const percentage = boundaries[zone]
  const baseBoundary = restingHeartRate + heartRateReserve * percentage
  return Math.ceil(baseBoundary + offsets[zone])
}
```

---

The full source code can be found on [GitHub](https://github.com/alexampersandria/www/tree/main/src/lib/shared/utils/hr.ts).
