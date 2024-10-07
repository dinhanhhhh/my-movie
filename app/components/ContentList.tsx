// components/ContentList.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RenderCard from "./RenderCard";
import CustomPagination from "./CustomPagination";

interface ContentListProps {
  apiUrl: string;
  defaultTitle: string;
  contentType: string; // Dùng để điều hướng URL (phim-hoat-hinh, phim-bo, etc.)
}

interface MovieData {
  slug: string;
  name: string;
  origin_name: string;
  poster_url: string;
}

const ContentList = ({
  apiUrl,
  defaultTitle,
  contentType,
}: ContentListProps) => {
  const [contentList, setContentList] = useState<MovieData[]>([]);
  const [pageTitle, setPageTitle] = useState<string>(defaultTitle);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(`${apiUrl}?limit=24&page=${currentPage}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setContentList(data.data.items || []);
        setPageTitle(data.data.titlePage || defaultTitle);
        setTotalPages(data.totalPages);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải dữ liệu."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, currentPage, defaultTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/${contentType}?page=${page}`);
  };

  if (isLoading) {
    return <div className="text-center">Đang tải...</div>;
  }

  if (errorMessage) {
    return <div className="text-center text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase">
        {pageTitle}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {contentList.map((item) => (
          <RenderCard key={item.slug} film={item} />
        ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ContentList;
