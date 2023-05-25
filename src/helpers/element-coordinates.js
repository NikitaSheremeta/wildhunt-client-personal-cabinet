export function elementCoordinates(element) {
  const elementRect = element.getBoundingClientRect();

  const body = document.body;
  const documentElement = document.documentElement;

  const scrollTop = documentElement.scrollTop || body.scrollTop;
  const scrollLeft = documentElement.scrollLeft || body.scrollLeft;

  const clientTop = documentElement.clientTop || body.clientTop || 0;
  const clientLeft = documentElement.clientLeft || body.clientLeft || 0;

  const top = elementRect.top + scrollTop - clientTop;
  const left = elementRect.left + scrollLeft - clientLeft;
  const right = elementRect.right + scrollLeft - clientLeft;
  const bottom = elementRect.bottom + scrollTop - clientTop;

  return {
    top: Math.round(top),
    left: Math.round(left),
    right: Math.round(right),
    bottom: Math.round(bottom)
  };
}
