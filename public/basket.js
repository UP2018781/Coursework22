const back = document.querySelector('#home');

function GetMainPage() {
  document.location.href = 'index.html';
}

back.addEventListener('click', () => {
  GetMainPage();
});
