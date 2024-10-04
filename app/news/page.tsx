"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Định nghĩa kiểu dữ liệu cho phim
interface NewsData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

// Component hiển thị thông tin từng phim
const FilmCard: React.FC<NewsData> = ({
  slug,
  name,
  origin_name,
  poster_url,
}) => (
  <div className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
    <Link href={`/info/${slug}`}>
      <Image
        className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
        src={poster_url}
        alt={name || "card__film"}
        width={300}
        height={450}
        loading="lazy"
      />
    </Link>
    <div className="p-4 bg-gray-50 dark:bg-gray-900">
      <Link className="text-lg font-semibold block mb-1" href={`/info/${slug}`}>
        {name}
      </Link>
      <p className="text-sm">{origin_name}</p>
    </div>
  </div>
);

const News: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews(data.items || []);
        document.title = "Phim mới cập nhật !!";
      } catch (error) {
        setError("Không thể tải dữ liệu phim mới. Vui lòng thử lại sau.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">PHIM MỚI CẬP NHẬT</h1>
      </div>

      {/* Kiểm tra trạng thái */}
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {news.map((data) => (
            <FilmCard key={data.slug} {...data} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Không có phim mới để hiển thị.
        </p>
      )}
    </div>
  );
};

export default News;
