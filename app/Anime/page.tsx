// app/Anime/page.tsx
"use client";
import { useEffect, useState } from "react";
import RenderCard from "@/app/components/RenderCard";

interface AnimeData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const AnimePage = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [title, setTitle] = useState<string>("Hoạt Hình");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnimes() {
      try {
        const res = await fetch(
          "https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=24"
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setAnimes(data.data.items || []);
        setTitle(data.data.titlePage || "Hoạt Hình");
        document.title = data.data.titlePage || "Hoạt Hình"; // Cập nhật tiêu đề trang
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Có lỗi xảy ra khi tải dữ liệu.");
      } finally {
        setLoading(false); // Đặt trạng thái tải thành false
      }
    }

    fetchAnimes();
  }, []);

  if (loading) {
    return <div className="text-center">Đang tải...</div>; // Hiển thị thông báo tải
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>; // Hiển thị thông báo lỗi
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <RenderCard key={anime.slug} film={anime} /> 
        ))}
      </div>
    </div>
  );
};

export default AnimePage;
