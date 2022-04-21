
/**
 * fetches by parameters determined by the object
 * 
 * fetchBy.id = 1;
 * fetches bricks with an ID of 1,
 * @param {obj} fetchBy 
 * @returns 
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