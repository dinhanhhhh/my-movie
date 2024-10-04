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

      <h3 className="text-xl font-semibold mt-6 mb-2">Các Endpoint chính</h3>
      <ul className="list-disc pl-5">
        <li>
          <strong>GET /api/movies</strong>: Lấy danh sách phim.
        </li>
        <li>
          <strong>GET /api/movies/:id</strong>: Lấy thông tin chi tiết phim theo
          ID.
        </li>
        <li>
          <strong>POST /api/movies</strong>: Thêm phim mới.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">Ví dụ sử dụng</h3>
      <pre className=" p-4 rounded-md">
        <code>
          {`fetch('/api/movies')
  .then(response => response.json())
  .then(data => console.log(data));`}
        </code>
      </pre>
    </div>
  );
};

export default Api;
