// Colors settings
let check = localStorage.getItem('toggel-color');
let toggel_color = document.querySelectorAll('.toggel-color li');

if (check) {
    document.documentElement.style.setProperty('--main-color', check);
    toggel_color.forEach((e) => {
        e.classList.toggle('active', e.dataset.color === check);
    });
}

let settingsBox = document.querySelector('.settings-box');
let icon = document.querySelector('.icon');
icon.addEventListener('click', function () {
    settingsBox.classList.toggle('active');
    this.classList.toggle('active');
    this.classList.toggle('fa-spin');
});

toggel_color.forEach((e) => {
    e.addEventListener('click', function (event) {
        toggel_color.forEach((remove) => remove.classList.remove('active'));
        e.classList.add('active');
        document.documentElement.style.setProperty('--main-color', event.target.dataset.color);
        localStorage.setItem('toggel-color', event.target.dataset.color);
    });
});

// Random Background settings
let randomBackground = document.querySelectorAll('.random-bakground span');
let landing_page = document.querySelector('.landing-page');
let timeRandom, checkedBackground = localStorage.getItem('randomImages') !== 'no';
let images = [
    'images/landing-1.jpg',
    'images/landing-2.jpg',
    'images/landing-3.jpg',
    'images/landing-4.jpg',
    'images/landing-5.jpg'
];

randomBackground.forEach((span) => {
    span.addEventListener('click', function (event) {
        randomBackground.forEach((remove) => remove.classList.remove('active-1'));
        event.target.classList.add('active-1');
        checkedBackground = event.target.dataset.background === 'yes';
        localStorage.setItem('randomImages', checkedBackground ? 'yes' : 'no');
        if (checkedBackground) {
            randomBackgroundImages();
        } else {
            clearInterval(timeRandom);
            localStorage.setItem('lastBackgroundImage', landing_page.style.backgroundImage);
        }
    });
});

if (!checkedBackground) {
    document.querySelector('.random-bakground .yes').classList.remove('active-1');
    document.querySelector('.random-bakground .no').classList.add('active-1');
    clearInterval(timeRandom);
    let lastImage = localStorage.getItem('lastBackgroundImage');
    if (lastImage) {
        landing_page.style.backgroundImage = lastImage;
    }
}

function randomBackgroundImages() {
    if (checkedBackground) {
        timeRandom = setInterval(() => {
            let random = Math.floor(Math.random() * images.length);
            landing_page.style.backgroundImage = `url('${images[random]}')`;
        }, 4000);
    }
}
randomBackgroundImages();

// Options Bullets
let options_bullets = document.querySelectorAll('.options-bullets span');
let allBullets = document.querySelector('.bullets');

if (localStorage.getItem('yesAllBullets') === 'yes') {
    allBullets.style.display = 'block';
    document.querySelector('.options-bullets .yes').classList.add('active-2');
    document.querySelector('.options-bullets .no').classList.remove('active-2');
} else {
    allBullets.style.display = 'none';
    document.querySelector('.options-bullets .yes').classList.remove('active-2');
    document.querySelector('.options-bullets .no').classList.add('active-2');
}

options_bullets.forEach((e) => {
    e.addEventListener('click', function (event) {
        options_bullets.forEach((bullet) => bullet.classList.remove('active-2'));
        event.target.classList.add('active-2');
        let displayBullets = event.target.classList.contains('yes') ? 'block' : 'none';
        allBullets.style.display = displayBullets;
        localStorage.setItem('yesAllBullets', event.target.classList.contains('yes') ? 'yes' : 'no');
    });
});

// Bullets
document.querySelector('.bullets').addEventListener('click', function (event) {
    if (event.target.classList.contains('bullet')) {
        document.querySelectorAll('.bullets .bullet').forEach((bullet) => bullet.classList.remove('active'));
        event.target.classList.add('active');
        document.querySelector(`.${event.target.dataset.sections}`).scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => event.target.classList.remove('active'), 2000);
    }
});

// Links
let linkes = document.querySelector('.linkes');
linkes.addEventListener('click', function () {
    linkes.classList.toggle('active');
    document.querySelector('.landing-page ul').classList.toggle('active');
    document.querySelectorAll('.landing-page ul li').forEach((e) => e.classList.toggle('active'));
});

document.querySelector('.landing-page ul').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        document.querySelectorAll('.landing-page ul li a').forEach((e) => e.classList.remove('active'));
        event.target.classList.add('active');
    }
});

// Progress
let skills = document.querySelector('.skills');
let headers = document.getElementById('header');
let number = document.querySelectorAll('.skill-box .skill-progress span .number');

window.addEventListener('scroll', function () {
    if (window.scrollY >= skills.offsetTop) {
        document.querySelectorAll('.skill-box .skill-progress span').forEach((e, index) => {
            e.style.width = `${e.dataset.skill}%`;
            let num = number[index];
            if (num) {
                num.textContent = e.dataset.skill;
                num.style.display = 'block';
            }
        });
    }
    headers.style.backgroundColor = window.scrollY >= 96 ? '#333' : 'transparent';
});

// Gallery
document.querySelector('.gallery').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        let overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        document.body.appendChild(overlay);

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if (event.target.alt) {
            let h3 = document.createElement('h3');
            h3.textContent = event.target.alt;
            h3.className = 'gallery-titel';
            popupBox.appendChild(h3);
        }

        let popupImage = document.createElement('img');
        popupImage.src = event.target.src;
        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let span = document.createElement('span');
        span.className = 'close';
        span.textContent = 'X';
        popupBox.appendChild(span);

        span.addEventListener('click', function () {
            popupBox.remove();
            overlay.remove();
        });
    }
});

// Reset
document.querySelector('.reset').addEventListener('click', function () {
    localStorage.clear();
    window.location.reload();
});
