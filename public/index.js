const navbar = document.querySelector('.navbar');

function LoadItemsPage() {
  document.location.href = 'items.html';
}

navbar.addEventListener('click', () => {
  LoadItemsPage();
});
