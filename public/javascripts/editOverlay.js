const editBtn = document.querySelector(".edit");
const editOverlay = document.querySelector(".edit-overlay");
const editOverlayBackground = document.querySelector(".edit-overlay-background");

const editOverlayAnimation = gsap.from(".edit-overlay", {
    duration: 1,
    y: editOverlay.offsetHeight,
    ease: "sine",
    reversed: true,
});

editBtn.addEventListener("click", () => {
    editOverlayBackground.classList.add("active");
    editOverlayAnimation.play()
});

editOverlayBackground.addEventListener("click", () => {
    editOverlayBackground.classList.remove("active");
    editOverlayAnimation.reverse();
});

// TODO: Animate background opacity