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