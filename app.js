document.addEventListener("DOMContentLoaded", function () {
  let listBg = document.querySelectorAll('.bg');
  let listTab = document.querySelectorAll('.tab');
  let titleBanner = document.querySelector('.banner h1');

  if (!listBg.length || !titleBanner) {
      console.error("Không tìm thấy phần tử cần thiết trong DOM.");
      return;
  }

  let lastScrollY = window.scrollY;
  let ticking = false;
  let lastTranslateY = new Array(listBg.length).fill(0); // Lưu giá trị translateY cũ

  function handleScroll() {
      let top = window.scrollY;

      for (let i = 0; i < listBg.length; i++) {
          if (i === 8) continue; // Giữ nguyên vị trí bg-8

          let speed = i === 0 ? 0.5 : i / 1.5;
          let translateY = top * speed;

          // Chỉ cập nhật nếu giá trị thay đổi
          if (lastTranslateY[i] !== translateY) {
              listBg[i].style.transform = `translateY(${translateY}px)`;
              lastTranslateY[i] = translateY;
          }
      }

      let titleTranslateY = top * 2;
      if (parseFloat(titleBanner.style.transform.replace("translateY(", "").replace("px)", "")) !== titleTranslateY) {
          titleBanner.style.transform = `translateY(${titleTranslateY}px)`;
      }

      ticking = false;
  }

  let timeout = null;
  function onScroll() {
      lastScrollY = window.scrollY;

      if (!ticking) {
          ticking = true;
          requestAnimationFrame(handleScroll);
      }

      // Debounce để giảm lag khi cuộn nhanh
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          requestAnimationFrame(handleScroll);
      }, 50);
  }

  // Dùng passive event listener để tối ưu
  window.addEventListener("scroll", onScroll, { passive: true });

  // Sử dụng IntersectionObserver để tối ưu kiểm tra tab
  let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
      });
  }, { threshold: 0.3 });

  listTab.forEach(tab => observer.observe(tab));

  // Chạy hàm lần đầu để cập nhật trạng thái ban đầu
  handleScroll();
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
















module.exports = {
  content: ["./*.html"], // hoặc đường dẫn tương ứng với project của bạn
  theme: {
    extend: {},
  },
  plugins: [],
}
