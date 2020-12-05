import { Position } from '../types';

export const getPositions = (container: HTMLElement): Position[] => {
  const positions: Position[] = [];
  container.childNodes.forEach((item) => {
    if (item.nodeName.toLowerCase() === 'div') {
      const childNode = item as HTMLDivElement;
      const position = childNode.getBoundingClientRect();

      positions.push({
        left: position.left,
        top: position.top,
      });
    }
  });

  return positions;
};
