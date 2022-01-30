const back = document.querySelector('#back');

function GetMainPage() {
  document.location.href = 'index.html';
}

back.addEventListener('click', () => {
  GetMainPage();
});
