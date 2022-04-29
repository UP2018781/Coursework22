import { fetchAuthConfig, fetchBrickInfo, fetchManyBricks, fetchSetInfo } from './requests.mjs';
import {removeFromBasket, addBasket, queryBasket, initiateBasket} from './basket.mjs';
import {initiateSets, removeButtonClickedSet} from './sets.mjs';
import { addBrickHolders } from './bricks.mjs';
import { initiateHome } from './home.mjs';

let auth0 = null;

/**
 * creates home page logo
 * click to go to home
 */
function createLogo() {
  const logo = document.createElement("img");
  logo.src = './img/logo.gif';
  logo.id = 'logo';
  logo.addEventListener("click", (e) => {
    window.location.href = '/';
  })
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
  const currentItem = await fetchBrickInfo(parseInt(currentID));
  removeFromBasket(await currentItem);
  const text = e.target.parentElement.querySelector('#basketAmount');
  text.innerText = queryBasket(await currentItem);
}
/**
 * creates buy button
 * @param {obj} brickInfo 
 * @returns {HTMLElement} buyButton
 */
export async function createBuyButton(brickInfo) {
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
  let textID;
  let current;
  if (block.id == 'brickHolder'){
    textID = block.querySelector('#brickID').textContent;
  } else if (block.id == 'setHolder') {
    textID = block.querySelector('#setID').textContent;
  }
  const currentRemove = block.querySelector("#basketAmount");
    // search text content of ID elem for the number
  for (const i in textID) {
    if (!isNaN(textID[i])) {
      currentID = currentID.concat(textID[i]);
    }
  }

  // fetch item info from server (so we're sure the data is correct, and up to date, for example stock levels)
  block.id == 'brickHolder' ? current = await fetchBrickInfo(currentID) : null;
  block.id == 'setHolder' ? current = await fetchSetInfo(currentID) : null;
  // add to basket
  console.log(current);
  await current.stocklevel > 0 ? addBasket(await current) : alert('out of stock!');

  currentRemove.textContent = parseInt(currentRemove.textContent) + 1;
}

/**
 * expands brickHolders
 * @param {event} e 
 */
export function moreInfo(e) {
  if (e.target.id == 'brickHolder' || e.target.id == 'setHolder'){
    // grab all "expanded"
    const exp = document.querySelectorAll(".expanded");
    // if the clicked block is expanded
    if (e.target.classList.contains("expanded")){
      // remove all expanded
      for (let elem of exp) {
        console.log(elem);
        elem.classList.remove("expanded");
      }
    } else {
      // remove all expanded, and add to current block
      for (let elem of exp) {
        console.log(elem);
        elem.classList.remove("expanded");
      }
      e.target.classList.add("expanded");
    }
  }
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
 * creates a holder for flex displaying items
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
  initiateHome();
  createLoginLogout();
}

// initiate sets page
if (window.location.href === 'http://localhost:8080/sets.html') {
  createLogo();
  createNavbar();
  createHolder();
  initiateSets();
  createLoginLogout();
}

// initiate bricks page
if (window.location.href === 'http://localhost:8080/bricks.html') {
  createLogo();
  createNavbar();
  createHolder();
  createSearch();
  createLoginLogout();
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
  createLoginLogout();
}

// auth0 retired functions which i couldnt get to work
// they were going to be called on page load
async function initClient() {
  const config = await fetchAuthConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientID,
  });
}

async function handleLogin() {
  // console.log(await auth0);
  // await auth0.logInWithRedirect({
  //   redirect_uri: window.location.origin,
  // })
  window.location.href = './admin.html';
}

async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();
  console.log(await isAuthenticated);
}

async function createLoginLogout() {
  const loginBtn = document.createElement("button");
  const logoutBtn = document.createElement("button");
  loginBtn.id = 'login';
  loginBtn.textContent = 'log in';
  loginBtn.addEventListener("click", handleLogin);
  logoutBtn.id = 'logout';
  logoutBtn.textContent = 'log out';
  document.body.append(loginBtn, logoutBtn);
}