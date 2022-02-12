import { LoadMainPage } from './pageSwap.js';
const back = document.querySelector('#home');

back.addEventListener('click', () => {
  LoadMainPage();
});
