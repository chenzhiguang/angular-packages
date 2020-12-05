/* eslint-disable @typescript-eslint/no-explicit-any */

export const moveItemInArray = <T = any>(
  array: T[],
  fromIndex: number,
  toIndex: number
): void => {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
};
