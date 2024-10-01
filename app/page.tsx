// app/index.tsx
import React from "react";
import Content from "@/app/components/Contents";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8">
        Chào mừng đến với trang phim
      </h1>
      <Content />
    </main>
  );
};

export default HomePage;
