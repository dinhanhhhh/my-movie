// app/config.ts
export const API_URLS = {
  phimLe: "https://phimapi.com/v1/api/danh-sach/phim-le",
  phimBo: "https://phimapi.com/v1/api/danh-sach/phim-bo",
  phimMoiCapNhat: (page: number) =>
    `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`,
  movieDetail: (id: string) => `https://phimapi.com/v1/api/phim/${id}`,
  tvShowDetail: (id: string) => `https://phimapi.com/v1/api/tv/${id}`,
  // Thêm các API khác nếu cần
};
