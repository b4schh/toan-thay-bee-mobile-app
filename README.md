# Ứng dụng Toán Thầy Bee

Ứng dụng học toán thông minh giúp học sinh tiếp cận kiến thức toán học một cách dễ dàng và thú vị. Dự án này được phát triển như một đồ án môn học, nhằm tạo ra một nền tảng học tập toán học hiện đại, tương tác và hiệu quả.

## Tổng quan

Toán Thầy Bee là ứng dụng di động được thiết kế để hỗ trợ học sinh trong việc học toán với các tính năng:

- Học lý thuyết toán qua tài liệu PDF và video bài giảng chất lượng cao.
- Làm bài tập và kiểm tra kiến thức với nhiều dạng bài khác nhau.
- Theo dõi tiến độ học tập cá nhân.
- Truy cập các bài viết chuyên sâu về toán học.
- Giao diện thân thiện, dễ sử dụng trên các thiết bị di động.
- Hỗ trợ hiển thị công thức toán học phức tạp.

> Đây là mô tả tổng thể dự án. Bao gồm cách setup toàn bộ frontend + backend.

📂 Chi tiết:
- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Cấu trúc dự án

Dự án được chia thành ba phần chính:
1. **Admin**: Giao diện quản trị hệ thống, quản lý người dùng, lớp học, bài học, bài viết, đề thi.
2. **Frontend**: Ứng dụng di động được phát triển bằng React Native và Expo, cung cấp giao diện người dùng trực quan và đáp ứng.
3. **Backend**: API server được phát triển bằng Node.js, Express và Sequelize, xử lý logic nghiệp vụ và quản lý dữ liệu.

Hai phần này tương tác với nhau thông qua RESTful API, đảm bảo tính linh hoạt và khả năng mở rộng của hệ thống.

## Yêu cầu hệ thống

Để cài đặt và chạy dự án, bạn cần:

- Node.js (phiên bản >=22.11.0).
- npm hoặc yarn (trình quản lý gói).
- Expo CLI (để phát triển và chạy ứng dụng React Native).
- MySQL (hệ quản trị cơ sở dữ liệu).
- Docker (tùy chọn, để chạy MySQL trong container).
- Thiết bị di động hoặc máy ảo để chạy ứng dụng (iOS/Android).

## Hướng dẫn cài đặt

