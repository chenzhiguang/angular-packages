const isClicked = (container: HTMLElement, target: HTMLElement): boolean => {
  if (container === target) {
    return true;
  }

  const children = container.childNodes;
  if (!children || children.length === 0) {
    return false;
  }

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (child.nodeType !== 1) {
      continue;
    }

    if (child === target || isClicked(child, target)) {
      return true;
    }
  }

  return false;
};

export const findChild = (
  parent: HTMLElement,
  target: HTMLElement
): void | { index: number; element: HTMLElement } => {
  let index = 0;

  for (let i = 0; i < parent.childNodes.length; i++) {
    const child = parent.children[i];
    if (child && child.nodeType === 1) {
      const element = child as HTMLElement;
      if (isClicked(element, target)) {
        return { index, element };
      }
      index++;
    }
  }

  return;
};
