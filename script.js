// 1. SCROLL ANIMATION OBSERVER
// Detects when elements enter the screen and adds the 'visible' class
const observerOptions = {
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Select all elements with the animation class
document.querySelectorAll('.fade-on-scroll').forEach((el) => {
    observer.observe(el);
});


// 2. GALLERY AUTO-SCROLL
const track = document.querySelector('.gallery-track');
const slides = document.querySelectorAll('.gallery-slide');
let currentIndex = 0;
const totalSlides = slides.length;

// Check if we are on mobile (1 photo) or desktop (2 photos)
// Note: This check runs once on load. For dynamic resizing, you'd add an event listener.
const photosPerView = window.innerWidth <= 768 ? 1 : 2; 

function scrollGallery() {
    currentIndex += photosPerView;
    
    // If we reach the end, loop back to start
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Move the track
    // If 2 photos: Each slide is 50%. We move by index * 50%
    // If 1 photo: Each slide is 100%. We move by index * 100%
    const movePercentage = currentIndex * (100 / photosPerView);
    track.style.transform = `translateX(-${movePercentage}%)`;
}

// Set the auto-scroll timer (3000ms = 3 seconds)
setInterval(scrollGallery, 3000);
