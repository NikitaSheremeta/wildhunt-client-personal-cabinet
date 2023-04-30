import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function disableAllScrollingKeepMenuScrolling() {
  const menu = document.querySelector('#menu');

  disableBodyScroll(menu);
}

export function enableAllScrollingKeepMenuScrolling() {
  const menu = document.querySelector('#menu');

  enableBodyScroll(menu);
}
