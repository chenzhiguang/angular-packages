import { toggleClassName } from './toggle_class_name';

export const createFloat = (
  source: HTMLElement,
  className?: string
): HTMLElement => {
  const float = source.cloneNode(true) as HTMLElement;
  const size = source.getBoundingClientRect();

  float.setAttribute(
    'style',
    `position: absolute; width:${size.width}px; height: ${size.height}px; z-index:1010;`
  );

  if (className) {
    toggleClassName(float, className, true);
  }

  document.body.appendChild(float);

  return float;
};
