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









import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactMe() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.div
        className="p-6 bg-gray-800 rounded-lg shadow-lg"
        animate={{ scale: isVisible ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Liên hệ với tôi</h2>
        <p className="text-gray-400 mb-4">Nếu bạn có bất kỳ câu hỏi nào, hãy nhấn vào nút bên dưới.</p>
        <Button className="bg-blue-500 hover:bg-blue-700 transition-all">Nhấn để liên hệ</Button>
      </motion.div>
    </div>
  );
}