// app/latestMovies/page.tsx
"use client";

import React, { Suspense } from "react";
import LatestMovies from "@/app/components/LatestMovies";

const LatestMoviesPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="text-center">Đang tải...</div>}>
      <LatestMovies />
    </Suspense>
  );
};

export default LatestMoviesPage;
