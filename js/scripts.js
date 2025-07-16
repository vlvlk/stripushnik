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

  // --- Логика увеличения карточек и показа описания ---
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Убираем класс expanded у всех карточек кроме текущей
      cards.forEach(c => {
        if (c !== card) c.classList.remove('expanded');
      });
      // Переключаем класс у текущей
      card.classList.toggle('expanded');
    });
  });
});

const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let currentOffset = 0;

window.addEventListener('scroll', () => {
  const delta = window.scrollY - lastScrollY;

  // Получаем актуальную высоту хедера
  const maxOffset = header.offsetHeight;

  currentOffset += delta;
  currentOffset = Math.max(0, Math.min(currentOffset, maxOffset));

  header.style.transform = `translateY(${-currentOffset}px)`;

  lastScrollY = window.scrollY;
});

// Если прокручиваем в самый верх
window.addEventListener('scroll', () => {
  if (window.scrollY === 0) {
    currentOffset = 0;
    header.style.transform = `translateY(0)`;
  }
});
