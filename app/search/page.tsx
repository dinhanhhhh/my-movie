"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Search from "@/app/components/Search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || ""; // Lấy từ khóa từ query string

  return (
    <div>
      <Search keyword={keyword} /> {/* Truyền từ khóa vào component Search */}
    </div>
  );
}
