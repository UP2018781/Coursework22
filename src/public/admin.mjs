// THIS FILE WILL BE HIDDEN BEHIND AN API CALL THAT WILL NEED PROPER AUTHORIZATION
import {fetchManyBricks, fetchManySets, updateStock} from './requests.mjs';

async function createTable() {
    const brickTable = document.createElement("div");
    brickTable.id = 'brickTable';
    const brickArray = await fetchManyBricks({all: true});
    const brickIdHead = document.createElement('span');
    const brickNameHead = document.createElement('span');
    const brickColourHead = document.createElement('span');
    const brickPriceHead = document.createElement('span');
    const brickStockHead = document.createElement('span');
    brickIdHead.textContent = 'BRICK ID';
    brickNameHead.textContent = 'NAME';
    brickColourHead.textContent = 'COLOUR';
    brickPriceHead.textContent = 'PRICE';
    brickStockHead.textContent = 'STOCKAMOUNT';
    brickTable.append(brickIdHead, brickNameHead, brickColourHead, brickPriceHead, brickStockHead);

    for (let i in brickArray) {
        const brickInfo = brickArray[i];
        console.log(brickInfo.stocklevel)
        let brickID = document.createElement('input');
        brickID.id = "brickID";
        brickID.placeholder = brickInfo.id;
        brickID.style.gridColumn = 'col1';
        brickID.classList.add(i);

        let brickName = document.createElement('input');
        brickName.id = "brickName";
        brickName.placeholder = brickInfo.name;
        brickName.style.gridColumn = 'col2';
        brickName.classList.add(i);

        let brickColour = document.createElement('input');
        brickColour.id = "brickColour";
        brickColour.placeholder = brickInfo.colour;
        brickColour.style.gridColumn = 'col3';
        brickColour.classList.add(i);

        let brickPrice = document.createElement('input');
        brickPrice.id = "brickPrice";
        brickPrice.placeholder = brickInfo.price;
        brickPrice.style.gridColumn = 'col4';
        brickPrice.classList.add(i);
        
        let brickStock = document.createElement('input');
        brickStock.id = "brickStock";
        brickStock.placeholder = brickInfo.stocklevel;
        brickStock.style.gridColumn = 'col5';
        brickStock.classList.add(i);

        brickTable.appendChild(brickID);
        brickTable.appendChild(brickName);
        brickTable.appendChild(brickColour);
        brickTable.appendChild(brickPrice);
        brickTable.appendChild(brickStock);
    }

    const setTable = document.createElement("div");
    setTable.id = 'setTable';
    setTable.style.gridTemplateRows = '[title] 3vh';
    const setArray = await fetchManySets({all: true});
    const setIdHead = document.createElement('span');
    const setNameHead = document.createElement('span');
    const setPriceHead = document.createElement('span');
    const setStockHead = document.createElement('span');
    setIdHead.textContent = 'set ID';
    setNameHead.textContent = 'NAME';
    setPriceHead.textContent = 'PRICE';
    setStockHead.textContent = 'STOCKAMOUNT';
    setTable.append(setIdHead, setNameHead, setPriceHead, setStockHead);

    for (let i in setArray) {
        const setInfo = setArray[i];
        setTable.style.gridTemplateRows = setTable.style.gridTemplateRows + `[row${i}] 3vh`;
        let setID = document.createElement("input");
        setID.id = 'setID';
        setID.placeholder = setInfo.id;
        setID.style.gridColumn = 'col1';
        setID.style.gridRow = `row${i}`;
        setID.classList.add(i);

        let setName = document.createElement('input');
        setName.id = "setName";
        setName.placeholder = setInfo.name;
        setName.style.gridColumn = 'col2';
        setName.style.gridRow = `row${i}`;
        setName.classList.add(i);

        let setPrice = document.createElement('input');
        setPrice.id = "setPrice";
        setPrice.placeholder = setInfo.price;
        setPrice.style.gridColumn = 'col3';
        setPrice.style.gridRow = `row${i}`;
        setPrice.classList.add(i);
        
        let setStock = document.createElement('input');
        setStock.id = "setStock";
        setStock.placeholder = setInfo.stocklevel;
        setStock.style.gridColumn = 'col4';
        setStock.style.gridRow = `row${i}`;
        setStock.classList.add(i);

        setTable.appendChild(setID);
        setTable.appendChild(setName);
        setTable.appendChild(setPrice);
        setTable.appendChild(setStock);
    }

    document.body.append(brickTable);
    document.body.append(setTable);
}

function createBackButton() {
    const backButton = document.createElement('button');
    backButton.id = 'backButton';
    backButton.textContent = 'back';
    backButton.addEventListener("click", (e) => {
        window.location.href = '/';
    })
    document.body.append(backButton);
}

function createSubmitButton() {
    const submit = document.createElement("button");
    submit.id = 'submit';
    submit.textContent = 'submit';
    submit.addEventListener("click", Hsubmit);
    document.body.appendChild(submit);
}

async function Hsubmit() {

    const allInputs = document.querySelectorAll('input');
    let changed = [];
    for (let i in allInputs) {
        const cur = allInputs[i];
        if (cur.value) {
            changed.push(cur);
        }
    }
    for (let i in changed) {
        const row = changed[i].classList[0];
        const brickList = document.querySelector('#brickID');
        let brick;
        for (let a in brickList) {
            if (brickList[a].classList.contains(row) ){
                brick = brickList[a].placeholder;
            }
        }
        console.log(id);
    }
}

async function init() {
    createTable();
    createBackButton();
    createSubmitButton();
}

window.addEventListener("load", init);