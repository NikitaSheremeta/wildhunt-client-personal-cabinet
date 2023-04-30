// left: 37, up: 38, right: 39, down: 40, space bar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(event) {
  event.preventDefault();
}

function preventDefaultForScrollKeys(event) {
  if (keys[event.keyCode]) {
    preventDefault(event);

    return false;
  }
}

let supportsPassive = false;

try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: () => {
        supportsPassive = true;
      }
    })
  );
} catch (error) {
  console.log('[Event listener passive]: ' + error.message);
}

const wheelOption = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

export function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOption); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOption); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

export function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOption);
  window.removeEventListener('touchmove', preventDefault, wheelOption);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
