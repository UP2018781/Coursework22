import { fetchBrickInfo, fetchManyBricks, fetchSetInfo } from './requests.mjs';
import {removeFromBasket, addBasket, queryBasket, initiateBasket} from './basket.mjs';
import {initiateSets, removeButtonClickedSet} from './sets.mjs';

function createLogo() {
  const logo = document.createElement("img");
  logo.src = './img/logo.gif';
  logo.id = 'logo';
  document.body.append(logo);
}

/**
 * creates a remove button that removes the current item from the basket (localstorage)
 * should be appended to the BrickInfoDiv
 * @param {obj} item 
 * @return {HTMLElement} button
 */
export async function createRemoveButton(item) {
  const binIcon = document.createElement("img");
  binIcon.src = './img/bin.png';
  binIcon.id = 'binButton';
  const basketAmount = document.createElement("div");
  basketAmount.textContent = await queryBasket(item);
  basketAmount.id = 'basketAmount';
  const rButton = document.createElement("div");
  rButton.id = "remove";
  rButton.append(basketAmount);

  if (item.type == 'brick'){
    binIcon.addEventListener("click", removeButtonClickedBrick);
    rButton.prepend(binIcon);
  }
  if (item.type == 'set') {
    binIcon.addEventListener("click", removeButtonClickedSet);
    rButton.prepend(binIcon);
  }

  return rButton;
}

/**
 * takes the parent element of the parent element of the event and finds the item ID based off that (ew).
 * removes the item with that ID from the basket (localstorage). 
 * also updates number
 * @param {Event} e 
 */
async function removeButtonClickedBrick(e) {
  // get current item
  let currentID = "";
  let textID
  const block = e.target.parentElement.parentElement;
  try {
    textID = block.querySelector('#brickID').textContent;
  } catch {
    textID = block.querySelector('#basketID').textContent;
    block.remove();
  }
  // search text content of ID elem for the number
  for (const i in textID) {
    if (!isNaN(textID[i])) {
      currentID = currentID.concat(textID[i]);
    }
  }
  const currentItem = await fetchBrickInfo({id: parseInt(currentID)});
  removeFromBasket(await currentItem);
  const text = e.target.parentElement.querySelector('#basketAmount');
  text.innerText = queryBasket(await currentItem);
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
  const block = e.target.parentElement;
  const textID = block.querySelector('#brickID').textContent;
  const currentRemove = block.querySelector("#basketAmount");
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
  current.stockLevel > 0 ? addBasket(current) : alert('out of stock!');

  currentRemove.textContent = parseInt(currentRemove.textContent) + 1;

}

/**
 * creates and formats brick holder
 * @async
 * @param {JSON} brickInfo 
 * @returns entire brick holder div
 */
async function createBrickHolder(brickInfo) {
  const brickHolder = document.createElement('div');
  const s = brickHolder.style;
  //if the colour of the brick is allowd, change the background colour to be the same as the brick :)
  s.border = `solid ${brickInfo.colour}`
  brickHolder.classList.add('Block');
  brickHolder.id = 'brickHolder';
  
  let brickID = document.createElement('span');
  brickID.id = "brickID";
  let brickColour = document.createElement('span');
  brickColour.id = "brickColour";
  let brickPrice = document.createElement('span');
  brickPrice.id = "brickPrice";
  let brickName = document.createElement('span');
  brickName.id = "brickName";
  let brickDesc = document.createElement("span");
  brickDesc.id = "brickDesc";

  // check if info exists then add content to spans
  await brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
  await brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
  await brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
  await brickInfo.desc ? brickDesc.textContent = brickInfo.desc : brickDesc.textContent = `no description`;

  brickHolder.addEventListener("click", moreInfo);

  brickHolder.append(brickID);
  brickHolder.append(brickName);
  brickHolder.append(brickColour);
  brickHolder.append(brickPrice);
  brickHolder.append(brickDesc);
  brickHolder.append(await createBuyButton(brickInfo));
  brickHolder.append(await createRemoveButton(brickInfo));

  return brickHolder;
}

