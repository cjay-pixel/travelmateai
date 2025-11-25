import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`btn btn-danger rounded-circle position-fixed p-0 d-flex align-items-center justify-content-center transition-all`}
      style={{
        bottom: "30px",
        right: "30px",
        width: "50px",
        height: "50px",
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transitionDuration: "0.3s",
      }}
      title="Back to top"
      aria-label="Back to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
}

export default ScrollToTopButton;