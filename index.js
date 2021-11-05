function createTopper(){
    const topper = document.createElement("div");
    topper.id = "topper";
    topper.style.height = "8em";
    topper.style.backgroundColor = "#AAA";
    document.body.append(topper);
}
createTopper();