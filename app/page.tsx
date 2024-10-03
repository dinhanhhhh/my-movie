// app/index.tsx
import React from "react";
import Content from "@/app/components/Contents";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 mt-8">
        Chào mừng đến với trang phim hay
      </h1>
      <Content />
    </main>
  );
};

export default HomePage;