export function moreInfo(e) {
  if (e.target.id == 'brickHolder' || e.target.id == 'setHolder'){
    e.target.style.width = '66vh';
    e.target.style.height = '66vh';
    e.target.removeEventListener("click", moreInfo);
    e.target.addEventListener("click", lessInfo);
  }
}
export function lessInfo(e) {
  e.target.style.width = '33vh';
  e.target.style.height = '33vh';
  e.target.removeEventListener("click", lessInfo);
  e.target.addEventListener("click", moreInfo);
}

/**
 * removes all bricks on the page
 */
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
}
// can be better implemented when database is implemented
/**
 * 
 * @param {obj} fetchBy 
 * @param {number} amount blank for as many as in the array 
 */
async function addBrickHolders(brickArray, amount) {
  if (amount) {
    for (let i = 0; i < amount || i < brickArray.length ; i++) {
      document.querySelector(".Holder").append(await createBrickHolder( await brickArray[i]));
    }
  } else {
    for (let i = 0; i < brickArray.length; i++) {
      document.querySelector('.Holder').append(await createBrickHolder( await brickArray[i]));
    }
  }
}

/**
 * uses the search bar to search through all the bricks available
 * @param {event} e 
 */
async function handleSearch(e) {
  removeAllBrickHolders();
  // setup vars
  const arrayToPost = [];
  const searchValue = e.target.value;
  const brickArray = await fetchManyBricks({all: true});
  // loop through all bricks and return only ones which match the criteria, appear in order of which criteria is most important, ID being highest.
  for (let i = 0; i < await brickArray.length; i++) {
    if (brickArray[i].id == searchValue) {
      arrayToPost.push(brickArray[i]);
    } else if (brickArray[i].colour == searchValue) {
      arrayToPost.push(brickArray[i]);
    } else if (brickArray[i].name == searchValue) {
      arrayToPost.push(brickArray[i]);
    } else if (brickArray[i].price == searchValue) {
      arrayToPost.push(brickArray[i]);
    } else if (brickArray[i].desc == searchValue) {
      arrayToPost.push(brickArray[i]);
    } else {
      null;
    }
  }
  if (arrayToPost.length === 0) {
    addBrickHolders(brickArray);
  } else {
    addBrickHolders(arrayToPost);
  }
}

/**
 * creates the search bar
 */
function createSearch() {
  const search = document.createElement('input');
  const searchText = document.createElement("div");
  search.id = 'searchBar';
  search.classList.add('Block');
  search.type = 'text';
  search.placeholder = 'search';
  searchText.id = 'searchBar';
  search.addEventListener('change', handleSearch)

  searchText.append(search);
  document.body.append(searchText);
}

/**
 * creates a holder for flex displaying bricks
 */
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
    // const currentPage = `${e.target.id}`;
    // const highlightMe = document.querySelector(`#${currentPage}`);
    // highlightMe.style.backgroundColor = 'green';
  });
  return listItem;
}

function createNavbar() {
  // create navbar
  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');

  // create list elements
  const home = createLi('Home', 'index');
  const sets = createLi('Sets', 'sets');
  const bricks = createLi('Bricks', 'bricks');
  const basket = createLi('Basket', 'basket');

  navbar.append(home);
  navbar.append(sets);
  navbar.append(bricks);
  navbar.append(basket);

  document.body.append(navbar);
}

// initiate home page
if (window.location.href == 'http://localhost:8080/index.html' || window.location.href === 'http://localhost:8080/') {
  createLogo();
  createNavbar();
  createHolder();
}

// initiate sets page
if (window.location.href === 'http://localhost:8080/sets.html') {
  createLogo();
  createNavbar();
  createHolder();
  initiateSets();
}

// initiate bricks page
if (window.location.href === 'http://localhost:8080/bricks.html') {
  createLogo();
  createNavbar();
  createHolder();
  // createFilter();
  createSearch();
  const fetchBy = {
    all: true,
  }
  const brickArray = await fetchManyBricks(fetchBy);
  addBrickHolders(brickArray);
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createLogo();
  createNavbar();
  createHolder();
  initiateBasket();
}