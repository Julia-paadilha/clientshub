document.addEventListener('DOMContentLoaded', () => {
  const navMobile = document.querySelector('.nav-mobile');
  const menuToggle = document.querySelector('.hamburger'); // combina com o CSS
  const careSection = document.querySelector('#care');
  const pathname = window.location.pathname.split('/').pop();

  // === Funções do menu ===
  function openNav() {
    navMobile.style.display = 'flex';          // garante que apareça
    setTimeout(() => {
      navMobile.classList.add('active');       // animação suave
      navMobile.style.pointerEvents = 'auto';  // deixa clicável
    }, 10);
  }

  function closeNav() {
    navMobile.classList.remove('active');      // animação suave de saída
    setTimeout(() => {
      navMobile.style.display = 'none';        // some após animação
      navMobile.style.pointerEvents = 'none';
    }, 300);
  }

  // === Clique no ícone hamburger ===
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (navMobile.classList.contains('active')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Fecha o menu ao clicar em qualquer link dentro dele
  document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });

  // === Lógica do Tattoo Care ===
  const careLinks = document.querySelectorAll('a[href="index.html#care"], a[href="#care"]');
  careLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (pathname === 'index.html' || pathname === '') {
        const care = document.querySelector('#care');
        if (care) {
          setTimeout(() => {
            care.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        }
      } else {
        sessionStorage.setItem('scrollToCare', 'true');
        window.location.href = 'index.html';
      }
    });
  });
	
	// === Lógica do Welcome ===
const welcomeLinks = document.querySelectorAll('a[href="index.html#home"], a[href="#home"]');

welcomeLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (pathname === 'index.html' || pathname === '') {
      const hero = document.querySelector('.hero');
      if (hero) {
        setTimeout(() => {
          hero.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    }
  });
});


  // Ao carregar a home, rola até o "care" se necessário
  if ((pathname === 'index.html' || pathname === '') && sessionStorage.getItem('scrollToCare') === 'true') {
    sessionStorage.removeItem('scrollToCare');
    setTimeout(() => {
      if (careSection) careSection.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }

  // === Botões Before / After Care ===
  const careButtons = document.querySelectorAll('.care-btn');
  const careContents = document.querySelectorAll('.care-content');

  careButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Remove 'active' de todos os botões e blocos
      careButtons.forEach(b => b.classList.remove('active'));
      careContents.forEach(c => c.classList.remove('active'));

      // Ativa o botão e bloco correspondente
      btn.classList.add('active');
      careContents[index].classList.add('active');
    });
  });

  // === Abrir automaticamente o menu mobile na home ===
  if (window.innerWidth <= 768 && (pathname === 'index.html' || pathname === '')) {
    setTimeout(() => {
      openNav();
      setTimeout(() => {
        closeNav();
      }, 1000);
    }, 300);
  }
});

// === GALLERY ===

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.gallery-container');
  const slides = Array.from(document.querySelectorAll('.gallery-slide'));
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');

  let currentIndex = 1; // começa no primeiro slide real
  let isTransitioning = false;

  // Clonar primeiro e último slide para loop contínuo
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  container.appendChild(firstClone);
  container.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(container.children);
  const totalSlides = allSlides.length;

  // Inicializa posição
  container.style.transform = `translateX(-${100 * currentIndex}%)`;

  function moveToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    container.style.transition = 'transform 0.5s ease';
    container.style.transform = `translateX(-${100 * index}%)`;
    currentIndex = index;
  }

  // Após a transição, corrigir posição se estiver nos clones
  container.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (allSlides[currentIndex].isSameNode(firstClone)) {
      container.style.transition = 'none';
      currentIndex = 1;
      container.style.transform = `translateX(-${100 * currentIndex}%)`;
    }
    if (allSlides[currentIndex].isSameNode(lastClone)) {
      container.style.transition = 'none';
      currentIndex = slides.length;
      container.style.transform = `translateX(-${100 * currentIndex}%)`;
    }
  });

  // Botões
  if (nextBtn) nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

  // Swipe para mobile
  let startX = 0;
  let isDragging = false;

  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  container.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) moveToSlide(currentIndex + 1);
      else moveToSlide(currentIndex - 1);
      isDragging = false;
    }
  });

  container.addEventListener('touchend', () => isDragging = false);
});

