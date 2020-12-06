export const toggleClassName = (
  element: HTMLElement,
  className: string,
  add: boolean
): void => {
  const names = element.className
    .split(' ')
    .filter((name) => name !== className);

  if (add) {
    names.push(className);
  }
  element.className = names.join(' ');
};