### Admin
- [Admin](./admin/README.md#cài-đặt-và-thiết-lập).

### Frontend
- [Frontend](./frontend/README.md#cài-đặt-và-chạy-ứng-dụng).

### Backend
- [Backend](./backend/README.md#cài-đặt-và-chạy-server).

## Công nghệ sử dụng

### Frontend
- **React Native**: Framework để xây dựng ứng dụng di động đa nền tảng.
- **Expo**: Nền tảng giúp phát triển ứng dụng React Native dễ dàng hơn.
- **Redux**: Quản lý state toàn cục của ứng dụng.
- **React Navigation**: Quản lý điều hướng trong ứng dụng.
- **Expo Router**: Hệ thống điều hướng dựa trên file.
- **MathJax**: Hiển thị công thức toán học phức tạp.
- **YouTube Player**: Tích hợp xem video từ YouTube.
- **PDF Viewer**: Hiển thị tài liệu PDF trong ứng dụng.

### Backend
- **Node.js**: Môi trường runtime JavaScript phía server.
- **Express**: Framework web cho Node.js.
- **Sequelize ORM**: ORM để tương tác với database.
- **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ.
- **JWT Authentication**: Xác thực người dùng bằng JSON Web Token.
- **Bcrypt**: Mã hóa mật khẩu.
- **Firebase**: Lưu trữ và quản lý file.
- **Socket.io**: Giao tiếp thời gian thực.
- **Multer**: Xử lý upload file.
- **XLSX**: Xử lý file Excel.

## Tính năng chính

### 1. Hệ thống xác thực và quản lý người dùng
- **Đăng nhập**: Hệ thống xác thực người dùng với username và password được cung cấp từ giáo viên.
- **Xem thông tin cá nhân**: Hiển thị thông tin như họ tên, email, số điện thoại, trường học, lớp.
- **Chỉnh sửa hồ sơ**: Người dùng có thể cập nhật thông tin cá nhân.
- **Ảnh đại diện**: Tải lên và quản lý ảnh đại diện.
- **Xem lịch sử học tập**: Theo dõi các bài học đã hoàn thành, bài thi đã làm.

### 2. Hệ thống lớp học và bài học

#### 2.1. Quản lý lớp học:
- **Danh sách lớp học**: Hiển thị các lớp học được phân loại theo cấp độ, năm học.
- **Chi tiết lớp học**: Xem thông tin chi tiết về lớp học, bao gồm mô tả, số buổi học.
- **Đăng ký lớp học**: Người dùng có thể đăng ký tham gia lớp học.

#### 2.2. Quản lý buổi học:
- **Danh sách buổi học**: Hiển thị các buổi học trong một lớp.
- **Chi tiết buổi học**: Xem thông tin chi tiết về buổi học, bao gồm mô tả, các mục học tập.

#### 2.3. Mục học tập đa dạng:
- **Video bài giảng**: Xem video bài giảng từ YouTube.
- **Tài liệu PDF**: Có thể tải tài liệu buổi học về máy.
- **Bài tập về nhà**: Truy cập và làm bài tập được giao.
- **Đánh dấu hoàn thành**: Người dùng có thể đánh dấu đã hoàn thành hoặc chưa hoàn thành một mục học tập.

### 3. Hệ thống bài viết chuyên sâu

#### 3.1. Quản lý bài viết
- **Danh sách bài viết**: Hiển thị các bài viết chuyên sâu về toán học.
- **Tìm kiếm và lọc bài viết**: Tìm kiếm bài viết theo tiêu đề, chủ đề.
- **Chi tiết bài viết**: Xem nội dung đầy đủ của bài viết.
 
#### 3.2. Hiển thị nội dung toán học
- **Hỗ trợ công thức toán học**: Sử dụng thư viện WebView kết hợp MathJax để hiển thị công thức toán học phức tạp.
- **Định dạng Markdown**: Hỗ trợ định dạng văn bản phong phú.
- **Thông tin meta**: Hiển thị thông tin tác giả, ngày đăng, mô tả ngắn.

### 4. Hệ thống luyện tập và kiểm tra

#### 4.1. Quản lý đề thi
- **Danh sách đề thi**: Hiển thị các đề thi được phân loại theo lớp, chương, loại đề.
- **Chi tiết đề thi**: Xem thông tin chi tiết về đề thi, bao gồm thời gian làm bài, mô tả, tỷ lệ đạt.
- **Đánh dấu đề thi**: Người dùng có thể đánh dấu đề thi yêu thích.

#### 4.2. Làm bài thi
- **Giao diện làm bài**: Hiển thị câu hỏi và các lựa chọn trả lời.
- **Đếm ngược thời gian**: Hiển thị thời gian còn lại để làm bài.
- **Điều hướng câu hỏi**: Di chuyển giữa các câu hỏi, đánh dấu câu hỏi để xem lại.
- **Nộp bài**: Nộp bài thi khi hoàn thành hoặc hết thời gian.

#### 4.3. Kết quả và phân tích
- **Hiển thị điểm số**: Xem điểm số và tỷ lệ đúng sau khi làm bài.
- **Xem lời giải**: Xem lời giải chi tiết cho từng câu hỏi.
- **Phân tích kết quả**: Thống kê về thời gian làm bài, câu trả lời đúng/sai.
- **Lịch sử làm bài**: Xem lại các lần làm bài trước đó.

#### 4.4. Loại câu hỏi đa dạng
- **Trắc nghiệm**: Câu hỏi với nhiều lựa chọn.
- **Tự luận**: Câu hỏi yêu cầu nhập câu trả lời.
- **Điền khuyết**: Câu hỏi yêu cầu điền vào chỗ trống.

### 5. Giao diện người dùng và trải nghiệm

#### 5.1. Hệ thống tab chính
- **Tab Trang chủ**: Hiển thị tổng quan về tiến độ học tập, lớp học, bài học mới.
- **Tab Bài viết**: Truy cập các bài viết chuyên sâu về toán học.
- **Tab Luyện tập**: Truy cập các đề thi và bài tập.
- **Tab Tài khoản**: Quản lý thông tin cá nhân và cài đặt.

#### 5.2. Các component UI chung
- **HeaderWithBackButton**: Tiêu đề trang với nút quay lại.
- **AppText**: Văn bản được tùy chỉnh riêng của ứng dụng.
- **Button**: Nút bấm tùy chỉnh với nhiều kiểu dáng.
- **Card**: Các loại thẻ hiển thị thông tin (ArticleCard, ClassCard, ExamCard).
- **Dialog**: Hộp thoại thông báo, xác nhận.
- **LoadingOverlay**: Hiển thị khi đang tải dữ liệu.
- **Pagination**: Phân trang cho danh sách dài.
- **EmptyView**: Hiển thị khi không có dữ liệu.

#### 5.3. Trải nghiệm người dùng
- **Responsive Design**: Giao diện thích ứng với nhiều kích thước màn hình.
- **Animations**: Sử dụng React Native Reanimated cho các hiệu ứng mượt mà.
- **Offline Support**: Có khả năng lưu trữ dữ liệu local với AsyncStorage.
- **Error Handling**: Xử lý và hiển thị lỗi một cách thân thiện.
- **Loading States**: Hiển thị trạng thái đang tải dữ liệu.

### 6. Tính năng backend
#### 6.1. Xác thực và bảo mật
- **JWT Authentication**: Xác thực người dùng bằng JSON Web Token.
- **Bcrypt**: Mã hóa mật khẩu người dùng.
- **Middleware xác thực**: Kiểm tra quyền truy cập API.

#### 6.2. Quản lý file
- **Upload file**: Xử lý tải lên file với Multer.
- **Firebase Storage**: Lưu trữ và quản lý file trên Firebase.

#### 6.3. API RESTful
- **CRUD Operations**: Các endpoint API cho tất cả các tính năng.
- **Validation**: Kiểm tra dữ liệu đầu vào.
- **Error Handling**: Xử lý lỗi và trả về thông báo phù hợp.

#### 6.4. Giao tiếp thời gian thực
- **Socket.io**: Hỗ trợ giao tiếp thời gian thực (được đề cập trong tài liệu).

#### 6.5. Xử lý dữ liệu
- **Sequelize ORM**: Tương tác với database MySQL.
- **XLSX**: Xử lý file Excel (có thể dùng cho import/export dữ liệu).

## Kết luận

Ứng dụng Toán Thầy Bee là một nền tảng học tập toán học toàn diện với nhiều tính năng phong phú. Ứng dụng không chỉ cung cấp nội dung học tập đa dạng (video, PDF, bài tập) mà còn có hệ thống kiểm tra, đánh giá và theo dõi tiến độ học tập. Giao diện người dùng được thiết kế thân thiện, dễ sử dụng với nhiều component tùy chỉnh. Backend được xây dựng vững chắc với các công nghệ hiện đại như Node.js, Express, Sequelize và JWT, đảm bảo tính bảo mật và hiệu suất cao.

Ứng dụng này rõ ràng hướng đến việc tạo ra một môi trường học tập toán học hiệu quả, tương tác và thú vị cho học sinh, đồng thời cung cấp các công cụ để theo dõi và đánh giá tiến trình học tập.

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
