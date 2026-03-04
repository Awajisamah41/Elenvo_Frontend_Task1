import { useState, useMemo } from "react";

const POSTS_PER_PAGE = 6;

const POSTS = [
  {
    id: 1, category: "Tech",
    title: "The Quiet Revolution of Local-First Software",
    description: "Your data, on your machine. No subscriptions, no servers, no surveillance. A new breed of apps is betting that users want control back — and they might be right.",
    date: "Feb 18, 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    featured: true,
  },
  {
    id: 2, category: "Travel",
    title: "Thirty Days Alone in the Faroe Islands",
    description: "No plan, no Wi-Fi, no agenda. Just volcanic cliffs, endless fog, and an island that teaches you what stillness actually feels like.",
    date: "Jan 30, 2025",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278bc?w=600&q=80",
  },
  {
    id: 3, category: "Food",
    title: "Why Every Kitchen Needs a Clay Pot",
    description: "Slow heat, earthy fragrance, and flavors you can't replicate with stainless steel. An ode to the oldest cooking vessel humanity has ever used.",
    date: "Jan 14, 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
  },
  {
    id: 4, category: "Tech",
    title: "I Replaced My SaaS Stack with Open-Source Tools",
    description: "Notion → Obsidian. Figma → Penpot. Vercel → Coolify. Six months later, my monthly bill dropped to $8 and I'm more productive than ever.",
    date: "Dec 22, 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=600&q=80",
  },
  {
    id: 5, category: "Travel",
    title: "The Art of Arriving Slow: Overnight Trains in Europe",
    description: "There's a specific joy in watching a country wake up through a train window. Here's how I planned three weeks of rail travel across six countries.",
    date: "Dec 5, 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
  },
  {
    id: 6, category: "Food",
    title: "Making Sourdough in a Tiny Apartment Kitchen",
    description: "No stand mixer, no Dutch oven, no 1000sqft farmhouse. Just a small apartment, a jar of wild yeast, and a lot of patience.",
    date: "Nov 28, 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: 7, category: "Tech",
    title: "Rethinking Notifications: A Week in Do Not Disturb",
    description: "What happens when you turn off every alert for seven days? Spoiler: the world doesn't end, but your focus might actually return.",
    date: "Nov 10, 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  },
  {
    id: 8, category: "Travel",
    title: "Eating My Way Through Oaxaca",
    description: "Tlayudas at midnight, mezcal at noon, and the best mole negro of my life from a woman who learned from her grandmother. A food-first travel diary.",
    date: "Oct 19, 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    id: 9, category: "Food",
    title: "The Science of a Perfect Fried Egg",
    description: "Butter temperature, pan material, steam vs. no steam — it turns out the humble fried egg has more physics behind it than you'd ever guess.",
    date: "Oct 3, 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
  },
];

const CATEGORIES = ["All", "Tech", "Travel", "Food"];

const categoryColors = {
  Tech: { bg: "bg-sky-400/15", text: "text-sky-300", dot: "#7dd3fc" },
  Travel: { bg: "bg-emerald-400/15", text: "text-emerald-300", dot: "#6ee7b7" },
  Food: { bg: "bg-amber-400/15", text: "text-amber-300", dot: "#fcd34d" },
};

function CategoryBadge({ category, small = false }) {
  const c = categoryColors[category] || { bg: "bg-zinc-700", text: "text-zinc-300" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide ${c.bg} ${c.text} ${small ? "text-[10px] px-2.5 py-0.5" : "text-xs px-3 py-1"}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
      {category}
    </span>
  );
}

function PostCard({ post, index }) {
  return (
    <article
      className="group relative flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} small />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3 font-mono">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>

        <h2 className="text-base font-bold text-zinc-100 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {post.title}
        </h2>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {post.description}
        </p>

        <button className="mt-4 self-start text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors group/btn">
          Read more
          <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = POSTS;
    if (activeCategory !== "All") result = result.filter(p => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategory = (cat) => { setActiveCategory(cat); setPage(1); };
  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        .animate-card { animation: fadeUp .4s ease both; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-sm">
              A
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Alara&nbsp;Notes
              </span>
              <span className="hidden sm:inline text-zinc-600 text-sm ml-3">Writing about tech, travel & food</span>
            </div>
          </div>
          <nav className="flex items-center gap-5 text-sm text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors hidden sm:inline">Newsletter</a>
            <button className="bg-amber-400 text-zinc-950 font-semibold text-xs px-4 py-2 rounded-full hover:bg-amber-300 transition-colors">
              Subscribe
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-5 pt-16 pb-10">
        <div className="relative">
          {/* Decorative grain */}
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />
          <p className="text-xs font-mono text-amber-400/80 tracking-[0.2em] uppercase mb-3">
            ✦ Personal Journal
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.0] tracking-tight mb-4 max-w-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Stories worth<br /><em className="text-amber-400 not-italic">sitting with.</em>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg font-light">
            Long reads on technology, wandering, and cooking — written slowly, published rarely, meant to last.
          </p>
        </div>
      </section>

      {/* ── CONTROLS ── */}
      <section className="max-w-6xl mx-auto px-5 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-lg shadow-amber-400/20"
                    : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-xs opacity-60">
                  {cat === "All" ? POSTS.length : POSTS.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search posts…"
              className="w-56 bg-zinc-900 border border-zinc-700 rounded-full pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20 transition-all font-mono"
            />
            {search && (
              <button onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs">✕</button>
            )}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <main className="max-w-6xl mx-auto px-5 pb-16">
        {paginated.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <div className="text-5xl mb-4">◎</div>
            <p className="text-lg font-medium">No posts found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((post, i) => (
              <div key={post.id} className="animate-card" style={{ animationDelay: `${i * 70}ms` }}>
                <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Prev
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                    page === i + 1
                      ? "bg-amber-400 text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Result count */}
        {filtered.length > 0 && (
          <p className="text-center mt-5 text-xs text-zinc-600 font-mono">
            Showing {Math.min((page - 1) * POSTS_PER_PAGE + 1, filtered.length)}–{Math.min(page * POSTS_PER_PAGE, filtered.length)} of {filtered.length} posts
          </p>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-zinc-950 font-black text-xs">A</div>
            <span className="font-medium text-zinc-400" style={{ fontFamily: "'Playfair Display', serif" }}>Alara Notes</span>
          </div>
          <p>© 2025 · Written with coffee and curiosity</p>
          <div className="flex gap-4">
            {["Twitter", "RSS", "Email"].map(l => (
              <a key={l} href="#" className="hover:text-zinc-200 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
