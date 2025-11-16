// Apparition au scroll
const elementsApparition = document.querySelectorAll(".apparition");
function apparition() {
    elementsApparition.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", apparition);
apparition();

// Menu burger mobile
const boutonBurger = document.querySelector('.burger');
const menuNavigation = document.querySelector('.liens-navigation');
const liensMenu = document.querySelectorAll('.liens-navigation a');

function toggleMenu() {
    menuNavigation.classList.toggle('active');
    boutonBurger.classList.toggle('active');
    const isOpen = menuNavigation.classList.contains('active');
    boutonBurger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}

boutonBurger.addEventListener('click', toggleMenu);
liensMenu.forEach(lien => lien.addEventListener('click', toggleMenu));
document.addEventListener('keydown', e => {
    if(e.key==='Escape' && menuNavigation.classList.contains('active')) toggleMenu();
});

// Modal zoom sur les images
const modal = document.getElementById('modalImageContainer');
const imageModal = document.getElementById('imageModal');
const boutonFermerModal = document.querySelector('.modal .fermer');
const images = document.querySelectorAll('img[src*="images/"]');

images.forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('show');
        imageModal.src = this.src;
        imageModal.alt = this.alt;
        document.body.style.overflow='hidden';
    });
});

boutonFermerModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow='auto';
});

modal.addEventListener('click', e => {
    if(e.target===modal) {
        modal.classList.remove('show');
        document.body.style.overflow='auto';
    }
});

document.addEventListener('keydown', e => {
    if(e.key==='Escape' && modal.classList.contains('show')){
        modal.classList.remove('show');
        document.body.style.overflow='auto';
    }
});
