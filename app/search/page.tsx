"use client"; // Đảm bảo bạn đã sử dụng "use client"
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RenderCard from "@/app/components/RenderCard";

interface FilmData {
  slug: string;
  name?: string;
  origin_name?: string;
  poster_url: string;
}

interface SearchResult {
  data: {
    items: FilmData[];
  };
}

function SearchResults() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // Lấy từ khóa từ query string

  const [search, setSearch] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (keyword.trim() === "") {
        setSearch(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=24`
        );
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        const dataSearch: SearchResult = await res.json();
        setSearch(dataSearch);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Lỗi khi lấy dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {search?.data?.items && search.data.items.length > 0 ? (
        search.data.items.map((film) => (
          <RenderCard key={film.slug} film={film} /> // Sử dụng RenderCard để render film
        ))
      ) : (
        <p className="col-span-full text-center">Không tìm thấy phim nào.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <div className="p-4 mt-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          PHIM BẠN TÌM KIẾM
        </h1>
        <SearchResults />
      </div>
    </Suspense>
  );
}
