"use client";

import React, { useEffect, useState } from "react";
import RenderCard from "../components/RenderCard"; // Import RenderCard

// Định nghĩa kiểu dữ liệu cho phim
type Film = {
  slug: string;
  poster_url: string;
  name: string;
  origin_name: string;
};

type Films = {
  hoatHinh: Film[];
  phimle: Film[];
  phimbo: Film[];
  tvshows: Film[];
};

const Content: React.FC = () => {
  const [films, setFilms] = useState<Films>({
    hoatHinh: [],
    phimle: [],
    phimbo: [],
    tvshows: [],
  });
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hoatHinhRes, phimleRes, phimboRes, tvshowRes] =
          await Promise.all([
            fetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=6`),
            fetch(`https://phimapi.com/v1/api/danh-sach/phim-le?limit=6`),
            fetch(`https://phimapi.com/v1/api/danh-sach/phim-bo?limit=6`),
            fetch(`https://phimapi.com/v1/api/danh-sach/tv-shows?limit=6`),
          ]);

        if (
          !hoatHinhRes.ok ||
          !phimleRes.ok ||
          !phimboRes.ok ||
          !tvshowRes.ok
        ) {
          throw new Error("Không thể tải dữ liệu từ máy chủ.");
        }

        const hoatHinhData = await hoatHinhRes.json();
        const phimleData = await phimleRes.json();
        const phimboData = await phimboRes.json();
        const tvshowsData = await tvshowRes.json();

        setFilms({
          hoatHinh: hoatHinhData.data.items,
          phimle: phimleData.data.items,
          phimbo: phimboData.data.items,
          tvshows: tvshowsData.data.items,
        });

        document.title =
          "Phim Chill chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD.";
      } catch (error) {
        setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchData();
  }, []);

  const renderFilmList = (title: string, filmData: Film[]) => (
    <div className="form_card mb-8 p-4">
      <span className="title text-2xl font-bold">{title}</span>
      <hr className="my-2 border border-gray-600" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filmData.map((data) => (
          <RenderCard key={data.slug} film={data} />
        ))}
      </div>
      {filmData.length === 0 && (
        <p className="text-center text-gray-500">
          Không có dữ liệu nào để hiển thị.
        </p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Hiển thị loading khi đang tải dữ liệu */}
      {loading ? (
        <p className="text-center text-xl">Đang tải dữ liệu...</p>
      ) : (
        <>
          {/* Kiểm tra từng loại phim và hiển thị khi có dữ liệu */}
          {films.hoatHinh.length > 0 &&
            renderFilmList("PHIM HOẠT HÌNH ĐỀ CỬ", films.hoatHinh)}
          {films.phimle.length > 0 &&
            renderFilmList("PHIM LẺ ĐỀ CỬ", films.phimle)}
          {films.phimbo.length > 0 &&
            renderFilmList("PHIM BỘ ĐỀ CỬ", films.phimbo)}
          {films.tvshows.length > 0 &&
            renderFilmList("TV SHOWS ĐỀ CỬ", films.tvshows)}
        </>
      )}
    </div>
  );
};

export default Content;
