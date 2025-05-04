# Backend - Ứng dụng Toán Thầy Bee

Phần backend của ứng dụng Toán Thầy Bee được phát triển bằng Node.js, Express và Sequelize, cung cấp API và xử lý logic nghiệp vụ cho ứng dụng học toán online.

## Cài đặt và Chạy server

### Yêu cầu hệ thống
- Hệ điều hành Window (khuyến khích)
- Node.js (phiên bản >=22.11.0)
- npm hoặc yarn
- MySQL (có thể chạy qua Docker)
- Docker (tùy chọn)

### Các bước cài đặt

#### 1. Clone repository và di chuyển vào thư mục backend:
```bash
git clone https://github.com/b4schh/toan-thay-bee-mobile-app/
cd backend
```

#### 2. Cài đặt các dependencies:
```bash
npm install
```

#### 3. Cấu hình database (2 cách):

#### 3.1. Cách 1: Sử dụng Docker để chạy MySQL

Nếu bạn không muốn cài đặt MySQL trực tiếp trên máy hoặc muốn một môi trường cô lập:

- Sử dụng Docker Compose để khởi động container MySQL:
```bash
docker compose -f ./deployments.yml up -d
```

- Cấu hình file .env (dựa trên file .env.example) để trỏ đến MySQL trong Docker:
```bash
DB_DEV_HOST=localhost
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=070904  # Mật khẩu được định nghĩa trong deployments.yml
DB_DEV_DATABASE=toan_thay_bee
DB_DEV_PORT=3309  # Cổng được map trong deployments.yml
```

#### 3.2. Cách 2: Sử dụng MySQL đã cài đặt trên máy

Nếu bạn đã cài đặt MySQL trên máy tính của mình:

- Cần cấu hình file .env (dựa trên file .env.example) để trỏ đến MySQL local của bạn
```bash
DB_DEV_HOST=localhost
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=your_password
DB_DEV_DATABASE=toan_thay_bee
DB_DEV_PORT=3306  # Cổng mặc định của MySQL
```

- Tạo database toan_thay_bee (nếu chưa có):
```bash
CREATE DATABASE toan_thay_bee;
```

#### 4. Chạy migrations để tạo cấu trúc database:
```bash
cd src
npx sequelize-cli db:migrate
```

#### 5. Chạy seeders để tạo các dữ liệu cần thiết cho database:
```bash
# Lưu ý: Đảm bảm database đang hoạt động trước khi chạy seeders
cd src
npx sequelize-cli db:seed:all
```

#### 6. Khởi động server ở chế độ development:
```bash
npm run dev
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
