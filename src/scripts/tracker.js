// ---------- DATA ----------
const BOOKS = [
  ["Gênesis", 50, "AT", "Pentateuco"], ["Êxodo", 40, "AT", "Pentateuco"], ["Levítico", 27, "AT", "Pentateuco"],
  ["Números", 36, "AT", "Pentateuco"], ["Deuteronômio", 34, "AT", "Pentateuco"],
  ["Josué", 24, "AT", "Históricos"], ["Juízes", 21, "AT", "Históricos"], ["Rute", 4, "AT", "Históricos"],
  ["1 Samuel", 31, "AT", "Históricos"], ["2 Samuel", 24, "AT", "Históricos"], ["1 Reis", 22, "AT", "Históricos"],
  ["2 Reis", 25, "AT", "Históricos"], ["1 Crônicas", 29, "AT", "Históricos"], ["2 Crônicas", 36, "AT", "Históricos"],
  ["Esdras", 10, "AT", "Históricos"], ["Neemias", 13, "AT", "Históricos"], ["Ester", 10, "AT", "Históricos"],
  ["Jó", 42, "AT", "Poéticos"], ["Salmos", 150, "AT", "Poéticos"], ["Provérbios", 31, "AT", "Poéticos"],
  ["Eclesiastes", 12, "AT", "Poéticos"], ["Cantares", 8, "AT", "Poéticos"],
  ["Isaías", 66, "AT", "Profetas Maiores"], ["Jeremias", 52, "AT", "Profetas Maiores"],
  ["Lamentações", 5, "AT", "Profetas Maiores"], ["Ezequiel", 48, "AT", "Profetas Maiores"], ["Daniel", 12, "AT", "Profetas Maiores"],
  ["Oséias", 14, "AT", "Profetas Menores"], ["Joel", 3, "AT", "Profetas Menores"], ["Amós", 9, "AT", "Profetas Menores"],
  ["Obadias", 1, "AT", "Profetas Menores"], ["Jonas", 4, "AT", "Profetas Menores"], ["Miquéias", 7, "AT", "Profetas Menores"],
  ["Naum", 3, "AT", "Profetas Menores"], ["Habacuque", 3, "AT", "Profetas Menores"], ["Sofonias", 3, "AT", "Profetas Menores"],
  ["Ageu", 2, "AT", "Profetas Menores"], ["Zacarias", 14, "AT", "Profetas Menores"], ["Malaquias", 4, "AT", "Profetas Menores"],
  ["Mateus", 28, "NT", "Evangelhos"], ["Marcos", 16, "NT", "Evangelhos"], ["Lucas", 24, "NT", "Evangelhos"], ["João", 21, "NT", "Evangelhos"],
  ["Atos", 28, "NT", "História"],
  ["Romanos", 16, "NT", "Cartas Paulinas"], ["1 Coríntios", 16, "NT", "Cartas Paulinas"], ["2 Coríntios", 13, "NT", "Cartas Paulinas"],
  ["Gálatas", 6, "NT", "Cartas Paulinas"], ["Efésios", 6, "NT", "Cartas Paulinas"], ["Filipenses", 4, "NT", "Cartas Paulinas"],
  ["Colossenses", 4, "NT", "Cartas Paulinas"], ["1 Tessalonicenses", 5, "NT", "Cartas Paulinas"], ["2 Tessalonicenses", 3, "NT", "Cartas Paulinas"],
  ["1 Timóteo", 6, "NT", "Cartas Paulinas"], ["2 Timóteo", 4, "NT", "Cartas Paulinas"], ["Tito", 3, "NT", "Cartas Paulinas"], ["Filemom", 1, "NT", "Cartas Paulinas"],
  ["Hebreus", 13, "NT", "Cartas Gerais"], ["Tiago", 5, "NT", "Cartas Gerais"], ["1 Pedro", 5, "NT", "Cartas Gerais"],
  ["2 Pedro", 3, "NT", "Cartas Gerais"], ["1 João", 5, "NT", "Cartas Gerais"], ["2 João", 1, "NT", "Cartas Gerais"],
  ["3 João", 1, "NT", "Cartas Gerais"], ["Judas", 1, "NT", "Cartas Gerais"],
  ["Apocalipse", 22, "NT", "Profecia"]
].map(b => ({ name: b[0], chapters: b[1], testament: b[2], category: b[3] }));

const TOTAL_CHAPTERS = BOOKS.reduce((s, b) => s + b.chapters, 0); // 1189
const CATEGORY_ORDER = ["Pentateuco", "Históricos", "Poéticos", "Profetas Maiores", "Profetas Menores",
  "Evangelhos", "História", "Cartas Paulinas", "Cartas Gerais", "Profecia"];

const LEVELS = [
  "Peregrino Iniciante", "Buscador", "Discípulo", "Estudioso da Palavra", "Escriba Aprendiz",
  "Guardião da Palavra", "Escriba", "Sábio das Escrituras", "Mestre da Palavra", "Sentinela do Templo",
  "Guardião da Aliança", "Doutor da Lei", "Ancião das Escrituras"
];

