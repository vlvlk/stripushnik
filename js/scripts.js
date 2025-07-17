document.addEventListener("DOMContentLoaded", () => {
  // Вставка меню
  const navHTML = `
    <nav>
       <a href="index.html">Главная</a>
       <a href="menu.html">Меню</a>
       <a href="staff.html">Персонал</a>
       <a href="shift.html">На смене</a>
       <a href="prices.html">Цены</a>
    </nav>
  `;
  const header = document.querySelector("header");
  if (header && !header.querySelector("nav")) {
    header.insertAdjacentHTML("beforeend", navHTML);
  }

  // Вставка футера
  const footer = document.querySelector("footer");
  if (!footer) {
    const footerHTML = `
      <footer>
        &copy; 2025 Pan iz Polshi. Эстетика страсти.
        <p>Ул. Пушкина, д. Колотушкина</p>
      </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }

  // Случайные фразы
  const phrases = [
    "Где грех становится искусством",
    "Ночь — наша сцена",
    "Каждое движение — как признание",
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

  // --- Логика оверлея карточки ---
  const cards = document.querySelectorAll('.card');

  const createOverlay = (card) => {
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

    // Закрытие по кнопке
    overlay.querySelector('.close-button').addEventListener('click', () => {
      overlay.remove();
    });

    // Закрытие по клику вне контента
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  };

  // Навешиваем обработчик клика на карточки
  cards.forEach(card => {
    card.addEventListener('click', () => {
      createOverlay(card);
    });
  });
});

// --- Логика автоскрытия хедера при скролле ---
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
