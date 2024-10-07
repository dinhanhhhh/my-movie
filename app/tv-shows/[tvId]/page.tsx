"use client";
import ContentList from "@/app/components/ContentList";
import { useParams } from "next/navigation";

const TVShowPage = () => {
  const { tvId } = useParams(); // Lấy tvId từ URL

  return (
    <ContentList
      apiUrl={`https://phimapi.com/v1/api/danh-sach/phim-bo`}
      defaultTitle="Phim Bộ"
      contentType={`tv-shows/${tvId}`} // Sử dụng tvId từ dynamic route
    />
  );
};

export default TVShowPage;
