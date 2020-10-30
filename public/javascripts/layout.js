// Calculate vh
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);


// Burger menu add class and adnimation
const navAnimation = gsap.from(".nav", {
    duration: 1,
    x: window.innerWidth,
    ease: "sine",
    reversed: true,
});

const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navAnimation.reversed() ? navAnimation.play() : navAnimation.reverse();
});