# Ứng dụng Toán Thầy Bee

Ứng dụng học toán thông minh giúp học sinh tiếp cận kiến thức toán học một cách dễ dàng và thú vị. Dự án này được phát triển như một đồ án môn học, nhằm tạo ra một nền tảng học tập toán học hiện đại, tương tác và hiệu quả.

## Tổng quan

Toán Thầy Bee là ứng dụng di động được thiết kế để hỗ trợ học sinh trong việc học toán với các tính năng:

- Học lý thuyết toán qua tài liệu PDF và video bài giảng chất lượng cao
- Làm bài tập và kiểm tra kiến thức với nhiều dạng bài khác nhau
- Theo dõi tiến độ học tập cá nhân
- Truy cập các bài viết chuyên sâu về toán học
- Giao diện thân thiện, dễ sử dụng trên các thiết bị di động
- Hỗ trợ hiển thị công thức toán học phức tạp

> Đây là mô tả tổng thể dự án. Bao gồm cách setup toàn bộ frontend + backend.

📂 Chi tiết:
- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Cấu trúc dự án

Dự án được chia thành hai phần chính:

1. **Frontend**: Ứng dụng di động được phát triển bằng React Native và Expo, cung cấp giao diện người dùng trực quan và đáp ứng.
2. **Backend**: API server được phát triển bằng Node.js, Express và Sequelize, xử lý logic nghiệp vụ và quản lý dữ liệu.

Hai phần này tương tác với nhau thông qua RESTful API, đảm bảo tính linh hoạt và khả năng mở rộng của hệ thống.

## Yêu cầu hệ thống

Để cài đặt và chạy dự án, bạn cần:

- Node.js (phiên bản >=22.11.0)
- npm hoặc yarn (trình quản lý gói)
- Expo CLI (để phát triển và chạy ứng dụng React Native)
- MySQL (hệ quản trị cơ sở dữ liệu)
- Docker (tùy chọn, để chạy MySQL trong container)
- Thiết bị di động hoặc máy ảo để chạy ứng dụng (iOS/Android)

## Hướng dẫn cài đặt

### Frontend

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt các dependencies
npm install

# Khởi động ứng dụng
npx expo start
```

Sau khi chạy lệnh trên, Expo sẽ mở một trang web với mã QR. Bạn có thể:
- Quét mã QR bằng ứng dụng Expo Go trên thiết bị di động
- Nhấn 'a' để mở ứng dụng trên máy ảo Android
- Nhấn 'i' để mở ứng dụng trên máy ảo iOS

### Backend
- [Backend](./backend/README.md#cài-đặt-và-chạy-server)
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các dependencies
npm install

# Cấu hình database
# Tạo file .env dựa trên .env.example và cấu hình kết nối database

# Khởi động MySQL bằng Docker (tùy chọn)
docker compose -f ./deployments.yml up -d

# Chạy migrations để tạo cấu trúc database
npx sequelize-cli db:migrate

# Khởi động server ở chế độ development
npm run dev
```

## Công nghệ sử dụng

### Frontend
- **React Native**: Framework để xây dựng ứng dụng di động đa nền tảng
- **Expo**: Nền tảng giúp phát triển ứng dụng React Native dễ dàng hơn
- **Redux**: Quản lý state toàn cục của ứng dụng
- **React Navigation**: Quản lý điều hướng trong ứng dụng
- **Expo Router**: Hệ thống điều hướng dựa trên file
- **MathJax**: Hiển thị công thức toán học phức tạp
- **YouTube Player**: Tích hợp xem video từ YouTube
- **PDF Viewer**: Hiển thị tài liệu PDF trong ứng dụng

### Backend
- **Node.js**: Môi trường runtime JavaScript phía server
- **Express**: Framework web cho Node.js
- **Sequelize ORM**: ORM để tương tác với database
- **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ
- **JWT Authentication**: Xác thực người dùng bằng JSON Web Token
- **Bcrypt**: Mã hóa mật khẩu
- **Firebase**: Lưu trữ và quản lý file
- **Socket.io**: Giao tiếp thời gian thực
- **Multer**: Xử lý upload file
- **XLSX**: Xử lý file Excel

## Tính năng chính

- **Đăng nhập/Đăng ký**: Hệ thống xác thực người dùng với nhiều phương thức (email/password, Google, Facebook)
- **Danh sách bài học**: Phân loại theo lớp, chương, chủ đề giúp dễ dàng tìm kiếm
- **Học liệu đa dạng**: 
  - Tài liệu PDF với đầy đủ công thức toán học
  - Video bài giảng từ YouTube
  - Bài tập tương tác
- **Bài viết chuyên sâu**: Các bài viết về lý thuyết toán học, kỹ thuật giải bài tập
- **Theo dõi tiến độ**: Đánh dấu bài học đã hoàn thành, xem lịch sử học tập
- **Làm bài tập**: 
  - Hệ thống bài tập đa dạng (trắc nghiệm, tự luận, điền khuyết)
  - Kiểm tra kiến thức với thời gian giới hạn
  - Xem lời giải chi tiết
  - Thống kê kết quả làm bài
