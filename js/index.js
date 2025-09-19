const earthSection = document.querySelector(".earth-section");
const earth = document.getElementById("earthPNG");
const hawa = document.getElementById("hawa");
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
  earth.style.marginTop = scrollY > 0 ? "150px" : "0px";

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
  link.addEventListener('click', function (e) {
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

document.addEventListener('DOMContentLoaded', () => {

  // Minimum 2 seconds delay before switching to slow rotation
  const minFastRotation = 0; // 2 seconds in ms
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(minFastRotation - elapsed, 0);

    setTimeout(() => {
      hawa.classList.add('visible') // normal slow rotation
    }, remaining);
  });
  const earthSection = document.getElementById('earth-section');
  setTimeout(() => {
    navbarLink.classList.add('active');
    earthSection.classList.add('active');
  }, 100); // slight delay to allow transition
});

const memberCards = document.querySelectorAll('.member-card');
const projectCards = document.querySelectorAll('.project-card');
const formContainers = document.querySelectorAll('.form-container'); // new

// Keep track of which member cards have been triggered individually
let memberTriggered = new Array(memberCards.length).fill(false);

function revealCards() {
  const windowHeight = window.innerHeight;
  const triggerBottom = windowHeight * 0.8;

  // Member cards
  memberCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (!memberTriggered[index] && rect.top < triggerBottom && rect.bottom > 0) {
      memberTriggered[index] = true;

      setTimeout(() => {
        card.classList.add('visible');
        card.classList.add('sweep'); // Only member cards get sweep
      }, 0);
    }
  });

  // Project cards
  projectCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= windowHeight * 0.85 && rect.bottom > 0) {
      card.classList.add('visible');
    }
  });

  // Form containers
  formContainers.forEach(form => {
    const rect = form.getBoundingClientRect();
    if (rect.top <= windowHeight * 0.85 && rect.bottom > 0) {
      form.classList.add('visible');
    }
  });
}

// Listen to scroll and load events
window.addEventListener('scroll', revealCards);
window.addEventListener('load', revealCards);

const faders = document.querySelectorAll('.fade-in');

function fadeInOnScroll() {
  const windowHeight = window.innerHeight;

  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= windowHeight * 0.85 && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
}

// Trigger on scroll and page load
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);
