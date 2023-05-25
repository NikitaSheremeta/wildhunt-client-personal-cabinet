import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function disableAllScrollingKeepMenuScrolling() {
  const menu = document.querySelector('#side-menu');

  disableBodyScroll(menu);
}

export function enableAllScrollingKeepMenuScrolling() {
  const menu = document.querySelector('#side-menu');

  enableBodyScroll(menu);
}
