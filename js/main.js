document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
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
});
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.slider-btns');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    navLinks.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
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

    const expandBtn = document.querySelector('.expand-slider-btn');
    const fullscreenModal = document.getElementById('fullscreen-slider-modal');
    const closeFullscreenBtn = document.querySelector('.close-fullscreen-slider');
    const slider = document.querySelector('.slider');
    const sliderFullscreen = document.querySelector('.slider-fullscreen');

    expandBtn.addEventListener('click', function() {
        // Clona el contenido del slider al modal
        sliderFullscreen.innerHTML = slider.innerHTML;
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