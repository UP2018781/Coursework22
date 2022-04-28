import { addBrickHolders, createBrickHolder} from "./bricks.mjs";
import { createSetHolder } from './sets.mjs';
import { fetchManyBricks, fetchBrickInfo, fetchUsersFavourites, fetchSuggestedSets, fetchSetInfo, fetchSuggestedBricks } from "./requests.mjs";

export async function initiateHome() {
    createFavouritesHolder();
    createSetsHolder();
    createBricksHolder();
    addFavourites();
    addSuggestedSets();
    addSuggestedBricks();
}

function createFavouritesHolder() {
    const favouritesHolder = document.createElement("div");
    favouritesHolder.id = 'favouritesHolder';
    document.body.querySelector('.Holder').append(favouritesHolder);
}

async function addFavourites() {
    const favouritesArray = await fetchUsersFavourites();
    for (let i in favouritesArray){
        document.body.querySelector('.Holder #favouritesHolder').append(await createBrickHolder( await fetchBrickInfo(favouritesArray[i])));
    }
}

function createSetsHolder() {
    const setsHolder = document.createElement("div");
    setsHolder.id = 'setsHolder';
    document.body.querySelector('.Holder').append(setsHolder);
}

async function addSuggestedSets() {
    const setsArray = await fetchSuggestedSets();
    for (let i in setsArray) {
        document.body.querySelector('.Holder #setsHolder').append(await createSetHolder( await fetchSetInfo(setsArray[i])));
    }
}

function createBricksHolder() {
    const setsHolder = document.createElement("div");
    setsHolder.id = 'bricksHolder';
    document.body.querySelector('.Holder').append(setsHolder);
}

async function addSuggestedBricks() {
    const bricksArray = await fetchSuggestedBricks();
    for (let i in bricksArray) {
        document.body.querySelector('.Holder #bricksHolder').append(await createBrickHolder( await fetchBrickInfo(bricksArray[i])));
    }
}