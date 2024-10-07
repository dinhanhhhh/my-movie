import ContentList from "@/app/components/ContentList";

const CartoonPage = () => {
  return (
    <ContentList
      apiUrl="https://phimapi.com/v1/api/danh-sach/hoat-hinh"
      defaultTitle="Phim Hoạt Hình"
      contentType="cartoon" // Tên này sẽ được dùng trong URL
    />
  );
};

export default CartoonPage;
