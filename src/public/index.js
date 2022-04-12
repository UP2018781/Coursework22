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
  listItem.classList.add = 'Block';
  listItem.id = ID;
  listItem.addEventListener('click', (e) => {
    window.location.href = `${e.target.id}.html`;
    const currentPage = `${e.target.id}`;
    const highlightMe = document.querySelector(`#${currentPage}`);
    highlightMe.style.backgroundColor = 'green';
  });
  return listItem;
}

function createNavbar() {
  // create navbar
  const navbar = document.createElement('nav');
  const s = navbar.style;
  s.position = 'absolute';
  s.left = '2.5%';
  s.width = '50%';
  s.height = '2.5%';
  s.display = 'flex';
  s.alignItems = 'center';
  s.fontSize = '1.5vh';
  s.color = 'bisque';
  navbar.classList.add('navbar');

  // create list elements
  const home = createLi('Home', 'index');
  const sets = createLi('Sets', 'sets');
  const bricks = createLi('Bricks', 'bricks');
  const basket = createLi('Basket', ' basket');

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

function create16BricksBlock(percent) {
  create4BricksHorizontal(`${percent}%`);
  create4BricksHorizontal(`${percent + 50}%`);
  create4BricksHorizontal(`${percent + 100}%`);
  create4BricksHorizontal(`${percent + 150}%`);
}

// initiate home page
if (window.location.href === 'http://localhost:8080/index.html' || window.location.href === 'http://localhost:8080/') {
  createNavbar();
}

// initiate sets page
if (window.location.href === 'http://localhost:8080/sets.html') {
  createNavbar();
}

// initiate bricks page
if (window.location.href === 'http://localhost:8080/bricks.html') {
  createNavbar();
  create16BricksBlock(20);
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createNavbar();
}
