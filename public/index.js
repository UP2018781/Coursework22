const bricks = document.querySelector('#bricks');
const basket = document.querySelector('#basket');

function LoadItemsPage() {
  document.location.href = 'items.html';
}

function LoadBasketPage() {
  document.location.href = 'basket.html';
}

bricks.addEventListener('click', () => {
  LoadItemsPage();
});

basket.addEventListener('click', () => {
  LoadBasketPage();
});
