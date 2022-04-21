
/**
 * fetches by parameters determined by the object
 * 
 * fetchBy.id = 1;
 * fetches bricks with an ID of 1,
 * @param {obj} fetchBy 
 * @returns obj
 */
export async function fetchBrickInfo(fetchBy) {
    const response = await fetch(new URL('http://127.0.0.1:8080/query_brick'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: fetchBy.id,
            colour: fetchBy.colour,
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