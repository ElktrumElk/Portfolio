const hambuger = document.getElementById("hambuger");
const sideBar = document.getElementById("side-bar");

let isVissible = false;

hambuger.addEventListener("click", () => {
    if (!isVissible) {
        sideBar.style.transform = "translateX(40%) translateY(7.2%)";
        isVissible = true;
        hambuger.innerText = "Χ";
    } else {
        sideBar.style.transform = "translateX(190%) translateY(7.2%)";
        isVissible = false;
        hambuger.innerText = "≡";
    }
});

window.addEventListener("scroll", () => {
    if (isVissible) {
        sideBar.style.transform = "translateX(190%) translateY(7.2%)";
        isVissible = false;
        hambuger.innerText = "≡";
    }
})