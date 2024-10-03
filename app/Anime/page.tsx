// app/Anime/page.tsx
"use client";
import { useEffect, useState } from "react";

interface AnimeData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const AnimePage = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function fetchAnimes() {
      try {
        const res = await fetch(
          "https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=24"
        );
        const data = await res.json();
        setAnimes(data.data.items || []);
        setTitle(data.data.titlePage || "Hoạt Hình");
        document.title = title; // Cập nhật tiêu đề trang
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAnimes();
  }, [title]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <div
            key={anime.slug}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            <a href={`/info/${anime.slug}`}>
              <img
                className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
                src={`https://phimimg.com/${anime.poster_url}`}
                alt={anime.name || "card__film"}
              />
            </a>
            <div className="p-4">
              <a
                className="text-lg font-semibold block mb-1"
                href={`/info/${anime.slug}`}
              >
                {anime.name}
              </a>
              <p className="text-gray-600">{anime.origin_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimePage;
