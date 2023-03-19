
// Toggle Display of About categories
function toggleDisplay(id) {
    let dis = document.getElementById(id);
    if (dis.style.display === "none") {
        dis.style.display = "block";
    } else {
        dis.style.display = "none";
    }
}

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.7
  };
  
  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('hidden', 'show');
      } else {
        entry.target.classList.replace('show', 'hidden');
      }
    });
  }
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  const fadeElms = document.querySelectorAll('.hidden');

  fadeElms.forEach(el => observer.observe(el));