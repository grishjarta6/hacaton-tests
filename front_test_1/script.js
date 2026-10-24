/* ===================== ДАННЫЕ КАРТОЧЕК ===================== */
const CARDS = [
  { title: 'Остров Бали',      short: 'Тропический рай',      more: 'Белые пляжи, сёрфинг, храмы на закате и уникальная культура. Идеально для активного отдыха и духовных практик.' },
  { title: 'Мальдивы',         short: 'Кристальные воды',     more: 'Уединённые виллы над водой, коралловые рифы и невероятные закаты. Место для романтического отдыха вдвоём.' },
  { title: 'Санторини',        short: 'Бело-синие купола',    more: 'Живописные деревни на склонах вулкана, лучшие виды на Эгейское море и аутентичная греческая кухня.' },
  { title: 'Таиланд',          short: 'Улыбки Сиама',         more: 'Буддийские храмы, шумные рынки, экзотическая кухня и длинные песчаные пляжи на любой вкус.' },
  { title: 'Хорватия',         short: 'Жемчужина Адриатики',  more: 'Старинные города с черепичными крышами, чистейшее море и сотни живописных островов для путешествий.' },
  { title: 'Исландия',         short: 'Земля огня и льда',    more: 'Водопады, гейзеры, северное сияние и ледники. Путешествие в мир невероятной северной природы.' },
  { title: 'Япония',           short: 'Восток и техника',     more: 'Сакура весной, древние храмы Киото, неоновые улицы Токио и удивительная кухня на каждом шагу.' },
  { title: 'Италия',           short: 'Дольче вита',          more: 'Колизей, каналы Венеции, тосканские виноградники и лучшая в мире паста. Классика европейского отдыха.' }
];

let counter = 0;

/* ===================== СОЗДАНИЕ КАРТОЧКИ ===================== */
function createCard() {
  const data = CARDS[counter % CARDS.length];
  const seed = ++counter;

  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-photo-wrap">
      <img class="card-photo"
           src="https://picsum.photos/seed/${seed}/400/300"
           alt=""
           loading="lazy"
           onerror="this.style.opacity=0">
    </div>
    <div class="card-desc">
      <h3>${data.title}</h3>
      <p class="short">${data.short}</p>
      <p class="more">${data.more}</p>
    </div>
  `;
  return card;
}

const grid = document.getElementById('grid');

function addCards(n) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) frag.appendChild(createCard());
  grid.appendChild(frag);
}

/* Первая порция */
addCards(10);

/* ===================== БЕСКОНЕЧНЫЙ СКРОЛЛ ===================== */
let loading = false;

function maybeLoadMore() {
  if (loading) return;
  const scrollBottom = window.innerHeight + window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  if (scrollBottom >= docHeight - 700) {
    loading = true;
    setTimeout(() => {
      addCards(6);
      loading = false;
    }, 250);
  }
}

window.addEventListener('scroll', maybeLoadMore, { passive: true });
window.addEventListener('resize', maybeLoadMore);

/* ===================== СВОРАЧИВАНИЕ ОКОН ===================== */
document.querySelectorAll('[data-toggle]').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const win = document.getElementById(btn.dataset.toggle);
    if (!win) return;
    win.classList.toggle('collapsed');
  });
});