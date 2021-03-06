export const defaultMessages = {
  string: {
    type: 'This must be a string',
    min: (min: number): string =>
      `This must be at least ${min} characters long`,
    max: (max: number): string => `This must be at most ${max} characters long`,
    matches: (regex: RegExp): string =>
      `This does not match the regex: ${regex}`,
    url: 'This must be a valid URL',
    uuid: 'This must be a valid UUID',
    email: 'This must be a valid email address',
  },
  number: {
    type: 'This must be a number',
    min: (min: number): string => `This must be greater or equal than ${min}`,
    max: (max: number): string => `This must be less or equal than ${max}`,
    lessThan: (less: number): string => `This must be less than ${less}`,
    greaterThan: (greater: number): string =>
      `This must be greater than ${greater}`,
    positive: 'This must be a positive number',
    negative: 'This must be a negative number',
    integer: 'This must be an integer',
  },
  boolean: {
    type: 'This must be a boolean',
  },
  object: {
    type: 'This must be an object',
  },
  array: {
    type: `This must be an array`,
    min: (min: number): string => `This must be at least ${min} items long`,
    max: (max: number): string => `This must be at most ${max} items long`,
    length: (value: number): string => `This array's length must be ${value}`,
    // includes
    // notIncludes
  },
  mixed: {
    required: 'This is required',
    notRquiredNull: 'Null is not an accepted value',
  },
};
