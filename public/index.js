import { LoadItemsPage } from './pageSwap.js';
import { LoadBasketPage } from './pageSwap.js';

const bricks = document.querySelector('#bricks');
const basket = document.querySelector('#basket');

bricks.addEventListener('click', () => {
  LoadItemsPage();
});

basket.addEventListener('click', () => {
  LoadBasketPage();
});
