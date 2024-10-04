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
  const [movieList, setMovieList] = useState<MovieData[]>([]); // Đổi tên từ `movies` thành `movieList`
  const [pageTitle, setPageTitle] = useState<string>("Phim"); // Đổi tên từ `title` thành `pageTitle`
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/danh-sach/${movieId}?limit=24`
        );
        const data = await res.json();
        setMovieList(data.data.items || []); // Sử dụng `movieList`
        setPageTitle(data.data.titlePage || "Phim"); // Sử dụng `pageTitle`
        document.title = data.data.seoOnPage.titleHead || "Phim";
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    }

    fetchMovies();
  }, [movieId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">
        {pageTitle}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movieList.length > 0 ? (
          movieList.map((movie) => <RenderCard key={movie.slug} film={movie} />)
        ) : (
          <p className="text-center text-gray-500">
            Không có dữ liệu nào để hiển thị.
          </p>
        )}
      </div>
    </div>
  );
}
