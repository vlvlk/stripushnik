document.addEventListener("DOMContentLoaded", () => {
  // --- Вставка меню и бургера ---
  const navHTML = `
    <nav class="nav-menu" id="nav-menu">
      <a href="index.html">Главная</a>
      <a href="menu.html">Меню</a>
      <a href="staff.html">Персонал</a>
      <a href="shift.html">На смене</a>
      <a href="prices.html">Цены</a>
    </nav>
    <button class="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav-menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  `;

  const header = document.querySelector("header");
  if (header && !header.querySelector("nav")) {
    header.insertAdjacentHTML("beforeend", navHTML);
  }

  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');

  if (burger && navMenu) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = burger.classList.toggle('open');
      navMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
      }
    });
  }

  // --- Вставка футера ---
  if (!document.querySelector("footer")) {
    const footerHTML = `
      <footer>
        &copy; 2025 VIP Club, стриптиз-клуб
        <p>Г. Казань, Лево-Булачная улица, 50</p>
      </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }

  // --- Случайные фразы ---
  const phrases = [
    "Ночь — наша сцена",
    "Ты ещё не был здесь…",
    "Эстетика без вульгарности",
    "Тени, свет и тело",
    "Магия взгляда и пластики",
    "Музыка страсти",
    "Пьянящее прикосновение",
    "Больше, чем шоу"
  ];

  const phrase = document.getElementById("randomPhrase");
  if (phrase) {
    phrase.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }

  // --- Оверлей карточек ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const description = card.querySelector('.card-description');
      if (!img || !description) return;

      const overlay = document.createElement('div');
      overlay.classList.add('card-overlay');
      overlay.innerHTML = `
        <button class="close-button" aria-label="Закрыть">&times;</button>
        <img src="${img.src}" alt="">
        <div class="description-text">${description.innerHTML}</div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('.close-button').addEventListener('click', () => overlay.remove());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
      });
    });
  });
});

// --- Скролл: автоскрытие хедера ---
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let currentOffset = 0;

window.addEventListener('scroll', () => {
  const delta = window.scrollY - lastScrollY;
  const maxOffset = header.offsetHeight;

  currentOffset += delta;
  currentOffset = Math.max(0, Math.min(currentOffset, maxOffset));
  header.style.transform = `translateY(${-currentOffset}px)`;

  lastScrollY = window.scrollY;

  if (window.scrollY === 0) {
    currentOffset = 0;
    header.style.transform = `translateY(0)`;
  }
});
