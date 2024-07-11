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
            remove.classList.remove('active');
        });
        event.target.classList.add('active');

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
    document.querySelector('.random-bakground .yes').classList.remove('active');
    document.querySelector('.random-bakground .no').classList.add('active');
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
        }, 1000);
    }
}

randomBackgroundImages();

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
let skills = document.querySelector('.skills');
let progress = document.querySelectorAll('.skill-box .skill-progress span');
let number = document.querySelectorAll('.skill-box .skill-progress span .number');


window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop) {
        progress.forEach(function (e, index) {
            e.style.width = e.dataset.skill + "%";
            
            // Select the corresponding .skill-number element
            let num = number[index];
            if (num) {
                num.textContent = e.dataset.skill;
                num.style.display = 'block';
            }
        });
    }
};

// End progress