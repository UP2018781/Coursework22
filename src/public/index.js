function createBrickHolder(top, left) {
  const brickHolder = document.createElement('div');
  const s = brickHolder.style;
  s.position = 'absolute';
  s.height = '20vw';
  s.width = '20vw';
  s.top = top;
  s.left = left;
  brickHolder.textContent = 'Bricks';
  brickHolder.classList.add('Block');
  brickHolder.ID = '';
  return brickHolder;
}

function createLi(name, ID) {
  const listItem = document.createElement('li');
  listItem.textContent = name;
  listItem.id = ID;
  return listItem;
}

function createNavbar() {
  // create navbar
  const navbar = document.createElement('nav');
  const s = navbar.style;
  s.position = 'absolute';
  s.width = '50%';
  s.display = 'flex';
  s.alignItems = 'center';
  s.fontSize = '1.5vh';
  s.color = 'bisque';
  navbar.classList.add('navbar');

  // create list elements
  const home = createLi('home', 'index');
  const sets = createLi('sets', 'sets');
  const bricks = createLi('bricks', 'bricks');
  const basket = createLi('basket', ' basket');

  navbar.addEventListener('click', (e) => {
    window.location.href = `${e.target.id}.html`;
    const currentPage = `${e.target.id}`;
    const highlightMe = document.querySelector(`#${currentPage}`);
    highlightMe.style.backgroundColor = 'green';
  });

  navbar.append(home);
  navbar.append(sets);
  navbar.append(bricks);
  navbar.append(basket);

  document.body.append(navbar);
}

function create4BricksHorizontal(top) {
  for (let i = 0; i < 4; i++) {
    document.body.append(createBrickHolder(top, `${(i * 25) + 2.5}%`));
  }
}

function create16BricksBlock() {
  create4BricksHorizontal('20%');
  create4BricksHorizontal('70%');
  create4BricksHorizontal('120%');
  create4BricksHorizontal('170%');
}

// initiate home page
if (window.location.href === 'http://localhost:8080/index.html') {
  createNavbar();
}

// initiate sets page
if (window.location.href === 'http://localhost:8080/sets.html') {
  createNavbar();
}

// initiate bricks page
if (window.location.href === 'http://localhost:8080/bricks.html') {
  createNavbar();
  create16BricksBlock();
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createNavbar();
}
