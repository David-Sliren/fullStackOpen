export const ErrorNever = (data: never): never => {
  throw new Error(`the Property not include ${data}`);
};
