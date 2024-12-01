let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active-dot', '');
    }
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].className += ' active-dot';
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-button');
    const texts = document.querySelectorAll('.toggle-text');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Hide all texts
            texts.forEach((text) => text.classList.remove('active-text'));
            buttons.forEach((button) => button.classList.remove('active-button'));

            // Show the corresponding text
            const targetId = button.getAttribute('data-target');
            button.classList.add('active-button');
            const targetText = document.getElementById(targetId);
            targetText.classList.add('active-text');
        });
    });
});