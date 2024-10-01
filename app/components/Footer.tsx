import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <h2 className="text-gray-700 text-center mb-2">
          © 2024 <span className="font-semibold">Phim Hay</span>. All rights
          reserved.
        </h2>
        <p className="text-gray-500 text-sm text-center">
          Designed with love for movie enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
