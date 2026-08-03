document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu__link');

  const toggleMenu = () => {
    burgerBtn.classList.toggle('is-active');
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  };

  burgerBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (burgerBtn.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu__link');

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let currentId = entry.target.getAttribute('id');

      let activeNavLink = document.querySelector(`[href="#${currentId}"]`);

      navLinks.forEach((link) => {
        link.classList.remove('active');
      });

      activeNavLink.classList.add('active');
    }
  });
};

const options = {
  threshold: 0.5,
};

const observer = new IntersectionObserver(callback, options);
sections.forEach((section) => observer.observe(section));

document.querySelectorAll('.projects__item').forEach((card) => {
  card.addEventListener('click', () => {
    window.open(card.dataset.link, '_blank');
  });
});

document.querySelectorAll('.projects__item-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
