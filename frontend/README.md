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
│   ├── (tabs)/           # Các tab chính
│   │   ├── account/      # Màn hình tài khoản người dùng
│   │   │   ├── index.js              # Trang chính tài khoản
│   │   │   ├── edit-profile.js       # Chỉnh sửa hồ sơ
│   │   │   ├── settings.js           # Cài đặt
│   │   │   └── terms-of-service.js   # Điều khoản dịch vụ
│   │   ├── docs/         # Màn hình bài viết
│   │   │   └── index.js              # Danh sách bài viết
│   │   ├── home/         # Màn hình trang chủ
│   │   │   └── index.js              # Trang chủ
│   │   └── practice/     # Màn hình luyện tập
│   │       ├── index.js              # Danh sách bài tập
│   │       └── [id]/                 # Chi tiết bài tập theo ID
│   ├── article/          # Màn hình chi tiết bài viết
│   │   ├── index.js                  # Redirect đến docs
│   │   └── [id]/                     # Chi tiết bài viết theo ID
│   ├── auth/             # Màn hình xác thực
│   │   ├── login.js                  # Đăng nhập
│   │   ├── register.js               # Đăng ký
│   │   └── forgot-password.js        # Quên mật khẩu
│   ├── class/            # Màn hình lớp học
│   │   ├── index.js                  # Danh sách lớp học
│   │   └── [id]/                     # Chi tiết lớp học theo ID
│   ├── exam/             # Màn hình làm bài thi
│   │   ├── [id]/                     # Chi tiết bài thi theo ID
│   │   │   ├── do-exam.js            # Làm bài thi
│   │   │   └── result.js             # Kết quả bài thi
│   └── profile/          # Màn hình hồ sơ người dùng
│       └── index.js                  # Hồ sơ người dùng
├── assets/               # Hình ảnh, font chữ và tài nguyên khác
│   ├── fonts/            # Font chữ
│   └── images/           # Hình ảnh
├── components/           # Các component tái sử dụng
│   ├── AppText.js                    # Component text tùy chỉnh
│   ├── button/                       # Component nút bấm
│   │   └── Button.js                 # Nút bấm tùy chỉnh
│   ├── card/                         # Component thẻ
│   │   ├── ArticleCard.js            # Thẻ bài viết
│   │   ├── ClassCard.js              # Thẻ lớp học
│   │   └── ExamCard.js               # Thẻ bài thi
│   ├── dialog/                       # Component hộp thoại
│   │   └── Dialog.js                 # Hộp thoại tùy chỉnh
│   ├── EmptyView.js                  # Component hiển thị khi không có dữ liệu
│   ├── form/                         # Component biểu mẫu
│   │   ├── FormInput.js              # Input biểu mẫu
│   │   └── FormSelect.js             # Select biểu mẫu
│   ├── HeaderWithBackButton.js       # Header có nút quay lại
│   ├── latex/                        # Component hiển thị công thức toán
│   │   └── MathMarkdownViewer.js     # Hiển thị Markdown có công thức toán
│   ├── learning-item/                # Component mục học tập
│   │   ├── LearningItemCard.js       # Thẻ mục học tập
│   │   ├── LearningItemContent.js    # Nội dung mục học tập
│   │   └── YouTubePlayer.js          # Trình phát video YouTube
│   ├── LoadingOverlay.js             # Overlay hiển thị khi đang tải
│   ├── Pagination.js                 # Component phân trang
│   ├── pdf-viewer/                   # Component xem PDF
│   │   └── PdfWebView.js             # WebView hiển thị PDF
│   └── TabBarIcon.js                 # Icon cho thanh tab
├── constants/            # Các hằng số, theme, màu sắc
│   ├── colors.js                     # Định nghĩa màu sắc
│   ├── layout.js                     # Định nghĩa kích thước
│   ├── endpoints.js                  # Định nghĩa API endpoints
│   └── theme.js                      # Định nghĩa theme
├── features/             # Redux slices
│   ├── article/                      # Slice bài viết
│   │   └── articleSlice.js           # Slice quản lý state bài viết
│   ├── auth/                         # Slice xác thực
│   │   └── authSlice.js              # Slice quản lý state xác thực
│   ├── class/                        # Slice lớp học
│   │   └── classSlice.js             # Slice quản lý state lớp học
│   └── exam/                         # Slice bài thi
│       └── examSlice.js              # Slice quản lý state bài thi
├── hooks/                # Custom hooks
│   ├── useAuth.js                    # Hook xác thực
│   ├── useForm.js                    # Hook quản lý form
│   └── useApi.js                     # Hook gọi API
├── navigation/           # Cấu hình điều hướng
│   └── LinkingConfiguration.js       # Cấu hình deep linking
├── services/             # Các service gọi API
│   ├── api.js                        # Cấu hình Axios
│   ├── articleService.js             # Service bài viết
│   ├── authService.js                # Service xác thực
│   ├── classService.js               # Service lớp học
│   └── examService.js                # Service bài thi
├── store/                # Cấu hình Redux store
│   └── index.js                      # Cấu hình store
├── utils/                # Các hàm tiện ích
│   ├── dateUtils.js                  # Xử lý ngày tháng
│   ├── formatUtils.js                # Định dạng dữ liệu
│   ├── storageUtils.js               # Xử lý lưu trữ local
│   └── validationUtils.js            # Kiểm tra dữ liệu
├── App.js                # Component gốc của ứng dụng
├── app.json              # Cấu hình Expo
├── babel.config.js       # Cấu hình Babel
└── package.json          # Thông tin package và dependencies
```

## Các tính năng chính

### Hệ thống tab
- **Trang chủ**: Hiển thị các lớp học, bài học mới nhất và tiến độ học tập
- **Bài viết**: Danh sách các bài viết chuyên sâu về toán học
- **Luyện tập**: Danh sách các bài tập và đề thi
- **Tài khoản**: Quản lý thông tin cá nhân và cài đặt

### Hiển thị bài viết
- Danh sách bài viết với tìm kiếm và lọc
- Xem chi tiết bài viết với hỗ trợ hiển thị công thức toán học
- Phân trang và làm mới dữ liệu

### Học tập
- Xem video bài giảng từ YouTube
- Đọc tài liệu PDF với đầy đủ công thức toán học
- Làm bài tập với nhiều dạng câu hỏi khác nhau
- Đánh dấu hoàn thành các mục học tập

### Làm bài thi
- Làm bài thi với thời gian giới hạn
- Xem kết quả và lời giải chi tiết
- Lưu lịch sử làm bài

### Quản lý tài khoản
- Đăng nhập, đăng ký, quên mật khẩu
- Chỉnh sửa thông tin cá nhân
- Xem lịch sử học tập
- Cài đặt ứng dụng

## Công nghệ sử dụng

- **React Native**: Framework để xây dựng ứng dụng di động đa nền tảng
- **Expo**: Nền tảng giúp phát triển ứng dụng React Native dễ dàng hơn
- **Redux**: Quản lý state toàn cục của ứng dụng
- **Redux Toolkit**: Bộ công cụ giúp viết Redux dễ dàng hơn
- **React Navigation**: Quản lý điều hướng trong ứng dụng
- **Expo Router**: Hệ thống điều hướng dựa trên file
- **Axios**: Thư viện HTTP client để gọi API
- **MathJax**: Hiển thị công thức toán học phức tạp
- **React Native WebView**: Hiển thị nội dung web trong ứng dụng
- **Expo Vector Icons**: Bộ icon cho ứng dụng
- **AsyncStorage**: Lưu trữ dữ liệu local
- **React Native Reanimated**: Animation cho ứng dụng

## Lưu ý phát triển

### Cấu trúc điều hướng
Ứng dụng sử dụng Expo Router với cấu trúc điều hướng dựa trên file. Mỗi file trong thư mục `app` tương ứng với một route trong ứng dụng. Thư mục `(tabs)` chứa các tab chính của ứng dụng.

### State Management
Ứng dụng sử dụng Redux để quản lý state toàn cục. Mỗi tính năng có một slice riêng trong thư mục `features`.

### API Calls
Các cuộc gọi API được tổ chức trong thư mục `services`. Mỗi service tương ứng với một tính năng của ứng dụng.

### Component
Các component được tổ chức theo chức năng trong thư mục `components`. Mỗi component được thiết kế để có thể tái sử dụng trong nhiều màn hình khác nhau.

### Hiển thị công thức toán học
Ứng dụng sử dụng MathJax để hiển thị công thức toán học. Component `MathMarkdownViewer` được sử dụng để hiển thị nội dung Markdown có chứa công thức toán học.

### Xử lý lỗi
Ứng dụng có cơ chế xử lý lỗi toàn cục, hiển thị thông báo lỗi cho người dùng và ghi log lỗi để debug.

## Hướng dẫn đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ:
- [Tên của bạn] - [Email hoặc thông tin liên hệ]
