
/**
 * fetches by parameters determined by the object
 * 
 * fetchBy.id = 1;
 * fetches bricks with an ID of 1,
 * @param {obj} fetchBy 
 * @returns obj
 */
export async function fetchBrickInfo(id) {
    const response = await fetch(new URL('http://127.0.0.1:8080/query_brick'), {
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
    const response  = await fetch (new URL('http://127.0.0.1:8080/query_many_bricks'), {
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

export async function fetchSetInfo(fetchBy) {
    const response = await fetch(new URL('http://127.0.0.1:8080/query_set'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: fetchBy.id,
            name: fetchBy.name,
        })
    });
    const res = await response.json();
    const setInfo = await res.setInfo;
    return await setInfo;
}

export async function fetchManySets(fetchBy) {
    const response  = await fetch (new URL('http://127.0.0.1:8080/query_many_sets'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: fetchBy.id,
            colour: fetchBy.name,
            all: fetchBy.all,
        })
    })
    const res = await response.json();
    const setArray = await res.setArray;
    return await setArray;
}