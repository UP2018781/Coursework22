export async function fetchBrickInfo(id) {
    const response = await fetch(new URL('http://127.0.0.1:8080/query_brick'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id
        })
    });
    const res = await response.json();
    const BrickInfo = await res.brickInfo;
    return await BrickInfo;
}