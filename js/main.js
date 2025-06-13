document.addEventListener('DOMContentLoaded', function() {
    // Slider principal
    const images = document.querySelectorAll('.contenedor-slider .slider-img');
    const prevBtn = document.querySelector('.contenedor-slider .slider-btn.prev');
    const nextBtn = document.querySelector('.contenedor-slider .slider-btn.next');
    let current = 0;
    let intervalId;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function nextImage() {
        current = (current + 1) % images.length;
        showImage(current);
    }

    function prevImage() {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    }

    prevBtn.addEventListener('click', () => {
        prevImage();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextImage();
        resetInterval();
    });

    function startInterval() {
        intervalId = setInterval(nextImage, 3000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    showImage(current);
    startInterval();

    // Fullscreen modal
    const expandBtn = document.querySelector('.expand-slider-btn');
    const fullscreenModal = document.getElementById('fullscreen-slider-modal');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen-slider');
    const sliderFullscreen = document.querySelector('.slider-fullscreen');

    expandBtn.addEventListener('click', function() {
        const activeImg = document.querySelector('.contenedor-slider .slider-img.active');
        if (activeImg) {
            const clone = activeImg.cloneNode(true);
            clone.classList.add('active');
            sliderFullscreen.innerHTML = '';
            sliderFullscreen.appendChild(clone);
        }
        fullscreenModal.classList.add('active');
    });

    closeFullscreenBtn.addEventListener('click', function() {
        fullscreenModal.classList.remove('active');
        sliderFullscreen.innerHTML = '';
    });

    fullscreenModal.addEventListener('click', function(e) {
        if (e.target === fullscreenModal) {
            fullscreenModal.classList.remove('active');
            sliderFullscreen.innerHTML = '';
        }
    });
});