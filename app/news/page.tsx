// app/News/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NewsData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

function News() {
  const [news, setNews] = useState<NewsData[]>([]); // Định nghĩa kiểu dữ liệu cho news
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

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
        setNews(data.items);
        document.title = "Phim mới cập nhật !!";
      } catch (error) {
        setError("Không thể tải dữ liệu phim mới. Vui lòng thử lại sau.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">PHIM MỚI CẬP NHẬT</h1>
      </div>
      {loading ? (
        <p className="text-center">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {news.map((data) => (
            <div
              key={data.slug}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <a href={`/info/${data.slug}`}>
                <Image
                  className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
                  src={data.poster_url} // Sử dụng trực tiếp poster_url từ API
                  alt={data.name || "card__film"}
                  width={300} // Đặt chiều rộng tùy ý
                  height={450} // Đặt chiều cao tùy ý
                  loading="lazy" // Tải hình ảnh lười
                />
              </a>
              <div className="p-4">
                <a
                  className="text-lg font-semibold block mb-1"
                  href={`/info/${data.slug}`}
                >
                  {data.name}
                </a>
                <p className="text-gray-600">{data.origin_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="movie__page"></div>
    </div>
  );
}

export default News;
