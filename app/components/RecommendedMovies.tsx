"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RenderCard from "@/app/components/RenderCard";
import CustomPagination from "@/app/components/CustomPagination";

type Film = {
  slug: string;
  poster_url: string;
  name: string;
  origin_name: string;
};

type Films = {
  hoatHinh: Film[];
  phimLe: Film[];
  phimBo: Film[];
  tvShows: Film[];
};

const RecommendedMovies: React.FC = () => {
  const router = useRouter();
  const [films, setFilms] = useState<Films>({
    hoatHinh: [],
    phimLe: [],
    phimBo: [],
    tvShows: [],
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    document.title = "Phim Hay chất lượng cao miễn phí. Xem phim HD VietSub.";
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const [hoatHinhRes, phimLeRes, phimBoRes, tvShowsRes] = await Promise.all(
        [
          fetch(
            `https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=6&page=${page}`
          ),
          fetch(
            `https://phimapi.com/v1/api/danh-sach/phim-le?limit=6&page=${page}`
          ),
          fetch(
            `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=6&page=${page}`
          ),
          fetch(
            `https://phimapi.com/v1/api/danh-sach/tv-shows?limit=6&page=${page}`
          ),
        ]
      );

      if (!hoatHinhRes.ok || !phimLeRes.ok || !phimBoRes.ok || !tvShowsRes.ok) {
        throw new Error("Không thể tải dữ liệu từ máy chủ.");
      }

      const hoatHinhData = await hoatHinhRes.json();
      const phimLeData = await phimLeRes.json();
      const phimBoData = await phimBoRes.json();
      const tvShowsData = await tvShowsRes.json();

      setFilms({
        hoatHinh: hoatHinhData.data.items,
        phimLe: phimLeData.data.items,
        phimBo: phimBoData.data.items,
        tvShows: tvShowsData.data.items,
      });

      setTotalPages(hoatHinhData.totalPages);
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    router.push(`/?page=${page}`);
  };

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
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-xl">Đang tải dữ liệu...</p>
      ) : (
        <>
          {films.hoatHinh.length > 0 &&
            renderFilmList("PHIM HOẠT HÌNH ĐỀ CỬ", films.hoatHinh)}
          {films.phimLe.length > 0 &&
            renderFilmList("PHIM LẺ ĐỀ CỬ", films.phimLe)}
          {films.phimBo.length > 0 &&
            renderFilmList("PHIM BỘ ĐỀ CỬ", films.phimBo)}
          {films.tvShows.length > 0 &&
            renderFilmList("TV SHOWS ĐỀ CỬ", films.tvShows)}

          {/* Pagination */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default RecommendedMovies;
