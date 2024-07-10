let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    navbar.style.top = '-200px'; 
    navbar.classList.add('scrolled'); 
  } else {
    navbar.style.top = '0';
    if (currentScroll === 0) {
      navbar.classList.remove('scrolled'); 
    }
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('#navbar a');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });

        links.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      } else {
        window.location.href = this.getAttribute('href');
      }
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    links.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 50) {
          current = link.getAttribute('href');
        }
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
