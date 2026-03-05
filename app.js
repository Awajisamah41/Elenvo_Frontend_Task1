/* ═══════════════════════════════════════════════════
   AMAHJICODEC — app.js
   Handles: Data, Filtering, Search, Pagination, Rendering
═══════════════════════════════════════════════════ */

'use strict';

/* ─── Config ─────────────────────────────────────── */
const POSTS_PER_PAGE = 6;

/* ─── Data ────────────────────────────────────────── */
const posts = [
  {
    id: 1,
    title: "Building a REST API with Node.js & Express",
    category: "Tech",
    date: "May 14, 2024",
    description: "A practical walkthrough of creating a production-ready REST API — covering routing, middleware, error handling, and deployment to Railway.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
  },
  {
    id: 2,
    title: "48 Hours in Lisbon: A First-Timer's Guide",
    category: "Travel",
    date: "April 30, 2024",
    description: "Cobblestones, pastéis de nata, and rooftop views — here's how I spent a long weekend falling in love with Portugal's capital.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
  },
  {
    id: 3,
    title: "Suya at Home: The Ultimate Recipe",
    category: "Food",
    date: "April 18, 2024",
    description: "Charred, smoky, and loaded with suya spice — this recipe nails the West African street-food classic right in your backyard or kitchen grill.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
  },
  {
    id: 4,
    title: "Why I Left My 9-to-5 to Code Full-Time",
    category: "Life",
    date: "April 5, 2024",
    description: "Burnout, savings spreadsheets, and a leap of faith — the honest story of going independent and what I wish I'd known before quitting.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
  },
  {
    id: 5,
    title: "React Server Components: A Deep Dive",
    category: "Tech",
    date: "March 28, 2024",
    description: "RSC changes how we think about data fetching and rendering. I spent two weeks building with them so you don't have to start from zero.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80",
  },
  {
    id: 6,
    title: "Backpacking Across Northern Morocco",
    category: "Travel",
    date: "March 15, 2024",
    description: "From the blue alleys of Chefchaouen to the medina chaos of Fès — a two-week solo trip through the north of Morocco on a budget.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
  },
  {
    id: 7,
    title: "Mastering CSS Grid in 2024",
    category: "Tech",
    date: "March 3, 2024",
    description: "Grid is more powerful than most developers realise. Here are the patterns I keep coming back to, with interactive demos and real-world examples.",
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&q=80",
  },
  {
    id: 8,
    title: "Making Jollof Rice — The Definitive Method",
    category: "Food",
    date: "February 22, 2024",
    description: "Party jollof, smoky bottom and all. After years of testing, I'm convinced this is the version that ends all arguments.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
  },
  {
    id: 9,
    title: "On Slowing Down: Notes from a Digital Minimalist",
    category: "Life",
    date: "February 10, 2024",
    description: "I deleted most of my apps for 30 days. What I found wasn't silence — it was clarity. Here's what changed and what didn't.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  },
  {
    id: 10,
    title: "TypeScript Generics Explained Simply",
    category: "Tech",
    date: "January 30, 2024",
    description: "Generics terrified me for months. Now they're one of my favourite TypeScript features. Let me show you why they're worth learning.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
  },
  {
    id: 11,
    title: "Seoul Street Food: A Weeklong Diary",
    category: "Travel",
    date: "January 18, 2024",
    description: "Tteokbokki, hotteok, and more banchan than I could count — seven days eating my way through the markets of Seoul.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: 12,
    title: "How I Read 52 Books in a Year",
    category: "Life",
    date: "January 6, 2024",
    description: "Not a flex — a system. Here's how I restructured my mornings, commutes, and lunch breaks to actually finish a book a week.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
  },
];

/* ─── State ───────────────────────────────────────── */
let state = {
  category: 'All',
  query:    '',
  page:     1,
};

/* ─── DOM Refs ────────────────────────────────────── */
const grid        = document.getElementById('blogGrid');
const emptyState  = document.getElementById('emptyState');
const pagination  = document.getElementById('pagination');
const resultsCount = document.getElementById('resultsCount');
const searchInput = document.getElementById('searchInput');
const filterPills = document.getElementById('filterPills');

/* ─── Filter Logic ────────────────────────────────── */
function getFiltered() {
  return posts.filter(post => {
    const matchCat = state.category === 'All' || post.category === state.category;
    const matchQ   = post.title.toLowerCase().includes(state.query.toLowerCase()) ||
                     post.description.toLowerCase().includes(state.query.toLowerCase());
    return matchCat && matchQ;
  });
}

/* ─── Card Template ───────────────────────────────── */
function createCard(post, index) {
  const card = document.createElement('article');
  card.className = 'card';
  card.style.animationDelay = `${index * 60}ms`;

  card.innerHTML = `
    <div class="card-image-wrap">
      <img
        src="${post.image}"
        alt="${post.title}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&q=80'"
      />
      <span class="card-category-badge badge-${post.category}">${post.category}</span>
    </div>
    <div class="card-body">
      <p class="card-date">${post.date}</p>
      <h2 class="card-title">${post.title}</h2>
      <p class="card-desc">${post.description}</p>
      <a href="#" class="card-read-more" aria-label="Read more: ${post.title}">
        Read more →
      </a>
    </div>
  `;

  return card;
}

/* ─── Render Grid ─────────────────────────────────── */
function renderGrid() {
  const filtered = getFiltered();
  const total    = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));

  // Clamp page
  if (state.page > totalPages) state.page = totalPages;

  const start  = (state.page - 1) * POSTS_PER_PAGE;
  const slice  = filtered.slice(start, start + POSTS_PER_PAGE);

  // Clear grid
  grid.innerHTML = '';

  if (total === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    pagination.innerHTML = '';
    resultsCount.textContent = 'No posts found';
    return;
  }

  grid.style.display = 'grid';
  emptyState.style.display = 'none';

  slice.forEach((post, i) => {
    grid.appendChild(createCard(post, i));
  });

  // Results count
  const end = Math.min(start + POSTS_PER_PAGE, total);
  resultsCount.textContent = `Showing ${start + 1}–${end} of ${total} post${total !== 1 ? 's' : ''}`;

  renderPagination(totalPages);
}

