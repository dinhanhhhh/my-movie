"use client";

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hoatHinhRes, phimleRes, phimboRes, tvshowRes] =
          await Promise.all([
            fetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=12`),
            fetch(`https://phimapi.com/v1/api/danh-sach/phim-le?limit=12`),
            fetch(`https://phimapi.com/v1/api/danh-sach/phim-bo?limit=12`),
            fetch(`https://phimapi.com/v1/api/danh-sach/tv-shows?limit=12`),
          ]);

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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderFilmList = (title: string, filmData: Film[]) => (
    <div className="form_card mb-8">
      <span className="title text-xl font-bold">{title}</span>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {filmData.map((data, index) => (
          <div key={index} className="film rounded-lg shadow-md">
            <div className="card__film">
              <a href={`/info/${data.slug}`}>
                <img
                  className="image__card--film w-full h-auto rounded-t-lg"
                  src={`https://phimimg.com/${data.poster_url}`}
                  alt="card__film"
                />
              </a>
            </div>
            <div className="card__info p-2">
              <a
                className="film__name text-md font-medium"
                href={`/info/${data.slug}`}
              >
                {data.name}
              </a>
              <p className="text-sm text-gray-600">{data.origin_name}</p>{" "}
              {/* Sửa ở đây */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {films.hoatHinh.length > 0 &&
        renderFilmList("PHIM HOẠT HÌNH ĐỀ CỬ", films.hoatHinh)}
      {films.phimle.length > 0 && renderFilmList("PHIM LẺ ĐỀ CỬ", films.phimle)}
      {films.phimbo.length > 0 && renderFilmList("PHIM BỘ ĐỀ CỬ", films.phimbo)}
      {films.tvshows.length > 0 &&
        renderFilmList("TV SHOWS ĐỀ CỬ", films.tvshows)}
    </div>
  );
};

export default Content;
