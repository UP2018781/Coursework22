const back = document.querySelector('#home');
const basket = document.querySelector('#basket');

function GetMainPage() {
  document.location.href = 'index.html';
}

function LoadBasketPage() {
  document.location.href = 'basket.html';
}

back.addEventListener('click', () => {
  GetMainPage();
});

basket.addEventListener('click', () => {
  LoadBasketPage();
});
