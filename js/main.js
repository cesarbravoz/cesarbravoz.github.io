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