- **Trang cá nhân**: Quản lý thông tin cá nhân, xem lịch sử học tập

## Cấu trúc thư mục

### Frontend
```
frontend/
├── app/                  # Các màn hình chính của ứng dụng
│   ├── (tabs)/           # Các tab chính
│   │   ├── account/      # Màn hình tài khoản
│   │   ├── docs/         # Màn hình bài viết
│   │   ├── home/         # Màn hình trang chủ
│   │   └── practice/     # Màn hình luyện tập
│   ├── article/          # Màn hình chi tiết bài viết
│   ├── auth/             # Màn hình đăng nhập/đăng ký
│   ├── class/            # Màn hình lớp học
│   ├── exam/             # Màn hình làm bài thi
│   └── profile/          # Màn hình hồ sơ người dùng
├── assets/               # Hình ảnh, font chữ
│   ├── fonts/            # Font chữ
│   └── images/           # Hình ảnh
├── components/           # Các component tái sử dụng
│   ├── button/           # Component nút bấm
│   ├── card/             # Component thẻ
│   ├── dialog/           # Component hộp thoại
│   ├── form/             # Component biểu mẫu
│   ├── latex/            # Component hiển thị công thức toán
│   ├── learning-item/    # Component mục học tập
│   ├── pdf-viewer/       # Component xem PDF
│   └── youtube/          # Component xem video YouTube
├── constants/            # Các hằng số, theme, màu sắc
│   ├── colors.js         # Màu sắc
│   ├── layout.js         # Kích thước
│   └── theme.js          # Theme
├── features/             # Redux slices
│   ├── article/          # Slice bài viết
│   ├── auth/             # Slice xác thực
│   ├── class/            # Slice lớp học
│   └── exam/             # Slice bài thi
├── hooks/                # Custom hooks
├── navigation/           # Cấu hình điều hướng
├── services/             # Các service gọi API
├── store/                # Cấu hình Redux store
├── utils/                # Các hàm tiện ích
└── App.js                # Component gốc của ứng dụng
```

### Backend
```
backend/
├── src/
│   ├── controllers/      # Xử lý logic
│   │   ├── authController.js     # Xử lý xác thực
│   │   ├── userController.js     # Xử lý người dùng
│   │   ├── classController.js    # Xử lý lớp học
│   │   ├── examController.js     # Xử lý bài thi
│   │   └── articleController.js  # Xử lý bài viết
│   ├── models/           # Mô hình dữ liệu
│   │   ├── nguoi_dung.js         # Model người dùng
│   │   ├── lop.js                # Model lớp học
│   │   ├── buoi_hoc.js           # Model buổi học
│   │   ├── muc_hoc_tap.js        # Model mục học tập
│   │   ├── de.js                 # Model đề thi
│   │   ├── cau_hoi.js            # Model câu hỏi
│   │   └── all_code.js           # Model mã code
│   ├── routes/           # Định nghĩa API routes
│   │   ├── authRoutes.js         # Routes xác thực
│   │   ├── userRoutes.js         # Routes người dùng
│   │   ├── classRoutes.js        # Routes lớp học
│   │   ├── examRoutes.js         # Routes bài thi
│   │   └── articleRoutes.js      # Routes bài viết
│   ├── middlewares/      # Middleware
│   │   ├── authMiddleware.js     # Middleware xác thực
│   │   ├── errorMiddleware.js    # Middleware xử lý lỗi
│   │   └── uploadMiddleware.js   # Middleware upload file
│   ├── config/           # Cấu hình
│   │   ├── database.js           # Cấu hình database
│   │   ├── firebase.js           # Cấu hình Firebase
│   │   └── jwt.js                # Cấu hình JWT
│   ├── utils/            # Các hàm tiện ích
│   │   ├── logger.js             # Ghi log
│   │   ├── validator.js          # Kiểm tra dữ liệu
│   │   └── helpers.js            # Hàm hỗ trợ
│   └── index.js          # Điểm khởi đầu của ứng dụng
├── migrations/           # Các file migration
├── seeders/              # Dữ liệu mẫu
├── .env                  # Biến môi trường
├── .env.example          # Mẫu biến môi trường
├── package.json          # Thông tin package
└── deployments.yml       # Cấu hình Docker
```

## Tác giả

- Mai Khoa Bách
- Nguyễn Minh Đức
- Đồng Văn Hảo
- Nguyễn Văn Quang


## Lời cảm ơn

Chúng tôi xin gửi lời cảm ơn đến:
- Thầy giáo Nguyễn Đình Quý đã hỗ trợ và hướng dẫn trong quá trình thực hiện đồ án
- Các thư viện mã nguồn mở đã được sử dụng trong dự án
- Cộng đồng React Native và Expo đã cung cấp tài liệu và hỗ trợ

