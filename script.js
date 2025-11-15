// Animation d'apparition au scroll
const reveals = document.querySelectorAll(".reveal");

function reveal() {
    reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();
