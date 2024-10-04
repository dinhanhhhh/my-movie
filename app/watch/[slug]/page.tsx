"use client";

import React, { useEffect, useState } from "react";
import Hls from "hls.js";
import { useParams } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho phim và các tập phim
interface Episode {
  link_m3u8: string;
}

interface Movie {
  name: string;
  time: string;
  content: string;
}

interface FilmData {
  movie: Movie;
  episodes: {
    server_data: Episode[];
  }[];
}

function Watch() {
  const [chap, setChap] = useState(0); // Số lượng tập phim
  const [active, setActive] = useState(0); // Tập phim hiện tại
  const [film, setFilm] = useState<string>(""); // Đường dẫn tập phim hiện tại
  const [activeFilm, setActiveFilm] = useState<Episode[]>([]); // Danh sách các tập phim
  const [content, setContent] = useState({ name: "", time: "", desc: "" }); // Nội dung phim
  const [loading, setLoading] = useState(false); // Trạng thái tải video mới
  const { slug } = useParams(); // Lấy slug từ URL

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const watch: FilmData = await res.json();

        if (watch && watch.movie && watch.episodes.length > 0) {
          const firstEpisode = watch.episodes[0].server_data;

          setContent({
            name: watch.movie.name,
            time: watch.movie.time,
            desc: watch.movie.content,
          });
          setChap(firstEpisode.length);
          setFilm(firstEpisode[0]?.link_m3u8);
          setActiveFilm(firstEpisode);
          document.title = watch.movie.name;
        } else {
          throw new Error("No episodes available");
        }
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilmData();
  }, [slug]);

  useEffect(() => {
    const video = document.getElementById("my-hls-video") as HTMLVideoElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(film);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = film;
      video.play();
    }
  }, [film]);

  return (
    <div className="container mx-auto p-6 watch">
      <div className="film__title mb-4 text-center">
        <h1 className="film__name text-3xl font-bold">
          {`${content.name} ~ Tập ${active + 1}`}
        </h1>
        <p className="text-gray-600">{content.desc}</p>
        <p className="text-gray-500">Thời gian: {content.time}</p>
      </div>

      <div className="flex flex-col lg:flex-row mb-4">
        <div className="flex-1 mb-4 lg:mb-0">
          <video
            id="my-hls-video"
            controls
            className="w-full h-96 rounded-lg shadow-lg"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="w-full mb-4">
        <div className="list__chap shadow-md rounded p-4">
          <div className="list__chap--info mb-2">
            <p className="list__chap--title font-bold text-lg">Chọn tập</p>
            <p className="list__chap--desc text-gray-500">
              Tập từ 1 đến <span className="chap__desc">{chap}</span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: chap }).map((_, i) => (
              <div
                key={i}
                className={`film__list--chap flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out w-12 h-12 text-center text-lg font-semibold ${
                  active === i
                    ? "bg-green-500 text-white"
                    : "bg-gray-800 text-white hover:bg-green-600"
                }`}
                onClick={() => {
                  setLoading(true); // Hiển thị trạng thái loading khi chọn tập
                  setActive(i);
                  setFilm(activeFilm[i].link_m3u8);
                  setTimeout(() => setLoading(false), 1000); // Tắt trạng thái loading sau khi chuyển tập
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <p className="text-center text-lg text-gray-600">
          Đang tải tập phim...
        </p>
      )}
    </div>
  );
}

export default Watch;
