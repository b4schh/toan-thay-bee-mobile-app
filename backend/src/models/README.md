# Cấu trúc cơ sở dữ liệu

## 1. Bảng User
### Mô tả: Lưu thông tin người dùng.
### Cột:
- **id**: (Primary Key) ID của người dùng.
- **lastName**: Họ.
- **firstName**: Tên.
- **username**: Tên đăng nhập.
- **password**: Mật khẩu.
- **userType**: Loại người dùng (ví dụ: học sinh, giáo viên).
- **gender**: Giới tính (Boolean).
- **birthDate**: Ngày sinh.
- **phone**: Số điện thoại.
- **highSchool**: Trường cấp 3.
- **class**: Lớp học.
- **email**: Email.
- **status**: Trạng thái.
- **graduationYear**: Năm tốt nghiệp.
- **highSchoolScore**: Điểm tốt nghiệp cấp 3.
- **university**: Trường đại học.
- **avatarUrl**: URL ảnh đại diện.
- **currentToken**: Token hiện tại.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.
### Quan hệ:
- User có nhiều StudentClassStatus, StudentStudyStatus, AssistantReport, StudentExamAttempt, StudentExamStatus.
