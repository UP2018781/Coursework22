import { fetchBrickInfo } from './requests.mjs';

/**
 * create a div with all the bricks info in
 * @async
 * @param {JSON} brickInfo 
 * @returns brick info div
 */
async function createBrickInfoDiv(brickInfo) {
  // create divs
  const brickInfoDiv = document.createElement('div');
  brickInfoDiv.id = 'brickInfo';
  let brickID = document.createElement('div');
  brickID.id = "brickID";
  let brickColour = document.createElement('div');
  brickColour.id = "brickColour";
  let brickPrice = document.createElement('div');
  brickPrice.id = "brickPrice";
  let brickName = document.createElement('div');
  brickName.id = "brickName";

  // check if info exists then add content to divs
  await brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
  await brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
  await brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
  // add all divs to brickInfoDiv and return
  brickInfoDiv.append(brickID);
  brickInfoDiv.append(brickName);
  brickInfoDiv.append(brickColour);
  brickInfoDiv.append(brickPrice);
  brickInfoDiv.append(await createBuyButton(brickInfo));
  return await brickInfoDiv;
}

/**
 * creates buy button
 * @param {obj} brickInfo 
 * @returns {HTMLElement} buyButton
 */
async function createBuyButton(brickInfo) {
  let buyButton = document.createElement('button');
  brickInfo.price ? buyButton.textContent = `$${brickInfo.price}` : buyButton.textContent = `$???`;
  buyButton.id = 'buyButton';

  buyButton.addEventListener('click', buyButtonClicked);
  return buyButton;
}

/**
 * adds current item to basket
 * @param {event} e 
 */
async function buyButtonClicked(e) {
  // get current item
  let currentID = "";
  const textID = e.target.parentElement.parentElement.querySelector('#brickID').textContent;
    // search text content of ID elem for the number
  for (const i in textID) {
    if (!isNaN(textID[i])) {
      currentID = currentID.concat(textID[i]);
    }
  }
  // set fetch ID to current ID
  const fetchBy = {
    id: parseInt(currentID),
  }
  // fetch item info from server (so we're sure the data is correct, and up to date, for example stock levels)
  const current = await fetchBrickInfo(fetchBy);
  // add to basket
  current.stockLevel > 0 ? console.log(current) : alert('out of stock!');
}

/**
 * creates and formats brick holder
 * @async
 * @param {JSON} brickInfo 
 * @returns entire brick holder Div
 */
async function createBrickHolder(brickInfo) {
  const brickHolder = document.createElement('div');
  const s = brickHolder.style;
  s.height = '20vw';
  s.width = '20vw';
  brickHolder.classList.add('Block');
  brickHolder.id = 'brickHolder';

  brickHolder.append(await createBrickInfoDiv(await brickInfo));
  return brickHolder;
}

function removeAllBrickHolders() {
  let test = true
  while (test) {
    const div = document.querySelector('#brickHolder');
    try {
      div.remove();
    } catch {
      test = false;
    }
  }
  console.log("clear page");
}
// can be better implemented when database is implemented
async function addBrickHolders(fetchBy, amount) {
  for (let i = 0; i < amount; i++) {
    document.querySelector(".Holder").append(await createBrickHolder( await fetchBrickInfo(fetchBy)));
  }
}

function createFilter() {
  const filter = document.createElement('select');
  filter.id = 'filter';

  const filterText = document.createElement('div');
  filterText.textContent = 'Filter: ';
  filterText.style.position = 'absolute';
  filterText.style.top = '7.5%';
  filterText.style.left = '5%';
  filterText.style.color = 'bisque';

  const idOption = document.createElement('option');
  idOption.value = 'ID';
  idOption.textContent = 'ID'

  const colourOption = document.createElement('option');
  colourOption.value = 'colour';
  colourOption.textContent = 'colour';

  filter.append(idOption);
  filter.append(colourOption);

  filter.addEventListener("change", async (e) => {
    removeAllBrickHolders();
    let i = 0;
    if (e.target.value == 'ID'){
      const fetchBy = {
        id: '1',
      }
      addBrickHolders(fetchBy, 10);
    }
    if (e.target.value == 'colour') {
      console.log("colour");
      const fetchBy = {
        colour: 'blue',
      }
      addBrickHolders(fetchBy, 10);
    }
  })

  filterText.append(filter);
  document.body.append(filterText);
}

function createHolder() {
  const Holder = document.createElement('div');
  const s = Holder.style;
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
    // const highlightMe = document.querySelector(`#${currentPage}`);
    // highlightMe.style.backgroundColor = 'green';
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
  createFilter();
  for (let i = 0; i < 20; i++) {
    const fetchBy = {
      id: i,
    }
    addBrickHolders(fetchBy, 1);
  }
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createNavbar();
  createHolder();
}
