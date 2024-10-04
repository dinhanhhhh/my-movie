// app/index.tsx
import React from "react";
import RecommendedMovies from "@/app/components/RecommendedMovies";
const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1
        className="text-4xl font-bold text-center mt-8 uppercase"
        aria-label="Welcome to the movie page"
      >
        Chào mừng đến với trang phim hay
      </h1>
      <RecommendedMovies />
    </main>
  );
};

export default HomePage;
