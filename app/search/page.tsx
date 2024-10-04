"use client";
import React, { Suspense } from "react";
import SearchResults from "@/app/components/Search";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Đang tải...</p>}>
      <div className="p-4 mt-4">
        <h1 className="text-3xl font-bold text-center mb-6">
          PHIM TÌM KIẾM CÓ LIÊN QUAN
        </h1>
        <SearchResults />
      </div>
    </Suspense>
  );
}
