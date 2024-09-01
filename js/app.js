// Selectors
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Build navigation menu
function buildNav() {
  sections.forEach(section => {
    const navItem = document.createElement('li');
    navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    navList.appendChild(navItem);
  });
}

// Highlight active section and nav item
function setActiveSection() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);
    
    // Check if the section is within the viewport
    const isInViewport = rect.top >= 0 && rect.top <= (window.innerHeight / 3);
    
    if (isInViewport) {
      section.classList.add('your-active-class');
      navLink.classList.add('active');
    } else {
      section.classList.remove('your-active-class');
      navLink.classList.remove('active');
    }
  });
}

// Smooth scroll to section
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.nodeName === 'A') {
    const sectionId = event.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });

    // Remove active class from all links
    const navLinks = document.querySelectorAll('.menu__link');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to the clicked link
    event.target.classList.add('active');
  }
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide scroll to top button
function toggleScrollTopBtn() {
  if (window.scrollY > 200) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
}

// Add event listeners
document.addEventListener('scroll', () => {
  setActiveSection();
  toggleScrollTopBtn();
});
navList.addEventListener('click', scrollToSection);
scrollTopBtn.addEventListener('click', scrollToTop);

// Initialize
buildNav();

// Make sections collapsible
sections.forEach(section => {
  const header = section.querySelector('h2');
  header.addEventListener('click', () => {
    section.classList.toggle('collapsed');
  });
});
