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