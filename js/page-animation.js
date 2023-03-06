// animated icons




// Review carousel

let slides = document.querySelectorAll('.carousel-slide');
let faces = document.querySelectorAll('.face');
let currentIndex = 0;
let isAutoplay = true;

function updateSlide(position) {
    slides[currentIndex].style.display = 'none';
    faces[currentIndex].classList.remove('active-face');

    currentIndex = position;
    slides[currentIndex].style.display = 'block';
    faces[currentIndex].classList.add('active-face');
}

let intervalId = setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    updateSlide(nextIndex);
}, 5000);

function startAutoplay() {
    if (!isAutoplay) {
        isAutoplay = true;
        intervalId = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            updateSlide(nextIndex);
        }, 5000);
    }
}

function stopAutoplay() {
    if (isAutoplay) {
        isAutoplay = false;
        clearInterval(intervalId);
    }
}

faces.forEach((face, index) => {
    face.addEventListener('click', () => {
        updateSlide(index);
        stopAutoplay();
        startAutoplay();
    });
});

let container = document.querySelector('.carousel-container');
let startScroll = null;
let startX = null;
let threshold = 100;

function touchStart(e) {
    if (isAutoplay) {
        stopAutoplay();
    }
    startScroll = container.scrollLeft;
    startX = e.touches[0].pageX;
}

function touchMove(e) {
    if (startScroll === null) {
        return;
    }
    let currentX = e.touches[0].pageX;
    let distanceX = startX - currentX;
    container.scrollLeft = startScroll + distanceX;
}

function touchEnd(e) {
    startScroll = null;
    startX = null;
    let currentX = e.changedTouches[0].pageX;
    if (Math.abs(currentX - startX) < threshold) {
        updateSlide(currentIndex);
        startAutoplay();
    } else if (currentX > startX) {
        let nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = slides.length - 1;
        }
        updateSlide(nextIndex);
        startAutoplay();
    } else {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        updateSlide(nextIndex);
        startAutoplay();
    }
}

container.addEventListener('touchstart', touchStart);
container.addEventListener('touchmove', touchMove);
container.addEventListener('touchend', touchEnd);
container.addEventListener('touchcancel', touchEnd);