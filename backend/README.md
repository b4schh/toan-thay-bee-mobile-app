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
PORT = 3000
HOST_NAME = 192.168.1.139 // localhost hoặc thay bằng IPv4
NODE_ENV = development
FRONTEND_URL = http://localhost:8081
NGROK_URL = https://4e04-14-191-32-178.ngrok-free.app

DB_DEV_HOST=localhost
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=070904  # Mật khẩu được định nghĩa trong deployments.yml
DB_DEV_DATABASE=toan_thay_bee
DB_DEV_PORT=3309  # Cổng được map trong deployments.yml

DB_POOL_MAX=50          # Kết nối tối đa trong pool (đề xuất: 50)
DB_POOL_MIN=10          # Kết nối tối thiểu giữ sẵn (đề xuất: 10)
DB_POOL_ACQUIRE=20000   # Thời gian chờ tối đa (ms) khi lấy kết nối (20s)
DB_POOL_IDLE=5000       # Ngắt kết nối sau (ms) khi không dùng (5s)

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

JWT_SECRET=qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm
JWT_EXPIRES_IN=30d
```

#### 3.2. Cách 2: Sử dụng MySQL đã cài đặt trên máy

Nếu bạn đã cài đặt MySQL trên máy tính của mình:

- Cần cấu hình file .env (dựa trên file .env.example) để trỏ đến MySQL local của bạn
```bash
PORT = 3000
HOST_NAME = 192.168.1.139 // localhost hoặc thay bằng IPv4
NODE_ENV = development
FRONTEND_URL = http://localhost:8081
NGROK_URL = https://4e04-14-191-32-178.ngrok-free.app

DB_DEV_HOST=localhost
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=your_password
DB_DEV_DATABASE=toan_thay_bee
DB_DEV_PORT=3306  # Cổng mặc định của MySQL

DB_POOL_MAX=50          # Kết nối tối đa trong pool (đề xuất: 50)
DB_POOL_MIN=10          # Kết nối tối thiểu giữ sẵn (đề xuất: 10)
DB_POOL_ACQUIRE=20000   # Thời gian chờ tối đa (ms) khi lấy kết nối (20s)
DB_POOL_IDLE=5000       # Ngắt kết nối sau (ms) khi không dùng (5s)

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_DATABASE_URL=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
FIREBASE_MEASUREMENT_ID=

JWT_SECRET=qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm
JWT_EXPIRES_IN=30d
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

## Lưu ý:
- Thay tất cả IP trong các file .env, index.js,... (ví dụ 192.168.1.139) thành IPv4 của máy bạn

## Cấu trúc database
- [Cấu trúc Database](./src/models/README.md).

## API
- [Tài liệu về API](./src/routes/README.md).
