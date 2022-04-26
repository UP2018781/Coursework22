import * as index from './index.mjs';
import {fetchSetInfo, fetchManySets} from './requests.mjs';
import {removeFromBasket, addBasket, queryBasket} from './basket.mjs';

export async function initiateSets() {
    createSearch();
    attachSetHolders( await fetchManySets({all: true}));
}

/**
 * creates search bar for sets
 */
function createSearch() {
    const search = document.createElement('input');
    search.id = 'searchBar';
    search.classList.add('Block');
    search.type = 'text';
    search.placeholder = 'search';
    search.addEventListener('change', handleSearch)
  
    document.body.append(search);
}

/**
 * handle searching of sets
 * @param {Event} e 
 */
async function handleSearch(e) {
    removeAllSetHolders();
    // setup vars
    const arrayToPost = [];
    const searchValue = e.target.value;
    const setArray = await fetchManySets({all: true});
    // loop through all bricks and return only ones which match the criteria, appear in order of which criteria is most important, ID being highest.
    for (let i = 0; i < await setArray.length; i++) {
      if (setArray[i].SetID == searchValue) {
        arrayToPost.push(setArray[i]);
      } else if (setArray[i].Name == searchValue) {
        arrayToPost.push(setArray[i]);
      } else if (setArray[i].Price == searchValue) {
        arrayToPost.push(setArray[i]);
      } else if (setArray[i].Desc == searchValue) {
        arrayToPost.push(setArray[i]);
      } else {
        null;
      }
    }
    if (arrayToPost.length === 0) {
      attachSetHolders(setArray);
    } else {
      attachSetHolders(arrayToPost);
    }
}

/**
 * adds sets to the set holder
 * @param {Array} setArray [{}, {}...]
 * @param {Number} amount 
 */
async function attachSetHolders (setArray, amount) {

    const holder = document.body.querySelector('.Holder');

    if (amount > 0) {
        for (let i = 0; i < amount; i++) {
            holder.append( await createSetHolder(setArray[i]));
        }
    } else {
        for (let i = 0; i < setArray.length; i++) {
            holder.append( await createSetHolder(setArray[i]));
        }
    }
}

/**
 * create a set box
 * @param {obj} setInfo 
 */
async function createSetHolder (setInfo) {
    const setHolder = document.createElement('div');

    setHolder.style.height = '20vw';
    setHolder.style.width = '20vw';
    setHolder.classList.add('Block');
    setHolder.id = 'setHolder';

    // add information
    if (await setInfo.type == "set") {
        const setID = document.createElement("span");
        setID.id = 'setID';
        const setName = document.createElement("span");
        setName.id = 'setName';
        const setPrice = document.createElement("span");
        setPrice.id = 'setPrice';
        const setDesc = document.createElement("span");
        setDesc.id = 'setDesc';

        await setInfo.id ? setID.textContent = `Set ID: ${setInfo.id}` : setID.textContent = 'Set ID: Unknown';
        await setInfo.name ? setName.textContent = `${setInfo.name}` : setID.textContent = 'Unknown Set';
        await setInfo.price ? setPrice.textContent = `$${setInfo.price}` : setID.textContent = '$???';
        await setInfo.desc ? setDesc.textContent = `${setInfo.desc}` : setDesc.textContent = 'no description';
        

        setHolder.append(setID, setName, setPrice, setDesc);
        setHolder.append(await createBuyButton(setInfo));
        setHolder.append(index.createRemoveButton());
        return setHolder;
    }
}

/**
 * remove all set boxes
 */
function removeAllSetHolders() {
    const all = document.querySelectorAll('#setHolder');
    for (let i = 0; i< all.length; i++) {
        all[i].remove();
    }
}

/**
 * creates buy button
 * @param {obj} setInfo 
 * @returns {HTMLElement} buyButton
 */
async function createBuyButton(setInfo) {
    let buyButton = document.createElement('button');
    setInfo.price ? buyButton.textContent = `$${setInfo.price}` : buyButton.textContent = `$???`;
    buyButton.id = 'buyButton';

    buyButton.addEventListener('click', buyButtonClicked);
    return buyButton;
}

async function buyButtonClicked(e) {
    // get current item    
    let currentID = "";
    const textID = e.target.parentElement.querySelector('#setID').textContent;
    const currentRemove = e.target.parentElement.parentElement.querySelector("#basketAmount");
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
    const current = await fetchSetInfo(fetchBy);
    console.log(await current);

    // add to basket
    current.stockLevel > 0 ? addBasket(current) : alert('out of stock!');

    currentRemove.textContent = parseInt(currentRemove.textContent) + 1;

}

/**
 * takes the parent element of the parent element of the event and finds the item ID based off that (ew).
 * removes the item with that ID from the basket (localstorage). 
 * also updates number
 * @param {Event} e 
 */
export function removeButtonClickedSet(e) {
    // get current item
    let currentID = "";
    const textID = e.target.parentElement.parentElement.querySelector('#setID').textContent;
  
    // search text content of ID elem for the number
    for (const i in textID) {
      if (!isNaN(textID[i])) {
        currentID = currentID.concat(textID[i]);
      }
    }
    removeFromBasket({id: currentID});
    const text = e.target.parentElement.querySelector('#basketAmount');
    text.innerText = queryBasket({id:currentID});
  }