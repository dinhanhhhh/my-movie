"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface MovieInfo {
  thumb_url: string;
  poster_url: string;
  slug: string;
  name: string;
  time: string;
  content: string;
  actor: string[];
}

export default function Info() {
  const { slug } = useParams();
  const [info, setInfo] = useState<MovieInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const info_content = await res.json();
        setInfo(info_content.movie);
        document.title = info_content.movie.name;
      } catch (error) {
        setError("Lỗi khi tải thông tin phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieInfo();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div> {/* Thêm spinner */}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      {/* Hình ảnh banner và các thành phần nằm trong nó */}
      <div className="banner relative h-96">
        {" "}
        {/* Chiều cao banner điều chỉnh */}
        <img
          className="w-full h-full object-cover"
          src={info?.thumb_url}
          alt={info?.name}
          loading="lazy" // Lazy load cho hình ảnh
        />
        {/* Poster và nút xem phim nằm ở góc trái của banner */}
        <div className="absolute bottom-4 left-4 flex flex-col items-center">
          <img
            className="w-24 h-auto md:w-32 shadow-lg rounded-t-lg" // Kích thước poster điều chỉnh
            src={info?.poster_url}
            alt={info?.name}
            loading="lazy"
          />
          <div className="mt-2">
            <Link
              href={`/watch/${info?.slug}`}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Xem Phim
            </Link>
          </div>
        </div>
      </div>

      {/* Nội dung thông tin phim */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Phim: {info?.name}</p>
        <p className="text-md">Thời gian: {info?.time}</p>
        <p className="mt-4">{info?.content}</p>
        <ul className="mt-4">
          <li className="font-semibold">Diễn viên:</li>
          {info?.actor.map((item, index) => (
            <li className="ml-4" key={index}>
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
