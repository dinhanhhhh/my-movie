"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/app/components/Search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // Lấy từ khóa từ query string

  return (
    <div className="p-4 mt-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        PHIM BẠN TÌM KIẾM
      </h1>
      {/* Tiêu đề cho trang tìm kiếm */}
      <Search keyword={keyword} /> {/* Truyền từ khóa vào component Search */}
    </div>
  );
}
