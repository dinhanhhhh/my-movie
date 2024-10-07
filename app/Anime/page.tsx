import ContentList from "@/app/components/ContentList";

const AnimePage = () => {
  return (
    <ContentList
      apiUrl="https://phimapi.com/v1/api/danh-sach/hoat-hinh"
      defaultTitle="Phim Hoạt Hình"
      contentType="Anime" // Tên này sẽ được dùng trong URL
    />
  );
};

export default AnimePage;
