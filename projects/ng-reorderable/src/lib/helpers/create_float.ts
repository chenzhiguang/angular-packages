export const createFloat = (
  source: HTMLDivElement,
  className?: string
): HTMLDivElement => {
  const clone = source.cloneNode(true) as HTMLDivElement;
  const size = source.getBoundingClientRect();
  const float = document.createElement('div');

  float.setAttribute(
    'style',
    `position: absolute; width:${size.width}px; height: ${size.height}px; z-index:1010`
  );

  if (className) {
    float.className = className;
  }

  float.appendChild(clone);
  document.body.appendChild(float);

  return float;
};
