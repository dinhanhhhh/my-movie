"use client";
import ContentList from "@/app/components/ContentList";
import { useParams } from "next/navigation";

const MoviePage = () => {
  const { movieId } = useParams(); // Lấy movieId từ URL

  return (
    <ContentList
      apiUrl={`https://phimapi.com/v1/api/danh-sach/phim-le`}
      defaultTitle="Phim Lẻ"
      contentType={`movie/${movieId}`} // Sử dụng movieId từ dynamic route
    />
  );
};

export default MoviePage;
