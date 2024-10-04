"use client";
import React, { useEffect, useState } from "react";
import RenderCard from "@/app/components/RenderCard";

interface SearchResultItem {
  slug: string;
  poster_url: string;
  title?: string;
  name?: string;
  origin_name?: string;
}

interface SearchResult {
  data: {
    items: SearchResultItem[];
  };
}

interface SearchProps {
  keyword: string; // Nhận từ khóa từ props
}

const Search: React.FC<SearchProps> = ({ keyword }) => {
  const [valueSearch, setValueSearch] = useState<string>(keyword); // Khởi tạo state với từ khóa ban đầu
  const [search, setSearch] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (valueSearch.trim() === "") {
        setSearch(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=24`
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
  }, [valueSearch]);

  return (
    <div className="container mx-auto py-8">
      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {search?.data?.items && search.data.items.length > 0 ? (
            search.data.items.map((film) => (
              <RenderCard key={film.slug} film={film} /> // Sử dụng RenderCard
            ))
          ) : (
            <p className="col-span-full text-center">
              Không tìm thấy phim nào.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
