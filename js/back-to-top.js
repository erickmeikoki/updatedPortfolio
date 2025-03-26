document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  // Smooth scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
