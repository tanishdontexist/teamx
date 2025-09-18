const earthSection = document.querySelector(".earth-section");
const earth = document.getElementById("earthPNG");
const unhideEl = document.getElementById("UnHIDE");

function handleScroll() {
  const isMobile = window.innerWidth <= 991; // mobile check

  if (isMobile) {
    // Mobile: static Earth & visible text
    earth.style.width = `10rem`;
    earth.style.height = `10rem`;
    earth.style.marginTop = '0px';
    earthSection.classList.remove("left-align");

    // Show text & center it
    unhideEl.classList.add("unhide-default");
    unhideEl.style.textAlign = 'center';
    return; // stop further execution
  }

  // Desktop scroll/shrink logic
  const scrollY = window.scrollY;

  const maxSize = 120; // rem
  const minSize = 50;  // rem
  const shrinkPoint = 300;

  // calculate new size
  let newSize = maxSize - (scrollY / shrinkPoint) * (maxSize - minSize);
  newSize = Math.max(minSize, Math.min(maxSize, newSize));

  // apply size
  earth.style.width = `${newSize}rem`;
  earth.style.height = `${newSize}rem`;
  earth.style.marginTop = scrollY > 0 ? "0px" : "0px";

  // align left
  if (scrollY > 0) {
    earthSection.classList.add("left-align");
  } else {
    earthSection.classList.remove("left-align");
  }

  // fade-in & small Earth
  if (newSize <= minSize) {
    earth.classList.add("earth-fast");
    unhideEl.classList.add("unhide-default");
    earth.style.animationDuration = `720s`; // fast rotation
  } else {
    earth.classList.remove("earth-fast");
    unhideEl.classList.remove("unhide-default");
    earth.style.animationDuration = `720s`; // normal rotation
  }
}

// Run on scroll and resize
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleScroll);

// Initial call
handleScroll();

// Navbar height for scroll offset
const navbarHeight = document.querySelector('.navbar').offsetHeight;

// Smooth scroll & close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const sectionTop = targetSection.offsetTop;
            window.scrollTo({
                top: sectionTop - navbarHeight,
                behavior: 'smooth'
            });
        }

        // Close mobile menu after click
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    });
});

// Toggle mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
