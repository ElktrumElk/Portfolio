
const hambuger = document.getElementById("hambuger");
const sideBar = document.getElementById("side-bar");


let isVissible = false;

function transitionEffect() {
    if (!isVissible) {
        sideBar.style.display = "flex";

        requestAnimationFrame(() => {
            sideBar.style.height = "100%";
            sideBar.style.opacity = 1;
            isVissible = true;
            hambuger.innerText = "Χ";
            document.body.style.overflow = "hidden"
        });

    } else {

        sideBar.style.height = "0%";
        sideBar.style.opacity = 0;
        isVissible = false;
        hambuger.innerText = "≡";
        document.body.style.overflow = "";

        setTimeout(() => {
            sideBar.style.display = "none"
        }, 1000);

    }
}

hambuger.addEventListener("click", () => {
    transitionEffect();
});

Array.from(sideBar.children).forEach(child => {

    child.addEventListener("click", () => {
        transitionEffect();
    })
})



window.addEventListener("scroll", () => {

    if (isVissible) { return; }

});



