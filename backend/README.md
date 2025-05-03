# Backend - Ứng dụng Toán Thầy Bee

Phần backend của ứng dụng Toán Thầy Bee được phát triển bằng Node.js, Express và Sequelize, cung cấp API và xử lý logic nghiệp vụ cho ứng dụng học toán online.

## Cài đặt và Chạy server

### Yêu cầu hệ thống
- Node.js (phiên bản >=22.11.0)
- npm hoặc yarn
- MySQL (có thể chạy qua Docker)
- Docker (tùy chọn)

### Các bước cài đặt

1. Clone repository và di chuyển vào thư mục backend:
```bash
git clone [đường dẫn repository]
cd backend
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Cấu hình biến môi trường:
```bash
# Tạo file .env từ file .env.example
cp .env.example .env

# Chỉnh sửa file .env với thông tin cấu hình của bạn
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=toan_thay_bee
# JWT_SECRET=your_jwt_secret
# ...
```

4. Khởi động MySQL bằng Docker (tùy chọn):
```bash
docker compose -f ./deployments.yml up -d
```

5. Chạy migrations để tạo cấu trúc database:
```bash
npx sequelize-cli db:migrate
```

6. Khởi động server ở chế độ development:
```bash
npm run dev
```

7. Khởi động server ở chế độ production:
```bash
npm start
```

## Cấu trúc database

Backend sử dụng Sequelize ORM với các model chính:

### Nguoi_dung (User)
Quản lý thông tin người dùng trong hệ thống.
```
- id: int (PK)
- ho_ten_dem: string (Họ và tên đệm)
- ten: string (Tên)
- tai_khoan: string (Tài khoản)
- mat_khau: string (Mật khẩu đã mã hóa)
- kieu_nguoi_dung: string (Loại người dùng: học sinh, giáo viên, admin)
- gioi_tinh: boolean (Giới tính)
- ngay_sinh: date (Ngày sinh)
- sdt: string (Số điện thoại, unique)
- truong_c3: string (Trường THPT)
- lop: string (Lớp