const viewport = document.querySelector("[data-reviews-viewport]");
const track = document.querySelector("[data-reviews-track]");
const btnPrev = document.querySelector("[data-reviews-prev]");
const btnNext = document.querySelector("[data-reviews-next]");
const slides = Array.from(track.children);

let prevActiveIndex = 0;
let activeIndex = 0;

window.addEventListener("resize", updateUI)

updateUI();

function updateUI() {
    const maxScroll = (slides.length - 1) * (slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap));

    btnPrev.disabled = viewport.scrollLeft <= 0;
    btnNext.disabled = viewport.scrollLeft >= maxScroll - 1;
    
    const noActiveUpdate = slides[prevActiveIndex];
    const activeUpdate = slides[activeIndex];

    noActiveUpdate.classList.remove("is-active");

    activeUpdate.classList.add("is-active");

    syncArrowIcon(btnPrev);
    syncArrowIcon(btnNext);
}

function syncArrowIcon(button) {
    const img = button.querySelector("img");

    const enabledSrc = img.dataset.srcEnabled;
    const disabledSrc = img.dataset.srcDisabled;

    img.src = button.disabled ? disabledSrc : enabledSrc;
}

let isAnimating = false;

btnNext.addEventListener("click", scrollNext);
btnPrev.addEventListener("click", scrollPrev);
viewport.addEventListener("scrollend", () => {
    updateUI();
    isAnimating = false;
});

function getScrollLength() {
    return slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
}

function scrollNext() {

    if (isAnimating) return;
    isAnimating = true;
    
    viewport.scrollBy({left: getScrollLength(), behavior: "smooth"});

    
    prevActiveIndex = activeIndex;
    activeIndex += 1;
}

function scrollPrev() {

    if (isAnimating) return;
    isAnimating = true;

    viewport.scrollBy({left: -getScrollLength(), behavior: "smooth"});


    prevActiveIndex = activeIndex;
    activeIndex -= 1;
}