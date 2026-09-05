<script lang="ts">
import type { InputState, InputType, ValidationRule } from '$lib/shared/utils/input'

import { evaluateInputState } from '$lib/shared/utils/input'

let {
  type = 'text',
  value = $bindable(),
  placeholder,
  disabled,
  inputstate = $bindable('untouched'),
  fullwidth,
  live,
  validation,
  name,
  id,
  required,
  onchange: emitOnChange,
  oninput: emitOnInput,
  onenter: emitOnEnter,
  'aria-label': ariaLabel,
}: {
  type?: InputType
  value?: string | number | boolean
  placeholder?: string
  fullwidth?: boolean
  live?: boolean
  validation?: ValidationRule
  disabled?: boolean
  inputstate?: InputState
  name?: string
  required?: boolean
  id?: string
  'aria-label'?: string
  onchange?: (event: Event) => void
  oninput?: (event: Event) => void
  onenter?: (event: KeyboardEvent) => void
} = $props()

const onchange = (event: Event, fromLive = false) => {
  const target = event.target as HTMLSelectElement
  value = target.value

  inputstate = evaluateInputState({
    value,
    inputstate,
    validation,
    required,
  })

  if (type === 'number') value = Number(value)

  if (emitOnChange && !fromLive) emitOnChange(event)
}

const oninput = (event: Event) => {
  if (live) onchange(event, true)
  if (emitOnInput) emitOnInput(event)
}

const onkeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    // force update value before emitting
    onchange(event)

    if (emitOnEnter) {
      // set timeout to let value update propagate before emitting
      setTimeout(() => {
        emitOnEnter(event)
      })
    }
  }
}
</script>

<input
  class="input"
  {type}
  {value}
  {placeholder}
  {disabled}
  {name}
  {id}
  {required}
  aria-label={ariaLabel}
  class:fullwidth
  class:invalid={inputstate === 'invalid'}
  aria-invalid={inputstate === 'invalid'}
  inputmode={type === 'number' ? 'numeric' : 'text'}
  {onkeydown}
  {onchange}
  {oninput} />

<style lang="scss">
.input {
  padding: var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--color-background-secondary);
  color: var(--color-foreground);
  border: none;

  /* Chromium & Safari */
  &[type='number']::-webkit-inner-spin-button {
    display: none;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &.fullwidth {
    width: 100%;
  }

  &:not(:disabled) {
    &:hover {
      background-color: var(--color-background-secondary);
    }

    &:focus {
      background-color: var(--color-background-secondary);
      color: var(--color-foreground);

      &::selection {
        color: var(--color-background-secondary);
        background-color: var(--color-foreground-muted);
      }
    }
  }

  &:disabled {
    color: var(--color-foreground-muted);
    background-color: var(--color-background-secondary);
  }
}
</style>
