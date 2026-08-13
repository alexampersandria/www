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

Estimate your heart rate zones based on your resting and maximum heart rates. These calculations are based on the [Karvonen method](https://en.wikipedia.org/wiki/Heart_rate#Karvonen_method), with adjustments based on [Seiler-Viken, S.A., Mentzoni, F., Seiler, S. et al. Contextualizing the Norwegian standardized intensity zone framework in an international sample of endurance practitioners.](https://rdcu.be/fy0MW).

### Resting Heart Rate

Resting heart rate is an essential factor in determining your heart rate zones, and often omitted from the calculation.

### Max Heart Rate

A lot of tools that help to estimate your heart rate zones use your age and estimate your maximum heart rate from that, but this is wildly inaccurate and you should instead perform a max heart rate test, you can do this yourself or see a personal trainer.

## Training based on heart rate zones

Your heart rate zones do not actually have a hard cutoff at a certain heart rate, but rather have more gradual transitions between zones, so being ± a few bpm for example does not neccesarily mean you aren't in your target zone, but you can still use these as a reference point.

The zones in this calculator are skewed slightly higher than most other calculators for this reason, and therefore not a true "Karvonen calculator", but hopefully more representative of your actual heart rate zones.

### Lactate Threshold (LT1 + LT2)

If you want **perfectly accurate** heart rate zones, you should perform a lactate threshold test to determine your LT1 and LT2 and derive your zones from there.

## Code explained

The zone boundaries and offsets are defined as the following:

```ts
const boundaries = [0, 0.5, 0.72, 0.8, 0.925, 1.0]
const offsets = [0, -1, 2, 1, 1, 0]
```

where the boundary is percentage of heart rate reserve, calculated as

```ts
const heartRateReserve = maxHeartRate - restingHeartRate

const zoneBoundary = (zone: number): number => {
  const percentage = boundaries[zone]
  const baseBoundary = restingHeartRate + heartRateReserve * percentage
  return Math.ceil(baseBoundary + offsets[zone])
}
```

This is different from the Karvonen method where the boundaries are evenly spaced from 50% to 100% of heart rate reserve. The goal with the offset is to push the boundaries slightly higher than what your actual zone boundary is so that if you drift 1 bpm off you are not counted as being out of zone.

---

The full source code can be found on [GitHub](https://github.com/alexampersandria/www/tree/main/src/lib/shared/utils/hr.ts).
