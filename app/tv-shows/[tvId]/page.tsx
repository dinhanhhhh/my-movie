"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface TVShowData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const TVShowPage = () => {
  const { tvId } = useParams();
  const [tvShowList, setTVShowList] = useState<TVShowData[]>([]); // Đổi tên từ `tvShows` thành `tvShowList`
  const [pageTitle, setPageTitle] = useState<string>("Phim Bộ"); // Đổi tên từ `title` thành `pageTitle`
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTVShows() {
      setLoading(true); // Bắt đầu tải dữ liệu
      setError(null); // Đặt lại lỗi

      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/danh-sach/phim-bo?limit=24`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setTVShowList(data.data.items || []); // Sử dụng `tvShowList`
        setPageTitle(data.data.titlePage || "Phim Bộ"); // Sử dụng `pageTitle`
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching data"
        );
      } finally {
        setLoading(false); // Kết thúc tải dữ liệu
      }
    }

    fetchTVShows();
  }, [tvId]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">
        {pageTitle}
      </h1>

      {loading ? (
        <p className="text-center">Đang tải...</p> // Trạng thái loading
      ) : error ? (
        <p className="text-center text-red-500">{error}</p> // Hiển thị lỗi nếu có
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {tvShowList.length > 0 ? ( // Sử dụng `tvShowList`
            tvShowList.map(
              (
                show // Sử dụng `tvShowList`
              ) => (
                <div
                  key={show.slug}
                  className="rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
                >
                  <a href={`/info/${show.slug}`}>
                    <Image
                      className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
                      src={`https://phimimg.com/${show.poster_url}`}
                      alt={show.name || "card__film"}
                      width={300}
                      height={450}
                    />
                  </a>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900">
                    <a
                      className="text-lg font-semibold block mb-1"
                      href={`/info/${show.slug}`}
                    >
                      {show.name}
                    </a>
                    <p className="text-sm">{show.origin_name}</p>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-center">Không tìm thấy phim nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TVShowPage;
