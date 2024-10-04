"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/app/components/Search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // Lấy từ khóa từ query string

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold uppercase text-center mb-6">
        PHIM BẠN TÌM KIẾM
      </h1>
      <Suspense fallback={<p className="text-center">Đang tải...</p>}>
        <Search keyword={keyword} /> {/* Truyền từ khóa vào component Search */}
      </Suspense>
    </div>
  );
}
