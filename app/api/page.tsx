import React from "react";

const Api: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông tin API</h2>
      <p className="mb-2">
        Bạn có thể tìm hiểu thêm về API của chúng tôi và cách sử dụng tại đây:
      </p>
      <a
        href="https://kkphim.com/help/help.html"
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Truy cập API tài liệu
      </a>
    </div>
  );
};

export default Api;
