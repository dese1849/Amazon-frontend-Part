import React from "react";

const arrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  border: "none",
  borderRadius: "50%",
  color: "white",
  fontSize: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 1,
  transition: "background-color 0.3s",
};

const leftArrowStyles = {
  ...arrowStyles,
  left: "10px",
};

const rightArrowStyles = {
  ...arrowStyles,
  right: "10px",
};

const renderArrowPrev = (clickHandler, hasPrev, label) => {
  return (
    <button
      type="button"
      onClick={clickHandler}
      disabled={!hasPrev}
      aria-label={label}
      style={{
        ...leftArrowStyles,
        cursor: hasPrev ? "pointer" : "not-allowed",
        backgroundColor: hasPrev ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)",
      }}
    >
      &larr; {/* Left arrow symbol */}
    </button>
  );
};

const renderArrowNext = (clickHandler, hasNext, label) => {
  return (
    <button
      type="button"
      onClick={clickHandler}
      disabled={!hasNext}
      aria-label={label}
      style={{
        ...rightArrowStyles,
        cursor: hasNext ? "pointer" : "not-allowed",
        backgroundColor: hasNext ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)",
      }}
    >
      &rarr; {/* Right arrow symbol */}
    </button>
  );
};

export { renderArrowPrev, renderArrowNext };
