# Tài liệu API - Hệ thống Quản lý Học tập

## Tổng quan
Hệ thống API được tổ chức theo mô hình RESTful, với các endpoint được phân chia theo chức năng và đối tượng. API sử dụng Express.js làm framework chính và tuân theo cấu trúc route-controller.

## Cấu trúc URL
- Base URL: /api
- Phiên bản: /v1
- Phân quyền: /admin hoặc /user
- Đối tượng: /[tên đối tượng]

## Xác thực và Phân quyền
API sử dụng JWT (JSON Web Token) để xác thực người dùng. Các middleware phân quyền:
- requireRoles([]): Yêu cầu người dùng đã đăng nhập
- requireRoles([UserType.ADMIN]): Chỉ Admin mới có quyền truy cập
- requireRoles([UserType.ADMIN, UserType.TEACHER]): Admin hoặc Giáo viên có quyền truy cập
- requireRoles([UserType.ADMIN, UserType.TEACHER, UserType.ASSISTANT]): Admin, Giáo viên hoặc Trợ giảng có quyền truy cập

## Danh sách API Endpoints

### User API

**1. Đăng ký và Xác thực**

```
POST /api/v1/user/register - Đăng ký người dùng mới
POST /api/v1/admin/bulk-register - Đăng ký hàng loạt người dùng (Admin)
POST /api/v1/user/login - Đăng nhập
GET /api/v1/user/check-login - Kiểm tra trạng thái đăng nhập
POST /api/v1/user/logout - Đăng xuất
```

**2. Quản lý người dùng**

```
GET /api/v1/admin/user - Lấy danh sách tất cả người dùng (Admin/Teacher/Assistant)
GET /api/v1/admin/user/class/:classId - Lấy danh sách người dùng theo lớp (Admin/Teacher/Assistant)
GET /api/v1/admin/user/:id - Lấy thông tin người dùng theo ID (Admin/Teacher/Assistant)
PUT /api/v1/admin/user/:id - Cập nhật thông tin người dùng (Admin/Teacher)
PUT /api/v1/user - Cập nhật thông tin cá nhân
```

### Class API

**1. Quản lý lớp học**

```
GET /api/v1/user/class - Lấy danh sách lớp học công khai
GET /api/v1/user/class/overview - Tổng quan về các lớp học của người dùng
GET /api/v1/admin/class - Lấy tất cả lớp học (Admin/Teacher/Assistant)
GET /api/v1/user/class/:classCode - Xem chi tiết lớp học theo mã lớp
GET /api/v1/admin/class/:id - Xem chi tiết lớp học theo ID (Admin/Teacher/Assistant)
POST /api/v1/user/class/:classCode/join - Tham gia lớp học
PUT /api/v1/admin/user/:studentId/class/:classId/accept - Chấp nhận học sinh vào lớp (Admin/Teacher/Assistant)
```

**2. Nội dung học tập**

```
GET /api/v1/user/class/:classCode/lesson/learning-item - Lấy danh sách bài học và học liệu theo mã lớp
GET /api/v1/admin/class/:id/lessons - Lấy danh sách đầy đủ bài học theo ID lớp (Admin/Teacher/Assistant)
GET /api/v1/user/class/:classCode/learning - Lấy nội dung học tập đầy đủ theo mã lớp
GET /api/v1/user/class/joined - Lấy danh sách lớp học đã tham gia
```

### Lesson API

```
GET /api/v1/user/lesson/:id - Lấy thông tin bài học theo ID
GET /api/v1/user/lesson/class/:classId - Lấy danh sách bài học theo lớp
```

### Exam API

```
GET /api/v1/user/exam - Lấy danh sách bài thi
POST /api/v1/admin/exam - Tạo bài thi mới (Admin/Teacher/Assistant)
GET /api/v1/user/exam/:id - Lấy thông tin bài thi theo ID
PUT /api/v1/admin/exam/:id - Cập nhật bài thi (Admin/Teacher/Assistant)
DELETE /api/v1/admin/exam/:id - Xóa bài thi (Admin/Teacher/Assistant)
```

### Question API

