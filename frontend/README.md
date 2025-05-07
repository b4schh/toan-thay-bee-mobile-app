# Frontend - Ứng dụng Toán Thầy Bee

Phần frontend của ứng dụng Toán Thầy Bee được phát triển bằng React Native và Expo, cung cấp giao diện người dùng trực quan và đáp ứng cho việc học toán trên thiết bị di động.

## Cài đặt và Chạy ứng dụng

### Yêu cầu hệ thống
- Hệ điều hành Windows (khuyến khích)
- Node.js (phiên bản mới nhất)
- npm hoặc yarn
- Expo CLI
- Thiết bị di động hoặc máy ảo iOS/Android

### Các bước cài đặt

1. Clone repository và di chuyển vào thư mục frontend:
```bash
git clone https://github.com/b4schh/toan-thay-bee-mobile-app/
cd frontend
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Khởi động ứng dụng:
```bash
npx expo start
```

4. Sau khi chạy lệnh trên, Expo sẽ mở một trang web với mã QR. Bạn có thể:
   - Quét mã QR bằng ứng dụng Expo Go trên thiết bị di động
   - Nhấn 'w' để mở ứng dụng trên máy ảo Android
   - Nhấn 'a' để mở ứng dụng trên máy ảo Android
   - Nhấn 'i' để mở ứng dụng trên máy ảo iOS

## Cấu trúc thư mục

```
frontend/
├── app/                  # Các màn hình chính của ứng dụng (sử dụng Expo Router)
│   ├── (auth)/           # Nhóm màn hình xác thực
│   ├── (tabs)/           # Các tab chính
│   │   ├── account/      # Nhóm màn hình tài khoản người dùng
│   │   ├── classroom/    # Nhóm màn hình lớp học
│   │   ├── docs/         # Nhóm màn hình bài viết
│   │   ├── home/         # Nhóm màn hình trang chủ
│   │   └── practice/     # Nhóm màn hình luyện tập
│   ├── article/          # Nhóm màn hình chi tiết bài viết
│   ├── exam/             # Nhóm màn hình làm bài thi
├── assets/               # Hình ảnh, font chữ và tài nguyên khác
├── components/           # Các component tái sử dụng
├── constants/            # Các hằng số, theme, màu sắc
├── docs/                 # Tài liệu và hướng dẫn
├── features/             # Redux slices
├── hooks/                # Custom hooks
├── redux/                # Cấu hình Redux store
├── services/             # Các service gọi API
├── utils/                # Các hàm tiện ích
├── app.json              # Cấu hình Expo
├── babel.config.js       # Cấu hình Babel
├── package.json          # Thông tin package và dependencies
└── ... các file khác
```
