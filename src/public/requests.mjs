/**
 * fetches by parameters determined by the object
 * 
 * fetchBy.id = 1;
 * fetches bricks with an ID of 1,
 * @param {obj} fetchBy 
 * @returns obj
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