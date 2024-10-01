// app/Search/page.tsx
"use client"; // Báo hiệu đây là Client Component

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (valueSearch.trim() !== "") {
      fetch(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=24`
      )
        .then((res) => res.json())
        .then((dataSearch: SearchResult) => {
          setSearch(dataSearch);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setSearch(null); // Nếu không có giá trị tìm kiếm thì reset kết quả
    }
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
              // Thực hiện tìm kiếm khi nhấn nút
              fetch(
                `https://phimapi.com/v1/api/tim-kiem?keyword=${valueSearch}&limit=24`
              )
                .then((res) => res.json())
                .then((dataSearch: SearchResult) => {
                  setSearch(dataSearch);
                })
                .catch((error) => console.error("Error fetching data:", error));
            }
          }}
          className="bg-blue-500 text-white rounded-r-md p-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          Tìm kiếm
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {valueSearch && search?.data?.items && search.data.items.length > 0
          ? search.data.items.map((ds, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <a href={`/info/${ds.slug}`}>
                  <img
                    className="w-full h-64 object-cover"
                    src={`https://phimimg.com/${ds.poster_url}`}
                    alt={ds.title || "card__film"}
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
    </div>
  );
}
