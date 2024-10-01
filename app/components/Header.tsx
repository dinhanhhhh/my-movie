"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setMenuOpen(false); // Đóng menu khi không phải mobile
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-start items-center max-w-7xl mx-auto space-x-12">
        {/* Logo PhimChill */}
        <div className="header__logo">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-gradient">Phim Hay</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <nav className="flex space-x-12">
            {" "}
            {/* Sử dụng flex và space-x để căn khoảng cách */}
            <Link href="/search" className="hover:text-yellow-300">
              Tìm Kiếm
            </Link>
            <Link href="/Anime" className="hover:text-yellow-300">
              Phim Hoạt Hình
            </Link>
            <Link href="/movie/phim-le" className="hover:text-yellow-300">
              Phim Lẻ
            </Link>
            <Link href="/TV/phim-bo" className="hover:text-yellow-300">
              Phim Bộ
            </Link>
            <Link href="/news" className="hover:text-yellow-300">
              Phim Mới
            </Link>
            <Link href="/api" className="hover:text-yellow-300">
              API
            </Link>
          </nav>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <div className="md:hidden">
            <button className="mobile-menu__toggle" onClick={toggleMenu}>
              ☰
            </button>
            {menuOpen && (
              <nav className="absolute right-0 mt-2 w-full bg-gray-800 text-white p-4">
                <ul className="space-y-4">
                  <li>
                    <Link href="/search" className="hover:text-yellow-300">
                      Tìm Kiếm
                    </Link>
                  </li>
                  <li>
                    <Link href="/Anime" className="hover:text-yellow-300">
                      Phim Hoạt Hình
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/movie/phim-le"
                      className="hover:text-yellow-300"
                    >
                      Phim Lẻ
                    </Link>
                  </li>
                  <li>
                    <Link href="/tv/phim-bo" className="hover:text-yellow-300">
                      Phim Bộ
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="hover:text-yellow-300">
                      Phim Mới
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" className="hover:text-yellow-300">
                      API
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
