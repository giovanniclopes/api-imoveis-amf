import { useEffect, useState } from "react";
import topIcon from "../assets/icons/top.svg";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
        >
          <img width={46} src={topIcon} alt="" />
        </button>
      )}
    </div>
  );
}
