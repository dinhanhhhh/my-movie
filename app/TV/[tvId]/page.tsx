// app/TV/[tvId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface TVShowData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const TVShowPage = () => {
  const { tvId } = useParams();
  const [tvShows, setTVShows] = useState<TVShowData[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function fetchTVShows() {
      try {
        const res = await fetch(`https://phimapi.com/v1/api/danh-sach/phim-bo?limit=24`);
        const data = await res.json();
        setTVShows(data.data.items || []);
        setTitle(data.data.titlePage || "Phim Bộ");
        document.title = title;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTVShows();
  }, [tvId, title]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tvShows.map((show) => (
          <div
            key={show.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <a href={`/info/${show.slug}`}>
              <img
                className="w-full h-64 object-cover"
                src={`https://phimimg.com/${show.poster_url}`}
                alt={show.name || "card__film"}
              />
            </a>
            <div className="p-4">
              <a
                className="text-lg font-semibold block mb-1"
                href={`/info/${show.slug}`}
              >
                {show.name}
              </a>
              <p className="text-gray-600">{show.origin_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TVShowPage;
