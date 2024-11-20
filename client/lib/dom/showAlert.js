import { isString } from '../utils/type.js';
import { addClass, removeClass } from './css.js';
import { getNode as $ } from './getNode.js';

export function showAlert(node, message = '오류가 발생했습니다.', timeout = 1000) {
  if (isString(node)) node = $(node);
  addClass(node, 'is-active');
  node.textContent = message;

  setTimeout(() => {
    removeClass(node, 'is-active');
  }, timeout);
}
