const navbar = document.querySelector('.navbar');

function loadItemsPage() {
  document.location.href = 'items.html';
}

navbar.addEventListener('click', () => {
  loadItemsPage();
});
