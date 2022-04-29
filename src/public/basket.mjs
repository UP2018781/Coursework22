import * as index from './index.mjs';
import { updateStock } from './requests.mjs';
export const colours = ["#FC97AC", "#D60026", "#4C61DB", "#237841", "#F2CD37", "#FE8A18"]

/**
 * retired function
 */
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
  
/**
 * 
 * @param {obj} item 
 */
async function createBasketItem(item) {
    const basketItemHolder = document.createElement("div");
    //make the colour correct
    item.colour ? basketItemHolder.style.border = `solid ${item.colour}` : basketItemHolder.style.border = `dashed ${colours[Math.floor(Math.random()*colours.length)]}`;
    // do this no matter what
    const name = document.createElement("span");
    const price = document.createElement("span");
    const desc = document.createElement("span");
    const ID = document.createElement("span");
    const type = document.createElement("span");

    name.id = 'basketName';
    price.id = 'basketPrice';
    desc.id = 'basketDesc';
    ID.id = 'basketID';
    type.id = 'basketType';
    type.style.backgroundColor = basketItemHolder.style.borderColor;

    item.name ? name.textContent = `${item.name}` : name.textContent = 'unknown name';
    item.price ? price.textContent = `$${item.price}` : price.textContent = '$???';
    item.desc ? desc.textContent = `${item.desc}` : desc.textContent = 'desc not found';
    item.id ? ID.textContent = `ID: ${item.id}` : ID.textContent = 'ID: unknown';
    item.type ? type.textContent = `${item.type}` : type.textContent = 'not found';

    // if item is a brick
    if (item.type == 'brick') {
        const colour = document.createElement("span");

        colour.id = 'basketColour';

        item.colour ? colour.textContent = `${item.colour}` : colour.textContent = 'Unknown colour';

        basketItemHolder.append(colour);
    }

    basketItemHolder.append(name, price, desc, ID, type);
    basketItemHolder.append(await index.createRemoveButton(item));

    basketItemHolder.classList.add("BasketBlock");
    const s = basketItemHolder.style;
    const holder = document.querySelector(".Holder");
    holder.append(basketItemHolder);

}

/**
 * function to create a basket page
 */
export async function initiateBasket() {
    let basket = window.localStorage.getItem("basket");
    basket == null ? basket = [] : basket = JSON.parse(basket);
    for (let i = 0; i < basket.length; i++) {
        console.log(basket[i]);
        await createBasketItem(basket[i]);
    }
    completeButton();
    createTotalCost();
}

/**
 * add the complete payment button (directly to the document)
 */
function completeButton() {
    const complete = document.createElement('button');
    complete.id = 'completeButton';

    complete.textContent = 'complete purchase';
    complete.addEventListener('click', completePurchase);
    document.body.append(complete);
}

/**
 * update stock from website & process payment
 */
async function completePurchase() {
    window.location.href = './payment.html';
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

async function handlePayment() {
    let basket = window.localStorage.basket;
    let totalCost = 0;
    basket == null ? basket = []: basket = JSON.parse(basket);
    for(let i = 0; i < basket.length; i++) {
        totalCost = totalCost + (basket[i].count * basket[i].price);
    }
    const confButton = document.createElement("button");
    confButton.textContent = "click to confirm you have paid";
    confButton.style.height = "10vw"
    confButton.style.width = "30vw";
    confButton.style.position = "absolute";
    confButton.addEventListener("click", (e) => {
        window.localStorage.setItem("costTaken", totalCost);
        for (let i in basket) {
            updateStock(basket[i].id, basket[i].type, basket[i].count);
        }
        window.localStorage.removeItem("basket");
        window.location.href = './';
    })
    document.body.append(confButton);
}

function createTotalCost() {
    let basket = window.localStorage.basket;
    let totalCost = 0;
    basket == null ? basket = []: basket = JSON.parse(basket);
    for(let i = 0; i < basket.length; i++) {
        totalCost = totalCost + (basket[i].count * basket[i].price)
    }
    const totalCostDisplay = document.createElement("span");
    totalCostDisplay.id = 'totalCost';
    totalCostDisplay.textContent =`$${totalCost}`;
    document.body.append(totalCostDisplay);
}

if (window.location.href == 'http://localhost:8080/payment.html') {
    handlePayment();
}