"use client";
import { FaArrowUp } from "react-icons/fa";
import { useButtonVisible } from "./hooks";

function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useButtonVisible();

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="p-3 rounded-full shadow-lg focus:outline-none text-text dark:text-text-dark bg-background dark:bg-background-dark/50"
      >
        <FaArrowUp />
      </button>
    )
  );
}

export default ScrollToTopButton;
