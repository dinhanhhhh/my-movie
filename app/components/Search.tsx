"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RenderCard from "@/app/components/RenderCard";
import CustomPagination from "@/app/components/CustomPagination"; // Import component phân trang

interface Film {
  slug: string;
  name?: string;
  origin_name?: string;
  poster_url: string;
}

interface SearchResult {
  data: {
    items: Film[];
    totalPages: number; // Thêm tổng số trang
  };
}

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Sử dụng useRouter từ Next.js
  const keyword = searchParams.get("keyword") || "";
  const pageParam = searchParams.get("page") || "1"; // Lấy trang từ URL
  const currentPage = parseInt(pageParam);

  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0); // State cho tổng số trang

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
          `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}&limit=24&page=${currentPage}` // Cập nhật để bao gồm page
        );
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        const dataSearch: SearchResult = await res.json();
        setSearchResults(dataSearch);
        setTotalPages(dataSearch.data.totalPages); // Cập nhật tổng số trang từ API
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Lỗi khi lấy dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword, currentPage]); // Thêm currentPage vào dependency array

  if (loading) return <p className="text-center">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {searchResults?.data?.items && searchResults.data.items.length > 0 ? (
          searchResults.data.items.map((film) => (
            <RenderCard key={film.slug} film={film} />
          ))
        ) : (
          <p className="col-span-full text-center">Không tìm thấy phim nào.</p>
        )}
      </div>
      {/* Thêm component phân trang */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          // Cập nhật URL mà không reload
          router.push(`/?keyword=${keyword}&page=${page}`);
        }}
      />
    </div>
  );
};

export default SearchResults;
