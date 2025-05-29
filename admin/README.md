# Trang Quản Trị - Toán Thầy Bee

Đây là trang quản trị (admin dashboard) của ứng dụng Toán Thầy Bee, được xây dựng bằng React. Trang quản trị cung cấp giao diện toàn diện cho quản trị viên để quản lý nền tảng giáo dục.

## Tính Năng

Trang quản trị bao gồm các tính năng chính sau:

- **Quản Lý Người Dùng**
  - Quản lý học sinh với hồ sơ chi tiết
  - Quản lý vai trò người dùng và phân quyền

- **Quản Lý Nội Dung**
  - Quản lý câu hỏi với hỗ trợ LaTeX
  - Tạo và quản lý bài kiểm tra
  - Xử lý báo cáo câu hỏi
  - Xuất bản và quản lý bài viết
  - Quản lý lớp học với tổ chức bài học

- **Công Cụ Giám Sát**
  - Theo dõi và phân tích bài kiểm tra
  - Theo dõi hiệu suất học sinh
  - Giám sát báo cáo câu hỏi

- **Tính Năng Đặc Biệt**
  - Hiển thị công thức toán học với LaTeX
  - Chức năng NoTranslate để bảo toàn nội dung toán học
  - Hệ thống quản lý mã
  - Chức năng xem trước bài kiểm tra

## Cài Đặt và Thiết Lập

### Yêu Cầu Hệ Thống
- Node.js (khuyến nghị phiên bản >=16.x)
- npm hoặc yarn
- API Backend đang chạy (xem thư mục backend)

### Các Bước Cài Đặt

1. Clone repository:
```bash
git clone https://github.com/b4schh/toan-thay-bee-mobile-app/
cd admin
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Tạo file `.env` trong thư mục admin với các biến sau:
```
PORT=4000
REACT_APP_API_URL=url_api_backend_của_bạn (ví dụ: http://localhost:3000/api)
```

4. Khởi động server phát triển:
```bash
npm start
```

Ứng dụng sẽ khả dụng tại [http://localhost:4000](http://localhost:4000).

## Cấu Trúc Dự Án

- `src/components/` - Các component UI có thể tái sử dụng
- `src/pages/` - Các component trang cho các phần khác nhau
- `src/pages/admin/` - Các component trang dành riêng cho admin
- `src/components/utils/` - Các component tiện ích như NoTranslate
- `src/components/sidebar/` - Các component thanh điều hướng

## Các Tuyến Đường Được Bảo Vệ

Ứng dụng sử dụng các tuyến đường được bảo vệ để đảm bảo rằng chỉ người dùng đã xác thực với vai trò thích hợp mới có thể truy cập các trang nhất định:

- Các tuyến đường dành cho giáo viên và quản trị viên
- Các tuyến đường dành riêng cho quản trị viên

## Dự Án Liên Quan

- **Backend**: Server API Node.js/Express
- **Frontend**: Ứng dụng di động React Native

## Giấy Phép

Dự án này là một phần của nền tảng giáo dục Toán Thầy Bee.