```
GET /api/v1/admin/question - Lấy danh sách câu hỏi (Admin/Teacher/Assistant)
GET /api/v1/user/question/exam/:examId - Lấy danh sách câu hỏi theo bài thi
GET /api/v1/admin/question/:id - Lấy thông tin câu hỏi theo ID (Admin/Teacher/Assistant)
POST /api/v1/admin/question - Tạo câu hỏi mới (Admin/Teacher/Assistant)
```

### Statement API

```
GET /api/v1/statement/question/:questionId - Lấy danh sách phát biểu/lựa chọn theo câu hỏi
GET /api/v1/statement/:id - Lấy thông tin phát biểu/lựa chọn theo ID
POST /api/v1/statement - Tạo phát biểu/lựa chọn mới
```

### Answer API

```
GET /api/v1/answer/:id - Lấy thông tin câu trả lời theo ID
GET /api/v1/user/answer/attempt/:attemptId - Lấy danh sách câu trả lời theo lần thi
GET /api/v1/user/answer/attempt/:attemptId/questions - Lấy danh sách câu hỏi và câu trả lời theo lần thi
```

### Attempt API

```
GET /api/v1/user/attempt - Lấy danh sách lần thi của người dùng
GET /api/v1/attempt/:id - Lấy thông tin lần thi theo ID
GET /api/v1/user/attempt/exam/:examId/history - Lấy lịch sử làm bài theo bài thi
```

### Image API

```
POST /api/v1/images/google/upload-single - Tải lên một hình ảnh (Admin)
```

### Article API

```
GET /api/v1/user/article - Lấy danh sách bài viết
GET /api/v1/user/article/newest - Lấy bài viết mới nhất
GET /api/v1/user/article/:id - Lấy thông tin bài viết theo ID
PUT /api/v1/admin/article/:id - Cập nhật bài viết (Admin/Teacher/Assistant)
POST /api/v1/admin/article - Tạo bài viết mới (Admin/Teacher/Assistant)
DELETE /api/v1/admin/article/:id - Xóa bài viết (Admin/Teacher/Assistant)
```

### Slide API

```
GET /api/v1/slide - Lấy danh sách slide
GET /api/v1/slide/:id - Lấy thông tin slide theo ID
POST /api/v1/slide - Tạo slide mới
PUT /api/v1/slide/:id - Cập nhật slide
DELETE /api/v1/slide/:id - Xóa slide
```

### Code API

```
GET /api/v1/admin/code - Lấy danh sách mã code (Admin/Teacher/Assistant)
GET /api/v1/admin/code/type - Lấy danh sách mã code theo loại
```

### AssistantReport API

```
GET /api/v1/admin/assistant-report - Lấy danh sách báo cáo trợ giảng (Admin/Teacher)
```

### QuestionReport API

```
GET /api/v1/admin/question-report - Lấy danh sách báo cáo câu hỏi
```

### Cheat API

```
GET /api/v1/admin/cheat - Lấy danh sách gian lận
```

### LearningItem API

```
GET /api/v1/learning-item - Lấy danh sách học liệu
```

### Xử lý lỗi
API sử dụng middleware asyncHandler để xử lý lỗi không đồng bộ và trả về phản hồi lỗi phù hợp.

### Validation
API sử dụng middleware validate để xác thực dữ liệu đầu vào dựa trên các DTO (Data Transfer Object) được định nghĩa trong thư mục dtos/requests.

### Upload File
API hỗ trợ tải lên file với các middleware:
- uploadGoogleImageMiddleware: Tải lên hình ảnh lên Google Cloud Storage
- uploadPDF: Tải lên file PDF lên Google Cloud Storage


## Lưu ý
- Tất cả các API đều được bọc trong asyncHandler để xử lý lỗi không đồng bộ
- Các API quản trị yêu cầu quyền Admin, Teacher hoặc Assistant
- Các API người dùng yêu cầu người dùng đã đăng nhập

---

Tài liệu này cung cấp tổng quan về các API có sẵn trong hệ thống. Để biết thêm chi tiết về cấu trúc request/response và các tham số, vui lòng tham khảo mã nguồn hoặc tài liệu API chi tiết.