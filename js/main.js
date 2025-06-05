

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider-img');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let current = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + images.length) % images.length;
        showImage(current);
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % images.length;
        showImage(current);
    });

    showImage(current);
});