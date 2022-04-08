const navbar = document.querySelector('.navbar');

// changing the webpage that we are currently on "basket", "sets" etc
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

function createItemBox() {
  const newBox = document.createElement('div');
  newBox.classList.add('itemBox');
  return newBox;
}

document.body.append(createItemBox());
