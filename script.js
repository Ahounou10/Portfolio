// Typewriter effect pour le h1
const h1Element = document.getElementById('h1');
if (h1Element) {
    h1Element.addEventListener('animationend', () => {
        h1Element.style.borderRight = '3px solid transparent';
    });
}

// Typewriter effect pour h2
const h2Element = document.getElementById('h2');
if (h2Element) {
    h2Element.addEventListener('animationend', () => {
        h2Element.style.borderRight = '2px solid transparent';
    });
}

// Typewriter effect pour p
const pElement = document.getElementById('p1');
if (pElement) {
    pElement.addEventListener('animationend', () => {
        pElement.style.borderRight = '2px solid transparent';
    });
}

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
