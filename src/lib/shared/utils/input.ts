export type InputState = 'untouched' | 'touched' | 'invalid'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url'

export type ValidationFunction = (value: string, inputstate?: InputState) => InputState

export type ValidationRule = ValidationFunction | RegExp

export const evaluateInputState = (args: {
  value: string
  inputstate: InputState
  validation?: ValidationRule
  required?: boolean
}): InputState => {
  if (args.validation) {
    if (typeof args.validation === 'function') {
      return args.validation(args.value, args.inputstate)
    } else {
      if (!args.value) {
        if (args.required) {
          return 'invalid'
        } else {
          if (args.inputstate === 'untouched') {
            return 'untouched'
          } else {
            return 'touched'
          }
        }
      } else {
        return args.validation.test(args.value) ? 'touched' : 'invalid'
      }
    }
  } else {
    if (!args.value) {
      if (args.required) {
        return 'invalid'
      } else {
        return args.inputstate
      }
    } else {
      return 'touched'
    }
  }
}
