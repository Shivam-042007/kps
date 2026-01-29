// 1. SCROLL ANIMATION OBSERVER (Keeps your fade-in effect working)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach((el) => {
    observer.observe(el);
});


// 2. FIXED GALLERY AUTO-SCROLL (Using Pixels for accuracy)
const track = document.querySelector('.gallery-track');

// We use 'Array.from' to safely handle the slides list
const slides = Array.from(track.children);
let currentIndex = 0;

function scrollGallery() {
    // 1. Detect if we are on mobile or desktop
    // Corresponds to your CSS media query
    const isMobile = window.innerWidth <= 768;
    const photosPerView = isMobile ? 1 : 2; 

    // 2. Calculate how wide ONE slide is (including the gap)
    // We get the width of the first slide + the gap (20px from CSS)
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 20; // Must match the 'gap: 20px' in your CSS
    const amountToMove = slideWidth + gap;

    // 3. Update Index
    currentIndex += photosPerView;

    // 4. Check if we reached the end
    // If current index is greater than or equal to total slides, reset to 0
    if (currentIndex >= slides.length) {
        currentIndex = 0;
        // Optional: Remove transition for instant reset (prevents rewind effect)
        // track.style.transition = 'none';
        // track.style.transform = 'translateX(0)';
        // setTimeout(() => track.style.transition = 'transform 0.8s ease-in-out', 50);
        // return; 
    }

    // 5. Move the Track
    // We move left by (amountToMove * currentIndex)
    track.style.transform = `translateX(-${amountToMove * currentIndex}px)`;
}

// Start the loop (3 seconds)
setInterval(scrollGallery, 3000);

// EXTRA: Update sizing if user resizes window (prevents breakage)
window.addEventListener('resize', () => {
    // Reset position on resize to avoid alignment bugs
    currentIndex = 0;
    track.style.transform = `translateX(0px)`;
});
