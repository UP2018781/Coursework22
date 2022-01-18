document.body.style.height = `100%`;

function createSalesBox(StartX,StartY,Scale,ItemName,ItemInfo){
    const box = document.createElement('div');
    box.classList.add("sales");
    box.style.left = `${StartX}%`;
    box.style.bottom = `${StartY}%`;

    document.body.append(box);

}

for (let i = 0;i<4;i++){
    createSalesBox(25,(i*20)+10);
}
