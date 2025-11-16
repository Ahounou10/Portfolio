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

// Burger menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Modal zoom sur les images
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Sélectionner toutes les images dans le portfolio
const images = document.querySelectorAll('img[src*="images/"]');

images.forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('show');
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    });
});

// Fermer la modal au clic sur X
closeBtn.addEventListener('click', function() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Fermer la modal au clic en dehors de l'image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Fermer avec la touche Echap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});
