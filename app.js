let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');

let lastScrollY = 0;
let ticking = false;

function handleScroll() {
    let top = lastScrollY;

    listBg.forEach((bg, index) => {
        if (index === 8) return; // Giữ nguyên vị trí của hình số 8

        let speed = index === 0 ? 0.5 : index / 1.5;
        let translateY = top * speed;

        if (bg.style.transform !== `translateY(${translateY}px)`) {
            bg.style.transform = `translateY(${translateY}px)`;
        }
    });

    let titleTranslateY = top * 2;
    if (titleBanner.style.transform !== `translateY(${titleTranslateY}px)`) {
        titleBanner.style.transform = `translateY(${titleTranslateY}px)`;
    }

    listTab.forEach(tab => {
        if (tab.offsetTop - top < 550) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    ticking = false;
}

window.addEventListener("scroll", () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});
