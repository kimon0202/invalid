export const messages = {
  string: {
    type: 'This must be a string',
    min: (min: number): string =>
      `This must be at least ${min} characters long`,
    max: (max: number): string =>
      `This must be at least ${max} characters long`,
    regex: (regex: RegExp): string => `This must match the regex: ${regex}`,
    email: `This must be a valid email address`,
    uuid: `This must be a valid UUID`,
    url: `This must be a valid URL`,
  },

  number: {
    type: 'This must be a number',
    min: (min: number): string =>
      `This must be greater than or equal to ${min}`,
    max: (max: number): string => `This must be less than or equal to ${max}`,
    greater: (greater: number): string =>
      `This must be greater than ${greater}`,
    less: (less: number): string => `This must be less than ${less}`,
    positive: `This must be a positive number`,
    negative: `This must be a negative number`,
    integer: `This must be an integer`,
  },
};
