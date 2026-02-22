document.addEventListener("DOMContentLoaded", () => {
  /**
   * Intersection Observer for Reveal Animations
   */
  const revealElements = document.querySelectorAll(".js-reveal");

  const revealCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Once revealed, no need to observe anymore
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // use viewport
    rootMargin: "0px",
    threshold: 0.1, // trigger when 10% of element is visible
  });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /**
   * Smooth Anchor Scroll
   */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
});