const ACHIEVEMENTS = [
  { id: "first", icon: "📖", title: "Primeiro Passo", desc: "Leia seu primeiro capítulo.", cond: (s) => s.total >= 1 },
  { id: "hundred", icon: "💯", title: "Centena de Capítulos", desc: "Leia 100 capítulos.", cond: (s) => s.total >= 100 },
  { id: "genesis", icon: "🌱", title: "No Princípio", desc: "Conclua o livro de Gênesis.", cond: (s) => s.bookDone("Gênesis") },
  {
    id: "gospel", icon: "✝️", title: "Boas Novas", desc: "Conclua um dos quatro Evangelhos.",
    cond: (s) => ["Mateus", "Marcos", "Lucas", "João"].some(b => s.bookDone(b))
  },
  { id: "psalms", icon: "🎵", title: "Saltério Completo", desc: "Leia todos os 150 Salmos.", cond: (s) => s.bookDone("Salmos") },
  { id: "halfway", icon: "⛰️", title: "Meio Caminho", desc: "Leia metade da Bíblia.", cond: (s) => s.total >= Math.ceil(TOTAL_CHAPTERS / 2) },
  { id: "at", icon: "📜", title: "Antigo Testamento Completo", desc: "Conclua todo o Antigo Testamento.", cond: (s) => s.testamentDone("AT") },
  { id: "nt", icon: "✨", title: "Novo Testamento Completo", desc: "Conclua todo o Novo Testamento.", cond: (s) => s.testamentDone("NT") },
  { id: "streak7", icon: "🔥", title: "Sequência de 7 dias", desc: "Leia por 7 dias seguidos.", cond: (s) => s.streak >= 7 },
  { id: "streak30", icon: "🕯️", title: "Sequência de 30 dias", desc: "Leia por 30 dias seguidos.", cond: (s) => s.streak >= 30 },
  { id: "full", icon: "👑", title: "Bíblia Completa", desc: "Leia todos os 1.189 capítulos.", cond: (s) => s.total >= TOTAL_CHAPTERS },
];

// ---------- STATE ----------
const STORAGE_KEY = "bible-tracker-state-v1";
let state = { read: {}, streak: { count: 0, lastDate: null } };
let activeTestament = "AT";
let searchTerm = "";
let saveTimer = null;

function keyFor(book, ch) { return book + "-" + ch; }

function todayStr() { return new Date().toDateString(); }
function daysBetween(a, b) {
  const MS = 86400000;
  const da = new Date(a), db = new Date(b);
  da.setHours(0, 0, 0, 0); db.setHours(0, 0, 0, 0);
  return Math.round((db - da) / MS);
}

function totalRead() { return Object.values(state.read).filter(Boolean).length; }
function chaptersReadInBook(name) {
  const b = BOOKS.find(x => x.name === name);
  let c = 0;
  for (let i = 1; i <= b.chapters; i++) { if (state.read[keyFor(name, i)]) c++; }
  return c;
}
function bookDone(name) {
  const b = BOOKS.find(x => x.name === name);
  return chaptersReadInBook(name) === b.chapters;
}
function testamentDone(t) {
  return BOOKS.filter(b => b.testament === t).every(b => bookDone(b.name));
}
function booksCompletedCount() {
  return BOOKS.filter(b => bookDone(b.name)).length;
}

function statsSnapshot() {
  return { total: totalRead(), streak: state.streak.count, bookDone, testamentDone };
}

function levelInfo(total) {
  const lvl = Math.min(Math.floor(total / 50) + 1, 99);
  const idx = Math.min(lvl - 1, LEVELS.length - 1);
  return { lvl, title: LEVELS[idx] };
}

// ---------- PERSISTENCE ----------
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      state.read = parsed.read || {};
      state.streak = parsed.streak || { count: 0, lastDate: null };
    }
  } catch (e) {
    console.error("Progresso salvo corrompido, iniciando do zero:", e);
  }
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, 300);
}

// ---------- ACTIONS ----------
function toggleChapter(bookName, chNum) {
  const k = keyFor(bookName, chNum);
  const nowRead = !state.read[k];
  if (nowRead) { state.read[k] = true; registerActivity(); }
  else { delete state.read[k]; }
  scheduleSave();
  renderAll();
}

function registerActivity() {
  const today = todayStr();
  if (state.streak.lastDate === today) return; // already counted today
  if (state.streak.lastDate) {
    const diff = daysBetween(state.streak.lastDate, today);
    state.streak.count = (diff === 1) ? state.streak.count + 1 : 1;
  } else {
    state.streak.count = 1;
  }
  state.streak.lastDate = today;
}

function resetAll() {
  if (!confirm("Isso vai apagar todo o seu progresso de leitura. Tem certeza?")) return;
  state = { read: {}, streak: { count: 0, lastDate: null } };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
}

