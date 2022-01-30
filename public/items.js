const back = document.querySelector('#back');

function getMainPage() {
  document.location.href = 'index.html';
}

back.addEventListener('click', () => {
  getMainPage();
});
