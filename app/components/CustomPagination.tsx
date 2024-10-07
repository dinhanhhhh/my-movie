import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <Pagination className="mt-4">
      <PaginationPrevious
        href="#"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <PaginationContent className="flex items-center">
        {/* Hiển thị trang 1, 2, 3 cố định */}
        {Array.from({ length: 3 }, (_, idx) => {
          const page = idx + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "font-bold" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Hiển thị dấu ... nếu người dùng ở trang lớn hơn 3 */}
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <span className="px-2">...</span>
            </PaginationItem>

            {/* Hiển thị trang hiện tại */}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(currentPage)}
                className="font-bold"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </PaginationContent>

      <PaginationNext
        href="#"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default CustomPagination;
