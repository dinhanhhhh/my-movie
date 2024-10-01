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

  useEffect(() => {
    fetch(`https://phimapi.com/phim/${slug}`)
      .then((res) => res.json())
      .then((info_content) => {
        setInfo(info_content.movie);
        document.title = info_content.movie.name;
      });
  }, [slug]);

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      {/* Hình ảnh banner và các thành phần nằm trong nó */}
      <div className="banner relative h-auto">
        <img
          className="w-full h-full object-cover" // Sử dụng object-cover để giữ tỉ lệ
          src={info.thumb_url}
          alt={info.name}
        />
        {/* Poster và nút xem phim nằm ở góc trái của banner */}
        <div className="absolute bottom-4 left-4 flex flex-col items-center">
          {/* Poster của phim */}
          <img
            className="w-32 h-auto md:w-64 shadow-lg" // Thay đổi kích thước poster
            src={info.poster_url}
            alt={info.name}
          />
          {/* Nút xem phim nằm dưới poster */}
          <div className="mt-2">
            <Link
              href={`/watch/${info.slug}`}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Xem Phim
            </Link>
          </div>
        </div>
      </div>

      {/* Nội dung thông tin phim */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Phim: {info.name}</p>
        <p className="text-md">Thời gian: {info.time}</p>
        <p className="mt-4">{info.content}</p>
        <ul className="mt-4">
          <li className="font-semibold">Diễn viên:</li>
          {info.actor.map((item, index) => (
            <li className="ml-4" key={index}>
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
