// app/Movie/[movieId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RenderCard from "@/app/components/RenderCard";

interface MovieData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

export default function MoviePage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [title, setTitle] = useState<string>("Phim");
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/danh-sach/${movieId}?limit=24`
        );
        const data = await res.json();
        setMovies(data.data.items || []);
        setTitle(data.data.titlePage || "Phim");
        document.title = data.data.seoOnPage.titleHead || "Phim";
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }

    fetchMovies();
  }, [movieId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <RenderCard
              key={movie.slug}
              film={movie}
            /> /* Sử dụng RenderCard */
          ))
        ) : (
          <p className="text-center text-gray-500">
            Không có dữ liệu nào để hiển thị.
          </p>
        )}
      </div>
    </div>
  );
}