/* ─── Render Pagination ───────────────────────────── */
function renderPagination(totalPages) {
  pagination.innerHTML = '';

  if (totalPages <= 1) return;

  // Prev button
  const prev = document.createElement('button');
  prev.className  = 'page-btn prev-next';
  prev.textContent = '← Prev';
  prev.disabled   = state.page === 1;
  prev.addEventListener('click', () => goToPage(state.page - 1));
  pagination.appendChild(prev);

  // Page numbers
  for (let p = 1; p <= totalPages; p++) {
    const btn = document.createElement('button');
    btn.className  = 'page-btn' + (p === state.page ? ' active' : '');
    btn.textContent = p;
    btn.addEventListener('click', () => goToPage(p));
    pagination.appendChild(btn);
  }

  // Next button
  const next = document.createElement('button');
  next.className  = 'page-btn prev-next';
  next.textContent = 'Next →';
  next.disabled   = state.page === totalPages;
  next.addEventListener('click', () => goToPage(state.page + 1));
  pagination.appendChild(next);
}

/* ─── Go To Page ──────────────────────────────────── */
function goToPage(page) {
  state.page = page;
  renderGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Event: Filter Pills ─────────────────────────── */
filterPills.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill');
  if (!btn) return;

  filterPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  state.category = btn.dataset.category;
  state.page     = 1;
  renderGrid();
});

/* ─── Event: Search ───────────────────────────────── */
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.query = searchInput.value.trim();
    state.page  = 1;
    renderGrid();
  }, 220);
});

/* ─── Init ────────────────────────────────────────── */
renderGrid();
