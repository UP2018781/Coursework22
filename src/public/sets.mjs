import {moreInfo, createRemoveButton, createBuyButton} from './index.mjs';
import {fetchSetInfo, fetchManySets} from './requests.mjs';
import {removeFromBasket, addBasket, queryBasket, colours} from './basket.mjs';

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
      } else if (setArray[i].description == searchValue) {
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
    setHolder.style.border = `dashed ${colours[Math.floor(Math.random()*colours.length)]}`;
  
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
      const setDescription = document.createElement("span");
      setDescription.id = 'setDescription';

      await setInfo.id ? setID.textContent = `Set ID: ${setInfo.id}` : setID.textContent = 'Set ID: Unknown';
      await setInfo.name ? setName.textContent = `${setInfo.name}` : setID.textContent = 'Unknown Set';
      await setInfo.price ? setPrice.textContent = `$${setInfo.price}` : setID.textContent = '$???';
      await setInfo.description ? setDescription.textContent = `${setInfo.description}` : setDescription.textContent = 'no description';
      

      setHolder.addEventListener("click", moreInfo);
      setHolder.append(setID, setName, setPrice, setDescription);
      setHolder.append(await createBuyButton(setInfo));
      setHolder.append(await createRemoveButton(setInfo));
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
 * takes the parent element of the parent element of the event and finds the item ID based off that (ew).
 * removes the item with that ID from the basket (localstorage). 
 * also updates number
 * @param {Event} e 
 */
export async function removeButtonClickedSet(e) {
    // get current item
    let currentID = "";
    const block = e.target.parentElement.parentElement;
    let textID;
    try{
      textID = block.querySelector('#setID').textContent;
    } catch {
      textID = block.querySelector('#basketID').textContent;
      block.remove();
    }
    // s
    // search text content of ID elem for the number
    for (const i in textID) {
      if (!isNaN(textID[i])) {
        currentID = currentID.concat(textID[i]);
      }
    }
    const currentItem = await fetchSetInfo({id: currentID});
    removeFromBasket(await currentItem);
    const text = e.target.parentElement.querySelector('#basketAmount');
    text.innerText = queryBasket(await currentItem);
}