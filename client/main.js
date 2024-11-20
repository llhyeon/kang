import data from './data/data.js';
import { addClass, getNode as $, clearContents, insertLast, getRandom, removeClass, showAlert, isNumber, isNumericString, shake } from './lib/index.js';

const submit = $('#submit');
const input = $('#nameField');
const result = $('.result');

function handleSubmit(e) {
  e.preventDefault();
  const name = input.value;

  if (!name || name.replaceAll(' ', '') === '') {
    showAlert('.alert-error', '공백은 허용되지 않습니다.', 1200);
    shake(input);
    return;
  }

  if (!isNumericString(name)) {
    showAlert('.alert-error', '정확한 이름을 입력해주세요', 1200);
    shake(input);
    return;
  }
  const list = data(name);

  const randomIndex = getRandom(list.length);

  const jujeob = list[randomIndex];
  clearContents(result);
  insertLast(result, jujeob);
}

// function handleCopy() {
//   const text = this.textContent;
//   console.log(text);
// }

submit.addEventListener('click', handleSubmit);
// result.addEventListener('click', handleCopy);
