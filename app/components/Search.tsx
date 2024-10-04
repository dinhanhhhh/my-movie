"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RenderCard from "@/app/components/RenderCard";

interface Film {
  slug: string;
  name?: string;
  origin_name?: string;
  poster_url: string;
}

interface SearchResult {
  data: {
    items: Film[];
  };
}

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [searchResults, setSearchResults] = useState<SearchResult | null>(null); // Đổi tên từ `search` thành `searchResults`
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (keyword.trim() === "") {
        setSearchResults(null);
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
        setSearchResults(dataSearch); // Đổi tên từ `setSearch` thành `setSearchResults`
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
      {searchResults?.data?.items && searchResults.data.items.length > 0 ? (
        searchResults.data.items.map((film) => (
          <RenderCard key={film.slug} film={film} />
        ))
      ) : (
        <p className="col-span-full text-center">Không tìm thấy phim nào.</p>
      )}
    </div>
  );
};

export default SearchResults;
