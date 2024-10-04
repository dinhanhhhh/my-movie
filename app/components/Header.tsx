"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ModeToggle from "@/app/components/mode-toggle";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  if (!mounted) {
    return null;
  }

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Kiểm tra xem có từ khóa hay không trước khi điều hướng
    if (valueSearch.trim()) {
      // Điều hướng đến trang tìm kiếm với từ khóa
      window.location.href = `/search?keyword=${encodeURIComponent(
        valueSearch
      )}`;
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto space-x-12">
        <div className="header__logo">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <img
              src="/images/logo.png"
              alt="Logo Phim Hay"
              className="h-10 mr-2"
            />
            <span className="text-orange-400 transition-colors duration-300 hover:text-red-500">
              Phim Hay
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <input
            onChange={(e) => setValueSearch(e.target.value)}
            value={valueSearch}
            type="text"
            placeholder="Tìm kiếm phim..."
            className="border border-gray-300 rounded-l-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded-r-md p-2 px-4 hover:bg-blue-600 transition duration-200"
          >
            Tìm kiếm
          </button>
        </div>

        {!isMobile && (
          <nav className="flex space-x-12">
            {[
              { path: "/Anime", name: "Anime" },
              { path: "/movie/phim-le", name: "Phim Lẻ" },
              { path: "/TV/phim-bo", name: "Phim Bộ" },
              { path: "/news", name: "Phim Mới" },
              { path: "/api", name: "API" },
            ].map(({ path, name }) => (
              <Link key={path} href={path} className="hover:text-yellow-300">
                {name}
              </Link>
            ))}
          </nav>
        )}

        {isMobile && (
          <div className="md:hidden">
            <button className="mobile-menu__toggle" onClick={toggleMenu}>
              ☰
            </button>
            {menuOpen && (
              <nav className="absolute right-0 mt-2 w-full bg-gray-800 text-white p-4">
                <ul className="space-y-4">
                  {[
                    { path: "/Anime", name: "Anime" },
                    { path: "/movie/phim-le", name: "Phim Lẻ" },
                    { path: "/TV/phim-bo", name: "Phim Bộ" },
                    { path: "/news", name: "Phim Mới" },
                    { path: "/api", name: "API" },
                  ].map(({ path, name }) => (
                    <li key={path}>
                      <Link href={path} className="hover:text-yellow-300">
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
