// app/Anime/page.tsx
"use client";
import { useEffect, useState } from "react";
import RenderCard from "@/app/components/RenderCard";

interface Anime {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const AnimePage = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [pageTitle, setPageTitle] = useState<string>("Hoạt Hình");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch(
          "https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=24"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnimeList(data.data.items || []);
        setPageTitle(data.data.titlePage || "Hoạt Hình");
        document.title = data.data.titlePage || "Hoạt Hình";
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Đang tải...</div>;
  }

  if (errorMessage) {
    return <div className="text-center text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">
        {pageTitle}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeList.map((anime) => (
          <RenderCard key={anime.slug} film={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimePage;
