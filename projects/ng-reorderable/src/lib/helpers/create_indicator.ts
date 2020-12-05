export const createIndicator = (source: HTMLDivElement): HTMLDivElement => {
  const clone = source.cloneNode(true) as HTMLDivElement;
  const size = source.getBoundingClientRect();
  clone.setAttribute(
    'style',
    `position: absolute; width:${size.width}px; height: ${size.height}px;`
  );
  document.body.appendChild(clone);

  return clone;
};
