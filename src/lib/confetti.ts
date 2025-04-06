import confetti from "canvas-confetti";

export const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    shapes: ["circle"],
    colors: ["#00bcd4", "#8bc34a", "#ffc107", "#ff5722"],
  });
};
