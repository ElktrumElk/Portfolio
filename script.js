const hambuger = document.getElementById("hambuger");
const sideBar = document.getElementById("side-bar");

let isVissible = false;

hambuger.addEventListener("click", () => {
    if (!isVissible) {
        sideBar.style.transform = "translateX(40%) translateY(4%)";
        isVissible = true;
        hambuger.innerText = "Χ";
    } else {
        sideBar.style.transform = "translateX(190%) translateY(4%)";
        isVissible = false;
        hambuger.innerText = "≡";
    }
});