const navbar = document.querySelector('.navbar');

navbar.addEventListener('click', (e) => {
  if (e.target.id !== 'index' && e.target.id !== 'sets' && e.target.id !== 'bricks' && e.target.id !== 'basket') {
    window.location.hash = 'contact';
  } else {
    window.location.href = `${e.target.id}.html`;
    const currentPage = `${e.target.id}`;
    const highlightMe = document.querySelector(`#${currentPage}`);
    highlightMe.style.backgroundColor = 'green';
  }
});
