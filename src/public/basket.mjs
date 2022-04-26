import * as index from './index.mjs';


function createBasketInfoDiv(brickInfo) {
    // create divs
    const brickInfoDiv = document.createElement('div');
    brickInfoDiv.id = 'basketInfo';
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
    let brickPhoto = document.createElement("img");
    brickPhoto.id = 'brickPhoto';
    brickPhoto.style.backgroundColor = brickInfo.colour;
  
    // check if info exists then add content to spans
    brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
    brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
    brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
    brickInfo.desc ? brickDesc.textContent = brickInfo.desc : brickDesc.textContent = `no description`;
    brickInfo.price ? brickPrice.textContent = `$${brickInfo.price}` : brickPrice.textContent = 'unknown price';
    // add all spans to brickInfoDiv and return
    brickInfoDiv.append(brickID);
    brickInfoDiv.append(brickName);
    brickInfoDiv.append(brickColour);
    brickInfoDiv.append(brickPrice);
    brickInfoDiv.append(brickDesc);
    brickInfoDiv.append(brickPhoto);
    brickInfoDiv.append(index.createRemoveButton(brickInfo));
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

export function initiateBasket() {
    let basket = window.localStorage.getItem("basket");
    basket = JSON.parse(basket);
    for (let i = 0; i < basket.length; i++) {
        createBasketItem(basket[i]);
    }
}

/**
 * takes an object and adds it to the basket in localstorage
 * @param {obj} item 
 */
export function addBasket(item, amount) {
    let basket = window.localStorage.getItem("basket");
    basket == null ? basket = [] : basket = JSON.parse(basket);
    let contains = false;
  
    // if the array contains the item already, add one to the count and change 'contains' to true
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id == item.id && basket[i].type == item.type) {
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
 * @async
 * @param {obj} item 
 * @returns {number} count
 */
export function queryBasket(item) {
    let basket = window.localStorage.getItem("basket");
    basket == null ? basket = [] : basket = JSON.parse(basket);
    let count = 0;
    for(let i = 0; i < basket.length; i++) {
        basket[i].id == item.id && basket[i].type == item.type ? count = basket[i].count : null;
    }

    return(count);
}

/**
 * takes an object and removes it from the basket in localstorage
 * @param {obj} item 
 */
export function removeFromBasket(item) {
    let basket = window.localStorage.getItem("basket");
    basket == null ? basket = [] : basket = JSON.parse(basket);
    for (let i = 0; i < basket.length; i++) {
        if (parseInt(basket[i].id) == item.id && basket[i].type == item.type) {
            basket.splice(i,1);
            console.log(basket);
            console.log("item removed");
        }
    }
    basket = JSON.stringify(basket);
    window.localStorage.setItem("basket", basket);
}