// ---------- RENDER ----------
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderRing() {
  const total = totalRead();
  const pct = total / TOTAL_CHAPTERS;
  const r = 120, C = 2 * Math.PI * r;
  const ring = document.getElementById("ringFg");
  ring.setAttribute("stroke-dasharray", C.toFixed(1));
  ring.setAttribute("stroke-dashoffset", (C * (1 - pct)).toFixed(1));
  document.getElementById("pctText").textContent = Math.round(pct * 100) + "%";
  document.getElementById("fracText").textContent = total + " / " + TOTAL_CHAPTERS + " capítulos";
  const { lvl, title } = levelInfo(total);
  document.getElementById("levelText").textContent = "Nível " + lvl + " · " + title;
  document.getElementById("streakStat").textContent = state.streak.count;
  document.getElementById("booksStat").textContent = booksCompletedCount() + " / 66";
  const unlocked = ACHIEVEMENTS.filter(a => a.cond(statsSnapshot())).length;
  document.getElementById("badgesStat").textContent = unlocked + " / " + ACHIEVEMENTS.length;
}

function renderPetals() {
  const g = document.getElementById("petals");
  if (g.childElementCount) return; // draw once
  const n = 12;
  for (let i = 0; i < n; i++) {
    const ang = (360 / n) * i;
    const el = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    el.setAttribute("cx", "150"); el.setAttribute("cy", "70");
    el.setAttribute("rx", "14"); el.setAttribute("ry", "38");
    el.setAttribute("fill", "none");
    el.setAttribute("stroke", "#d4a94a");
    el.setAttribute("stroke-width", "1");
    el.setAttribute("transform", "rotate(" + ang + " 150 150)");
    g.appendChild(el);
  }
}

function renderBooks() {
  const container = document.getElementById("bookContainer");
  const term = normalize(searchTerm.trim());
  const cats = CATEGORY_ORDER.filter(c => {
    return BOOKS.some(b => b.category === c && b.testament === activeTestament);
  });

  let html = "";
  let anyResult = false;

  cats.forEach(cat => {
    const books = BOOKS.filter(b => b.category === cat && b.testament === activeTestament &&
      (term === "" || normalize(b.name).includes(term)));
    if (books.length === 0) return;
    anyResult = true;
    html += '<div class="category"><h2>' + cat + '</h2>';
    books.forEach(b => {
      const read = chaptersReadInBook(b.name);
      const pct = Math.round((read / b.chapters) * 100);
      const done = read === b.chapters;
      html += '<details class="book' + (done ? ' book-complete' : '') + '" data-book="' + b.name + '">';
      html += '<summary>';
      html += '<span class="chev">▶</span>';
      html += '<span class="book-name">' + b.name + '</span>';
      html += '<span class="mini-bar"><span class="mini-fill" style="width:' + pct + '%"></span></span>';
      html += '<span class="book-meta">' + read + '/' + b.chapters + '</span>';
      html += '</summary>';
      html += '<div class="chapters">';
      for (let i = 1; i <= b.chapters; i++) {
        const isRead = !!state.read[keyFor(b.name, i)];
        html += '<button type="button" class="ch-btn' + (isRead ? ' read' : '') + '" data-book="' + b.name + '" data-ch="' + i + '" aria-pressed="' + isRead + '">' + i + '</button>';
      }
      html += '</div></details>';
    });
    html += '</div>';
  });

  if (!anyResult) {
    html = '<p class="empty-msg">Nenhum livro encontrado para "' + searchTerm + '".</p>';
  }

  // preserve open/closed state of details across re-render
  const openBooks = new Set(
    Array.from(container.querySelectorAll("details.book[open]")).map(d => d.dataset.book)
  );
  container.innerHTML = html;
  container.querySelectorAll("details.book").forEach(d => {
    if (openBooks.has(d.dataset.book)) d.setAttribute("open", "");
  });

  container.querySelectorAll(".ch-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleChapter(btn.dataset.book, parseInt(btn.dataset.ch, 10));
    });
  });
}

function renderAchievements() {
  const grid = document.getElementById("achGrid");
  const snap = statsSnapshot();
  grid.innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = a.cond(snap);
    return '<div class="ach' + (unlocked ? ' unlocked' : '') + '">' +
      '<div class="ach-icon">' + a.icon + '</div>' +
      '<div><div class="ach-title">' + a.title + '</div><div class="ach-desc">' + a.desc + '</div></div>' +
      '</div>';
  }).join("");
}

function renderAll() {
  renderRing();
  renderBooks();
  renderAchievements();
}

// ---------- EVENTS ----------
document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  activeTestament = btn.dataset.t;
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t === btn));
  renderBooks();
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderBooks();
});

document.getElementById("resetBtn").addEventListener("click", resetAll);

// ---------- INIT ----------
renderPetals();
loadState();
renderAll();
document.getElementById("loadingScreen").style.display = "none";
