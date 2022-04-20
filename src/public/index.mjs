import { fetchBrickInfo } from './requests.mjs';

async function createBrickInfoDiv(id, colour, price) {
  let brickInfo;
  id ? brickInfo = await fetchBrickInfo(id) : null;

  const brickInfoDiv = document.createElement('div');
  const brickID = document.createElement('div').textContent = await brickInfo.id;
  brickInfoDiv.append(await brickID);
  return await brickInfoDiv;
}

async function createBrickHolder(id, colour, price) {
  const brickHolder = document.createElement('div');
  const s = brickHolder.style;
  s.height = '20vw';
  s.width = '20vw';
  brickHolder.classList.add('Block');
  brickHolder.ID = '';

  id ? brickHolder.append(await createBrickInfoDiv(id)) : null;
  return brickHolder;
}

function createHolder() {
  const Holder = document.createElement('div');
  const s = Holder.style;
  s.position = '';
  s.height = '';
  s.width = '';
  s.top = '';
  s.left = '';
  Holder.classList.add('Holder');
  document.body.append(Holder);
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

// initiate home page
if (window.location.href === 'http://localhost:8080/index.html' || window.location.href === 'http://localhost:8080/') {
  createNavbar();
  createHolder();
}

// initiate sets page
if (window.location.href === 'http://localhost:8080/sets.html') {
  createNavbar();
  createHolder();
}

// initiate bricks page
if (window.location.href === 'http://localhost:8080/bricks.html') {
  createNavbar();
  createHolder();
  let i = 0;
  while (i<20) {
    document.querySelector(".Holder").append(await createBrickHolder( await fetchBrickInfo(i)));
    i++;
  }
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createNavbar();
  createHolder();
}
