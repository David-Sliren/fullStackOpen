export const alwaysError = (a: never) => {
  throw new Error(`failed not can't defined ${a} in never`);
};
