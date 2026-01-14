"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Category = "All" | "Pizza" | "Burgers" | "Pasta" | "Sushi" | "Salads" | "Desserts";

type MenuItem = {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  price: number;
  imageUrl: string;
};

const CATEGORIES: Category[] = ["All", "Pizza", "Burgers", "Pasta", "Sushi", "Salads", "Desserts"];

const VALID_CATEGORIES = ["Pizza", "Burgers", "Pasta", "Sushi", "Salads", "Desserts"] as const;

const MENU_ITEMS: MenuItem[] = [
  {
    id: "pizza-margherita",
    title: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
    category: "Pizza",
    price: 12.99,
    imageUrl:
      "https://images.unsplash.com/photo-1548365328-8b849e6f1f02?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "pizza-pepperoni",
    title: "Pepperoni Pizza",
    description: "Traditional pizza loaded with pepperoni and cheese.",
    category: "Pizza",
    price: 14.99,
    imageUrl:
      "https://images.unsplash.com/photo-1601924582975-7e1d5f5d1b54?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "burger-classic",
    title: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, pickles, and special sauce.",
    category: "Burgers",
    price: 10.99,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "burger-cheeseburger",
    title: "Cheeseburger",
    description: "Double beef patty with melted cheddar cheese.",
    category: "Burgers",
    price: 12.99,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "pasta-carbonara",
    title: "Pasta Carbonara",
    description: "Creamy sauce with pancetta and parmesan.",
    category: "Pasta",
    price: 11.49,
    imageUrl:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "sushi-maki",
    title: "Maki Sushi Set",
    description: "Assorted maki rolls with soy sauce and ginger.",
    category: "Sushi",
    price: 13.5,
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "salad-caesar",
    title: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan, and caesar dressing.",
    category: "Salads",
    price: 8.99,
    imageUrl:
      "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: "dessert-cheesecake",
    title: "Cheesecake",
    description: "Classic creamy cheesecake with a buttery crust.",
    category: "Desserts",
    price: 6.49,
    imageUrl:
      "https://images.unsplash.com/photo-1542826438-6d8f97fc3f9b?auto=format&fit=crop&w=1400&q=60",
  },
];

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const menuRef = useRef<HTMLElement | null>(null);

  // Read ?category=... and apply filter + scroll
  useEffect(() => {
    const cat = searchParams.get("category");
    if (!cat) return;

    const normalized = cat.trim();
    const isValid = (VALID_CATEGORIES as readonly string[]).includes(normalized);
    if (!isValid) return;

    setActiveCategory(normalized as Category);

    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" ? true : item.category === activeCategory;

      const matchesQuery =
        q.length === 0
          ? true
          : item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  function updateCategory(cat: Category) {
    setActiveCategory(cat);

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") params.delete("category");
    else params.set("category", cat);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });

    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <main className="w-full bg-white text-gray-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Our Menu</h1>
          <p className="mt-2 text-sm text-gray-600">Browse our delicious selection of meals</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
            <span className="select-none text-gray-400">🔎</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for dishes..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => updateCategory(cat)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <section ref={menuRef} className="grid gap-6 scroll-mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="h-40 w-full bg-gray-100">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-extrabold">{item.title}</h3>
                  <span className="text-xs font-bold text-orange-600">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <p className="mt-2 text-xs text-gray-600">{item.description}</p>

                <button
                  className="mt-4 w-full cursor-pointer rounded-md bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-orange-600 hover:shadow-md hover:scale-[1.02]"
                  onClick={() => alert(`Added to cart: ${item.title}`)}
                >
                  + Add to Cart
                </button>
              </div>
            </article>
          ))}
        </section>

        {filteredItems.length === 0 && (
          <div className="mt-10 rounded-lg border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm font-semibold">No items found</p>
            <p className="mt-1 text-sm text-gray-600">
              Try a different search term or select another category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <MenuPage />
    </Suspense>
  );
}
