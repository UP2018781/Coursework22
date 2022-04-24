import { fetchBrickInfo, fetchManyBricks } from './requests.mjs';
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
  let brickDesc = document.createElement("div");
  brickDesc.id = "brickDesc";

  // check if info exists then add content to divs
  await brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
  await brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
  await brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
  await brickInfo.desc ? brickDesc.textContent = brickInfo.desc : brickDesc.textContent = `no description`;

  // add all divs to brickInfoDiv and return
  brickInfoDiv.append(brickID);
  brickInfoDiv.append(brickName);
  brickInfoDiv.append(brickColour);
  brickInfoDiv.append(brickPrice);
  brickInfoDiv.append(brickDesc);
  brickInfoDiv.append(await createBuyButton(brickInfo));
  await brickInfoDiv.append(createRemoveButton(brickInfo));
  return await brickInfoDiv;
}
/**
 * takes an object and adds it to the basket in localstorage
 * @param {obj} item 
 */
function addBasket(item, amount) {
  let basket = window.localStorage.getItem("basket");
  basket == null ? basket = [] : basket = JSON.parse(basket);
  let contains = false;

  // if the array contains the item already, add one to the count and change 'contains' to true
  for (let i = 0; i < basket.length; i++) {
    if (basket[i].id == item.id) {
      contains = true;
      amount == undefined ? basket[i].count = basket[i].count + 1 : basket[i].count = basket[i].count + amount;
    }
  }

  // if the array doesnt contain the item, push the item
  amount == undefined ? item.count = 1 : item.count = parseInt(amount);
  contains == false ? basket.push(item) : null;
  
  // write back to localstorage
  basket = JSON.stringify(basket);
  window.localStorage.setItem("basket", basket);
}

/**
 * takes an object and searches the basket for how many of that item there are
 * @param {obj} item 
 * @returns {number} count
 */
function queryBasket(item) {
  let basket = window.localStorage.getItem("basket");
  basket == null ? basket = [] : basket = JSON.parse(basket);
  let count = 0;

  for(let i = 0; i < basket.length; i++) {
    basket[i].id == item.id ? count = basket[i].count : null;
  }

  return(count);
}

/**
 * takes an object and removes it from the basket in localstorage
 * @param {obj} item 
 */
function removeFromBasket(item) {
  let basket = window.localStorage.getItem("basket");
  basket == null ? basket = [] : basket = JSON.parse(basket);
  
  for (let i = 0; i < basket.length; i++) {
    if (parseInt(basket[i].id) == item.id) {
      basket.splice(i,1);
      console.log(basket);
      console.log("item removed");
    }
  }
  basket = JSON.stringify(basket);
  window.localStorage.setItem("basket", basket);
}

/**
 * creates a remove button that removes the current item from the basket (localstorage)
 * should be appended to the BrickInfoDiv
 * @param {obj} item 
 * @return {HTMLElement} button
 */
function createRemoveButton(item) {
  const rButton = document.createElement("button");
  rButton.id = "removeButton";
  rButton.textContent = queryBasket(item);

  rButton.addEventListener("click", removeButtonClicked);
  return rButton;
}

/**
 * takes the parent element of the parent element of the event and finds the item ID based off that (ew).
 * removes the item with that ID from the basket (localstorage). 
 * also updates number
 * @param {Event} e 
 */
function removeButtonClicked(e) {
  // get current item
  let currentID = "";
  const textID = e.target.parentElement.parentElement.querySelector('#brickID').textContent;
    // search text content of ID elem for the number
  for (const i in textID) {
    if (!isNaN(textID[i])) {
      currentID = currentID.concat(textID[i]);
    }
  }
  removeFromBasket({id: currentID});
  e.target.textContent = queryBasket({id:currentID});
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
  const currentRemove = e.target.parentElement.parentElement.querySelector("#removeButton");
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

function createFilter() {
  const filter = document.createElement('select');
  filter.id = 'filter';
  filter.classList.add('Block');

  const filterText = document.createElement('div');
  filterText.textContent = 'Filter: ';
  filterText.style.position = 'absolute';
  filterText.style.top = '7.5%';
  filterText.style.left = '5%';
  filterText.style.color = 'bisque';

  const idOption = document.createElement('option');
  idOption.value = 'all';
  idOption.textContent = 'all'

  const colourOption = document.createElement('option');
  colourOption.value = 'colour';
  colourOption.textContent = 'colour';

  filter.append(idOption);
  filter.append(colourOption);

  filter.addEventListener("change", async (e) => {
    removeAllBrickHolders();
    if (e.target.value == 'all'){
      await addBrickHolders(await fetchManyBricks({ all: true}));
    }
    if (e.target.value == 'colour') {
      await addBrickHolders(await fetchManyBricks({ colour: 'blue'}));
    }
  })

  filterText.append(filter);
  document.body.append(filterText);
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

  searchText.style.position = 'absolute';
  searchText.style.top = '7.5%';
  searchText.style.left = '30%';
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

function createBasketInfoDiv(brickInfo) {
  // create divs
  const brickInfoDiv = document.createElement('div');
  brickInfoDiv.id = 'basketInfo';
  let brickID = document.createElement('div');
  brickID.id = "brickID";
  let brickColour = document.createElement('div');
  brickColour.id = "brickColour";
  let brickPrice = document.createElement('div');
  brickPrice.id = "brickPrice";
  let brickName = document.createElement('div');
  brickName.id = "brickName";
  let brickDesc = document.createElement("div");
  brickDesc.id = "brickDesc";
  let brickCount = document.createElement("div");
  brickCount.id = 'brickCount'
  let brickPhoto = document.createElement("img");
  brickPhoto.id = 'brickPhoto';
  brickPhoto.style.backgroundColor = brickInfo.colour;

  // check if info exists then add content to divs
  brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
  brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
  brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
  brickInfo.desc ? brickDesc.textContent = brickInfo.desc : brickDesc.textContent = `no description`;
  brickInfo.count ? brickCount.textContent = brickInfo.count : brickCount.textContent = '1';
  brickInfo.price ? brickPrice.textContent = `$${brickInfo.price}` : brickPrice.textContent = 'unknown price';
  // add all divs to brickInfoDiv and return
  brickInfoDiv.append(brickID);
  brickInfoDiv.append(brickName);
  brickInfoDiv.append(brickColour);
  brickInfoDiv.append(brickPrice);
  brickInfoDiv.append(brickDesc);
  brickInfoDiv.append(brickCount);  
  brickInfoDiv.append(brickPhoto);
  brickInfoDiv.append(createRemoveButton(brickInfo));
  return brickInfoDiv;
}

function createBasketItem(brickInfo) {
  const basketItemHolder = document.createElement("div");
  basketItemHolder.append( createBasketInfoDiv(brickInfo) );
  basketItemHolder.classList.add("BasketBlock");
  basketItemHolder.style.height = "25vh";
  basketItemHolder.style.width = "90vw";
  const s = basketItemHolder.style;
  const holder = document.querySelector(".Holder");
  holder.append(basketItemHolder);

}

function initiateBasket() {
  let basket = window.localStorage.getItem("basket");
  basket = JSON.parse(basket);
  for (let i = 0; i < basket.length; i++) {
    createBasketItem(basket[i]);
  }
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
  createSearch();
  const fetchBy = {
    all: true,
  }
  const brickArray = await fetchManyBricks(fetchBy);
  addBrickHolders(brickArray);
}

// initiate basket page
if (window.location.href === 'http://localhost:8080/basket.html') {
  createNavbar();
  createHolder();
  initiateBasket();
}
