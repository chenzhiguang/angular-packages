import { Position } from '../types';

export const findIndex = (
  pointer: { left: number; top: number },
  positions: Position[]
): number => {
  const firstPosition = positions[0];
  let index = 0;

  //console.log(pointer, positions);
  positions.forEach((item, i) => {
    const left = pointer.left;
    const top = pointer.top;
    if (
      (left > item.left && top > item.top) ||
      (left > item.left &&
        top < firstPosition.top &&
        firstPosition.top == item.top) ||
      (top > item.top &&
        left < firstPosition.left &&
        firstPosition.left == item.left)
    ) {
      index = i;
    }
  });
  return index;
};
