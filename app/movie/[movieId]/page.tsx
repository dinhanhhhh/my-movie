// app/Movie/[movieId]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface MovieData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

export default function MoviePage() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [title, setTitle] = useState<string>("");
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
        console.error("Error fetching data:", error);
      }
    }

    fetchMovies();
  }, [movieId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.slug}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <a href={`/info/${movie.slug}`}>
                <img
                  className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
                  src={`https://phimimg.com/${movie.poster_url}`}
                  alt={movie.name || "card__film"}
                />
              </a>
              <div className="p-4">
                <a
                  className="text-lg font-semibold block mb-1"
                  href={`/info/${movie.slug}`}
                >
                  {movie.name}
                </a>
                <p className="text-gray-600">{movie.origin_name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>
    </div>
  );
}
