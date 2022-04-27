import { createBuyButton, createRemoveButton, moreInfo } from "./index.mjs";

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
    let brickDescription = document.createElement("span");
    brickDescription.id = "brickDescription";
  
    // check if info exists then add content to spans
    await brickInfo.id ? brickID.textContent = `ID: ${brickInfo.id}` : brickID.textContent = 'ID not found';
    await brickInfo.colour ? brickColour.textContent = `colour: ${brickInfo.colour}` : brickColour.textContent = 'colour not found';
    await brickInfo.name ? brickName.textContent = brickInfo.name :  brickName.textContent = 'unknown brick';
    await brickInfo.description ? brickDescription.textContent = brickInfo.description : brickDescription.textContent = `no Description`;
  
    brickHolder.addEventListener("click", moreInfo);
  
    brickHolder.append(brickID);
    brickHolder.append(brickName);
    brickHolder.append(brickColour);
    brickHolder.append(brickPrice);
    brickHolder.append(brickDescription);
    brickHolder.append(await createBuyButton(brickInfo));
    brickHolder.append(await createRemoveButton(brickInfo));
  
    return brickHolder;
}
/**
 * 
 * @param {obj} fetchBy 
 * @param {number} amount blank for as many as in the array 
 */
export async function addBrickHolders(brickArray, amount) {
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