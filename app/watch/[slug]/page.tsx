"use client"; // Báo hiệu đây là Client Component

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
  const [chap, setChap] = useState(0);
  const [active, setActive] = useState(0);
  const [film, setFilm] = useState("");
  const [activeFilm, setActiveFilm] = useState<Episode[]>([]);
  const [content, setContent] = useState({ name: "", time: "", desc: "" });
  const { slug } = useParams();

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        const watch: FilmData = await res.json();

        setContent({
          name: watch.movie.name,
          time: watch.movie.time,
          desc: watch.movie.content,
        });
        setChap(watch.episodes[0].server_data.length);
        setFilm(watch.episodes[0].server_data[0].link_m3u8);
        setActiveFilm(watch.episodes[0].server_data);
        document.title = watch.movie.name;
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
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = film;
      video.play();
    }
  }, [film]);

  return (
    <div className="watch bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="film__title mb-4">
          <h1 className="film__name text-3xl font-bold text-gray-800">
            {`${content.name} ~ Tập ${active + 1}`}
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 mb-4 lg:mb-0">
            <video
              id="my-hls-video"
              controls
              className="w-full h-80 rounded-lg shadow-lg" // Tăng chiều cao video
            />
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="list__chap bg-white shadow-md rounded p-4">
            <div className="list__chap--info mb-2">
              <p className="list__chap--title font-bold text-lg">Chọn tập</p>
              <p className="list__chap--desc text-gray-600">
                Tập từ 1 đến <span className="chap__desc">{chap}</span>
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {/* Căn giữa */}
              {Array.from({ length: chap }).map((_, i) => (
                <div
                  key={i}
                  className={`film__list--chap flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out w-12 h-12 text-center text-lg font-semibold ${
                    active === i
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-white hover:bg-green-600"
                  }`}
                  onClick={() => {
                    setActive(i);
                    setFilm(activeFilm[i].link_m3u8);
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="film__info mt-4 bg-white p-4 rounded shadow">
          <div className="film__info--desc">
            <p className="info__title">
              Thời gian:{" "}
              <span className="film__time font-semibold">{content.time}</span>
            </p>
            <p className="info__title">
              Nội dung: <span className="film__desc">{content.desc}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
