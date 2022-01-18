const navbar = document.querySelector('.navbar');

function loadItemsPage(e) {
  console.log(e.classList);
  document.location.href = 'items.html';
}

navbar.addEventListener('click', e => {
  loadItemsPage(e);
});
