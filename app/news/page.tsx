"use client";
import React, { useEffect, useState } from "react";

interface NewsData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

function News() {
  const [news, setNews] = useState<NewsData[]>([]); // Định nghĩa kiểu dữ liệu cho news

  useEffect(() => {
    fetch("https://phimapi.com/danh-sach/phim-moi-cap-nhat")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.items);
        document.title = "Phim mới cập nhật !!";
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-6">
        <span className="text-3xl font-bold">PHIM MỚI CẬP NHẬT</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {news.map((data) => (
          <div
            key={data.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="card__film">
              <a href={`/info/${data.slug}`}>
                <img
                  className="w-full h-64 object-cover"
                  src={data.poster_url} // Sử dụng trực tiếp poster_url từ API
                  alt={data.name || "card__film"}
                />
              </a>
            </div>
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
      <div className="movie__page"></div>
    </div>
  );
}

export default News;
