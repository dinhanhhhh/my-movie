"use client"; // Báo hiệu đây là Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Thêm import Image từ next/image

// Định nghĩa kiểu dữ liệu cho kết quả tìm kiếm
interface SearchResultItem {
  slug: string;
  poster_url: string;
  title?: string;
  name?: string;
}

interface SearchResult {
  data: {
    items: SearchResultItem[];
  };
}

export default function SearchPage() {
  const [valueSearch, setValueSearch] = useState<string>(""); // State tìm kiếm là một chuỗi
  const [search, setSearch] = useState<SearchResult | null>(null); // State cho kết quả tìm kiếm
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (valueSearch.trim() === "") {
        setSearch(null); // Nếu không có giá trị tìm kiếm thì reset kết quả
        return;
      }

      setLoading(true); // Bắt đầu tải dữ liệu
      setError(null); // Reset lỗi

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
        setLoading(false); // Kết thúc tải dữ liệu
      }
    };

    // Gọi hàm tìm kiếm
    fetchSearchResults();
  }, [valueSearch]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-6">
        <input
          onChange={(e) => setValueSearch(e.target.value)}
          value={valueSearch}
          name="search"
          type="text"
          placeholder="Vui lòng nhập tên phim..."
          className="border border-gray-300 rounded-l-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            if (valueSearch.trim() !== "") {
              // Chỉ cần gán lại giá trị để gọi useEffect
              setValueSearch(valueSearch);
            }
          }}
          className="bg-blue-500 text-white rounded-r-md p-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          Tìm kiếm
        </button>
      </div>

      {loading ? (
        <p className="text-center">Đang tải...</p> // Trạng thái loading
      ) : error ? (
        <p className="text-center text-red-500">{error}</p> // Hiển thị lỗi nếu có
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {search?.data?.items && search.data.items.length > 0
            ? search.data.items.map((ds) => (
                <div
                  key={ds.slug}
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  <a href={`/info/${ds.slug}`}>
                    <Image
                      className="image__card--film w-full h-auto aspect-[2/3] rounded-t-lg"
                      src={`https://phimimg.com/${ds.poster_url}`} // Sử dụng Image từ Next.js
                      alt={ds.title || "card__film"}
                      width={300} // Chiều rộng tối ưu
                      height={450} // Chiều cao tối ưu
                    />
                  </a>
                  <div className="p-4">
                    <a
                      className="text-lg font-semibold block mb-1"
                      href={`/info/${ds.slug}`}
                    >
                      {ds.name || "Tên phim"}
                    </a>
                  </div>
                </div>
              ))
            : valueSearch && (
                <p className="text-center">Không tìm thấy phim nào.</p>
              )}
        </div>
      )}
    </div>
  );
}
