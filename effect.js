const text = "Hello, I'm a Graphic Designer!";
const typewriterElement = document.getElementById("typewriter");
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting && index < text.length) {
    typewriterElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 100); 
  } else if (isDeleting && index > 0) {
    typewriterElement.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    setTimeout(typeEffect, isDeleting ? 1000 : 2000); // Chờ 1s trước khi xóa, 2s trước khi gõ lại
  }
}
typeEffect();

// Hiệu ứng Parallax
let listBg = document.querySelectorAll('.bg');
let listTab = document.querySelectorAll('.tab');
let titleBanner = document.querySelector('.banner h1');

window.addEventListener("scroll", () => {
    let top = window.scrollY;
    listBg.forEach((bg, index) => {
        if (index !== 0 && index !== 8) {
            bg.style.transform = `translateY(${top * index / 2}px)`;
        } else if (index === 0) {
            bg.style.transform = `translateY(${top / 3}px)`;
        }
    });
    titleBanner.style.transform = `translateY(${top * 2}px)`;

    listTab.forEach(tab => {
        if (tab.offsetTop - top < 550) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view"); // Nếu muốn bỏ hiệu ứng khi cuộn ra ngoài
        }
      });
    },
    { threshold: 0.5 } // Kích hoạt khi 50% card xuất hiện trong viewport
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});
