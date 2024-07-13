// start Settings Box
//Colors settings
let check = localStorage.getItem('toggel-color')
let toggel_color = document.querySelectorAll('.toggel-color li');
if(check != null){
    document.documentElement.style.setProperty('--main-color' , check)
    toggel_color.forEach(function (e){
        if(e.dataset.color == check){
            toggel_color.forEach((remove) => remove.classList.remove('active'))
            e.classList.add('active')
        }
    })
}

let settingsBox = document.querySelector('.settings-box');
let icon = document.querySelector('.icon');
icon.addEventListener('click', function (){
    settingsBox.classList.toggle('active')
    this.classList.toggle('active')
    this.classList.toggle('fa-spin')
})

// localStorage.clear()

toggel_color.forEach(function (e){
    e.addEventListener('click', function (event) {
        toggel_color.forEach(function (remove){
            remove.classList.remove('active')
        })
        e.classList.add('active')
        document.documentElement.style.setProperty('--main-color' , `${event.target.dataset.color}`)

        localStorage.setItem('toggel-color' , event.target.dataset.color)
    })
})

//Random Background settings
let randomBackground = document.querySelectorAll('.random-bakground span');
let landing_page = document.querySelector('.landing-page');
let timeRandom, checkedBackground = true;

let images = [
    'images/landing-1.jpg',
    'images/landing-2.jpg',
    'images/landing-3.jpg',
    'images/landing-4.jpg',
    'images/landing-5.jpg'
];
randomBackground.forEach(function (span) {
    span.addEventListener('click', function (event) {
        randomBackground.forEach(function (remove) {
            remove.classList.remove('active-1');
        });
        event.target.classList.add('active-1');

        if (event.target.dataset.background == 'yes') {
            localStorage.setItem('randomImages', "yes");
            checkedBackground = true;
            randomBackgroundImages();
        }

        if (event.target.dataset.background == 'no') {
            localStorage.setItem('randomImages', "no");
            checkedBackground = false;
            clearInterval(timeRandom);
            localStorage.setItem('lastBackgroundImage', landing_page.style.backgroundImage);
        }
    });
});

if (localStorage.getItem('randomImages') == 'no') {
    document.querySelector('.random-bakground .yes').classList.remove('active-1');
    document.querySelector('.random-bakground .no').classList.add('active-1');
    checkedBackground = false;
    clearInterval(timeRandom);
    if (localStorage.getItem('lastBackgroundImage')) {
        landing_page.style.backgroundImage = localStorage.getItem('lastBackgroundImage');
    }
}

function randomBackgroundImages() {
    if (checkedBackground == true) {
        timeRandom = setInterval(() => {
            let random = Math.floor(Math.random() * images.length);
            landing_page.style.backgroundImage = `url('${images[random]}')`;
        }, 4000);
    }
}

randomBackgroundImages();


// End Settings Box
let options_bullets = document.querySelectorAll('.options-bullets span')
let allBullets = document.querySelector('.bullets')



let storedValue = localStorage.getItem('yesAllBullets');
if (storedValue === 'yes') {
    allBullets.style.display = 'block';
    document.querySelector('.options-bullets .yes').classList.add('active-2');
    document.querySelector('.options-bullets .no').classList.remove('active-2');
} else if (storedValue === 'no') {
    allBullets.style.display = 'none';
    document.querySelector('.options-bullets .yes').classList.remove('active-2');
    document.querySelector('.options-bullets .no').classList.add('active-2');
}

options_bullets.forEach(function (e) {
    e.addEventListener('click', function (event) {
        options_bullets.forEach(bullet => {
            bullet.classList.remove('active-2');
        });
        event.target.classList.add('active-2');

        if (event.target.classList.contains('yes')) {
            localStorage.setItem('yesAllBullets', 'yes');
            allBullets.style.display = 'block';
        } else if (event.target.classList.contains('no')) {
            localStorage.setItem('yesAllBullets', 'no');
            allBullets.style.display = 'none';
        }
    });
});



// Start Bullets
let bullets = document.querySelectorAll('.bullets .bullet')
bullets.forEach(bullet => {
    bullet.addEventListener('click', function (event) {
        bullets.forEach(bullet => {
            bullet.classList.remove('active')
        })
        event.target.classList.add('active')

        document.querySelector(`.${event.target.dataset.sections}`).scrollIntoView({
            behavior:'smooth',
        })
        setTimeout(() => {
            event.target.classList.remove('active')
        }, 2000);
    })
})
// End Bullets

//Linkes
let linkes = document.querySelector('.linkes');
linkes.addEventListener('click', function (){

    linkes.classList.toggle('active')
    document.querySelector('.landing-page ul').classList.toggle('active')
    document.querySelectorAll('.landing-page ul li').forEach(function (e){
        e.classList.toggle('active')
    })
})

let activesLinkes = document.querySelectorAll('.landing-page ul li a')
activesLinkes.forEach(function (e){
    e.addEventListener('click', function (event) {
        activesLinkes.forEach(function (remove){
            remove.classList.remove('active')
        })
        event.target.classList.add('active')
    })
})

// Start progress
//Headers
let skills = document.querySelector('.skills');
let number = document.querySelectorAll('.skill-box .skill-progress span .number');
let headers = document.getElementById('header');

window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop) {
        let progress = document.querySelectorAll('.skill-box .skill-progress span');
        progress.forEach(function (e, index) {
            e.style.width = e.dataset.skill + "%";
            
            let num = number[index];
            if (num) {
                num.textContent = e.dataset.skill;
                num.style.display = 'block';
            }
        });
    }
    if(window.scrollY >= 96){
        headers.style.backgroundColor = '#333'
    }
    else{
        headers.style.backgroundColor = 'transparent'
    }
};

// End progress

// Start gallery
let gallery = document.querySelectorAll('.gallery .box-item img')

gallery.forEach(function (e){
    e.addEventListener('click', function (event) {
        
        let overlay = document.createElement('div');

        overlay.className = 'gallery-overlay'
        document.body.appendChild(overlay)

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';

        if(e.alt != null){
            let h3 = document.createElement('h3');
            h3.textContent = e.alt
            h3.className = 'gallery-titel'
            popupBox.appendChild(h3)
        }

        let popupHmage = document.createElement('img')

        popupHmage.src = e.src

        popupBox.appendChild(popupHmage)

        document.body.appendChild(popupBox)

        let span = document.createElement('span');
        span.className = 'close';
        span.textContent = 'X';
        popupBox.appendChild(span)

        span.addEventListener('click', function () {
            popupBox.remove()
            overlay.remove()
        })
    })
})

// End gallery
