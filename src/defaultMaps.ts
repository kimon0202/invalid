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
};
