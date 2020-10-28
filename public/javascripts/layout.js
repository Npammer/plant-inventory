// Calculate vh
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Burger animation class
const menuBtn = document.querySelector('.menu-btn');
menuBtn.addEventListener('click', () => menuBtn.classList.toggle('open'));