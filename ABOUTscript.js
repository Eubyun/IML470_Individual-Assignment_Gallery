// script.js

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY|| document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop) {
    // Downscroll
    navbar.style.top = '-200px'; // Adjust based on navbar height
    navbar.classList.add('scrolled'); // Add background color on scroll
  } else {
    // Upscroll
    navbar.style.top = '0';
    if (currentScroll === 0) {
      navbar.classList.remove('scrolled'); // Remove background color at top
    }
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});


document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#navbar a');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      const isSamePageLink = href.startsWith('#') || href.includes(window.location.pathname);

      if (isSamePageLink) {
        event.preventDefault();
        const targetId = href.includes('#') ? href.split('#')[1] : null;
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }

        // Remove 'active' class from all links and add to the clicked one
        links.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Optionally, add scroll event listener to update the active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    links.forEach(link => {
      const href = link.getAttribute('href');
      const isSamePageLink = href.startsWith('#') || href.includes(window.location.pathname);

      if (isSamePageLink) {
        const targetId = href.includes('#') ? href.split('#')[1] : null;
        const section = document.getElementById(targetId);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight - 50) {
            current = `#${targetId}`;
          }
        }
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href');
      const isSamePageLink = href.startsWith('#') || href.includes(window.location.pathname);

      if (isSamePageLink) {
        link.classList.remove('active');
        if (href === current || (href.includes('#') && href.split('#')[1] === current.substring(1))) {
          link.classList.add('active');
        }
      }
    });
  });
});
