

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
          event.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
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
      });
  });

  // Optionally, add scroll event listener to update the active link on scroll
  window.addEventListener('scroll', () => {
      let current = '';
      links.forEach(link => {
          const section = document.querySelector(link.getAttribute('href'));
          const sectionTop = section.scrollY;
          if (scrollY >= sectionTop - 50) {
              current = link.getAttribute('href');
          }
      });

      links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === current) {
              link.classList.add('active');
          }
      });
  });
});

