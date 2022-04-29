
/**
 * gets on object (brickInfo) from the server searched by ID
 * @param {number} id 
 * @returns 
 */
export async function fetchBrickInfo(id) {
    const response = await fetch(new URL(`http://${window.location.host}/query_brick`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
        })
    });
    const res = await response.json();
    const BrickInfo = await res.brickInfo;
    return await BrickInfo;
}

/**
 * fetches by parameters determined by the object
 * 
 * id
 * colour
 * all (bool)
 * 
 * @param {obj} fetchBy 
 * @returns array
 */
export async function fetchManyBricks(fetchBy) {
    const response  = await fetch (new URL(`http://${window.location.host}/query_many_bricks`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: fetchBy.id,
            colour: fetchBy.colour,
            all: fetchBy.all,
        })
    })
    const res = await response.json();
    const brickArray = await res.brickArray;
    return await brickArray;
}

/**
 * gets an obj of setInfo from the database
 * @param {number} id 
 * @returns setInfo
 */
export async function fetchSetInfo(id) {
    const response = await fetch(new URL(`http://${window.location.host}/query_set`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
        })
    });
    const res = await response.json();
    const setInfo = await res.setInfo;
    return await setInfo;
}

/**
 * fetches by parameter
 * 
 * id
 * colour
 * all (bool)
 * 
 * @param {*} fetchBy 
 * @returns [{}, {}, {}...]
 */
export async function fetchManySets(fetchBy) {
    const response  = await fetch (new URL(`http://${window.location.host}/query_many_sets`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: fetchBy.id,
            colour: fetchBy.name,
            all: fetchBy.all,
        })
    });
    const res = await response.json();
    const setArray = await res.setArray;
    return await setArray;
}

/**
 * removes the desired amount of "id" of type "type" from stock
 * @param {number} id 
 * @param {string} type brick/set
 * @param {number} amount 
 */
export async function updateStock(id, type, amount) {
    await fetch(new URL(`http://${window.location.host}/update_stock`), {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
            id: id,
            type: type,
            amount: amount,
        })
    });
}

/**
 * NOT IMPEMENTED
 * will return an array of brick ID's based on users preferences
 * 
 * currently returns static array
 * @param {} userToken 
 * @returns 
 */
export async function fetchUsersFavourites(userToken) {
    // const response  = await fetch (new URL(`http://${window.location.host}/get_favourites`), {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         token: userToken
    //     })
    // });
    // const res = await response.json();
    // const favourites = await res.favourites;
    const favourites = [1,4,5,7,8,5,3];
    return await favourites;
}

/**
 * NOT IMPEMENTED
 * will return an array of set ID's based on users preferences
 * 
 * currently returns static array
 * @param {} userToken 
 * @returns 
 */
export async function fetchSuggestedSets(userToken) {
    // const response  = await fetch (new URL(`http://${window.location.host}/get_suggested_sets`), {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         token: userToken
    //     })
    // });
    // const res = await response.json();
    // const suggestedSets = res.sets;

    const suggestedSets = [1,2];
    return await suggestedSets;
}

/**
 * NOT IMPEMENTED
 * will return an array of brick ID's based on users preferences
 * 
 * currently returns static array
 * @param {*} userToken 
 * @returns 
 */
export async function fetchSuggestedBricks(userToken) {
    const suggestedBricks = [7,6,5,8,9,10];
    return await suggestedBricks;
}

/**
 * fetches auth config from server
 * @returns obj
 */
export async function fetchAuthConfig() {
    const response = await fetch(new URL(`http://${window.location.host}/auth_config`));
    if (response.ok){
        return(response.json());
    } else {
        throw response;
    }
}
