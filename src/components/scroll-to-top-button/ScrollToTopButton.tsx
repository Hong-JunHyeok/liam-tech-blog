"use client";
import { FaArrowUp } from "react-icons/fa";
import { useButtonVisible } from "./hooks";

function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useButtonVisible();

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 p-3 bg-content text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all"
      >
        <FaArrowUp />
      </button>
    )
  );
}

export default ScrollToTopButton;
