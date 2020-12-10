export const errorMap = {
  string: {
    min: (value: number): string =>
      `String must have at least ${value} characters`,
    max: (value: number): string =>
      `String must have at most ${value} characters`,
  },
};
