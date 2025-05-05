# Cấu trúc cơ sở dữ liệu

## 1. Bảng User
### Mô tả: Lưu thông tin người dùng.
### Cột:
- **id**: (Primary Key) ID của người dùng.
- **lastName**: Họ.
- **firstName**: Tên.
- **username**: Tên đăng nhập.
- **password**: Mật khẩu.
- **userType**: Loại người dùng.
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

## 2. Bảng Class
### Mô tả: Lưu thông tin lớp học.
### Cột:
- **id**: (Primary Key) ID của lớp học.
- **name**: Tên lớp.
- **description**: Mô tả.
- **academic**Year: Năm học.
- **status**: Trạng thái.
- **slideId**: ID của slide liên kết.
- **lessonCount**: Số lượng bài học.
- **dayOfWeek**: Ngày học.
- **studyTime**: Thời gian học.
- **public**: Công khai (Boolean).
- **studentCount**: Số lượng học sinh.
- **class_code**: Mã lớp.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.
### Quan hệ:
- Class có nhiều StudentClassStatus, Lesson.
- Class thuộc về Slide.

## 3. Bảng Lesson
### Mô tả: Lưu thông tin bài học.
### Cột:
- **id**: (Primary Key) ID của bài học.
- **name**: Tên bài học.
- **description**: Mô tả.
- **learningItemCount**: Số lượng mục học tập.
- **day**: Ngày học.
- **classId**: ID của lớp học liên kết.
- **chapter**: Chương.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- Lesson thuộc về Class.
- Lesson có nhiều LearningItem.

## 4. Bảng LearningItem
### Mô tả: Lưu thông tin mục học tập.
### Cột:
- **id**: (Primary Key) ID của mục học tập.
- **name**: Tên mục học tập.
- **lessonId**: ID của bài học liên kết.
- **typeOfLearningItem**: Loại mục học tập.
- **url**: URL tài liệu.
- **deadline**: Hạn chót.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- LearningItem thuộc về Lesson.
- LearningItem có nhiều StudentStudyStatus.

## 5. Bảng Exam
### Mô tả: Lưu thông tin bài kiểm tra.
### Cột:
- **id**: (Primary Key) ID của bài kiểm tra.
- **name**: Tên bài kiểm tra.
- **class**: Lớp học.
- **typeOfExam**: Loại bài kiểm tra.
- **chapter**: Chương.
- **year**: Năm.
- **testDuration**: Thời gian làm bài.
- **description**: Mô tả.
- **passRate**: Tỷ lệ đạt.
- **solutionUrl**: URL lời giải.
- **imageUrl**: URL hình ảnh.
- **public**: Công khai (Boolean).
- **attemptLimit**: Giới hạn số lần làm bài.
- **isCheatingCheckEnabled**: Bật kiểm tra gian lận (Boolean).
- **solutionPdfUrl**: URL PDF lời giải.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- Exam có nhiều StudentExamAttempt, StudentExamStatus.
- Exam liên kết nhiều Question thông qua ExamQuestions.

## 6. Bảng Question
### Mô tả: Lưu thông tin câu hỏi.
### Cột:
- **id**: (Primary Key) ID của câu hỏi.
- **class**: Lớp học.
- **content**: Nội dung câu hỏi.
- **typeOfQuestion**: Loại câu hỏi.
- **correctAnswer**: Đáp án đúng.
- **solution**: Lời giải.
- **difficulty**: Độ khó.
- **chapter**: Chương.
- **description**: Mô tả.
- **solutionUrl**: URL lời giải.
- **imageUrl**: URL hình ảnh.
- **solutionImageUrl**: URL hình ảnh lời giải.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- Question liên kết nhiều Exam thông qua ExamQuestions.
- Question có nhiều Statement.

## 7. Bảng ExamQuestions
### Mô tả: Bảng trung gian giữa Exam và Question.
### Cột:
- **questionId**: (Primary Key) ID của câu hỏi.
- **examId**: (Primary Key) ID của bài kiểm tra.
- **order**: Thứ tự câu hỏi trong bài kiểm tra.

## 8. Bảng StudentClassStatus
### Mô tả: Lưu trạng thái của học sinh trong lớp học.
### Cột:
- **studentId**: (Primary Key) ID của học sinh.
- **classId**: (Primary Key) ID của lớp học.
- **status**: Trạng thái.
- **createdAt**: Ngày tạo.

### Quan hệ:
- StudentClassStatus thuộc về User và Class.

## 9. Bảng StudentStudyStatus
### Mô tả: Lưu trạng thái học tập của học sinh.
### Cột:
- **learningItemId**: (Primary Key) ID của mục học tập.
- **studentId**: (Primary Key) ID của học sinh.
- **isDone**: Hoàn thành (Boolean).
- **studyTime**: Thời gian học.

## Quan hệ:
- StudentStudyStatus thuộc về User và LearningItem.

## 10. Bảng StudentExamAttempt
### Mô tả: Lưu thông tin lần làm bài kiểm tra của học sinh.
### Cột:
- **studentId**: ID của học sinh.
- **examId**: ID của bài kiểm tra.
- **startTime**: Thời gian bắt đầu.
- **endTime**: Thời gian kết thúc.
- **score**: Điểm số.

### Quan hệ:
- StudentExamAttempt thuộc về User và Exam.

## 11. Bảng StudentExamStatus
### Mô tả: Lưu trạng thái bài kiểm tra của học sinh.
### Cột:
- **studentId**: ID của học sinh.
- **examId**: ID của bài kiểm tra.
- **isDone**: Hoàn thành (Boolean).
- **isSave**: Đã lưu (Boolean).
- **completionTime**: Thời gian hoàn thành.

### Quan hệ:
- StudentExamStatus thuộc về User và Exam.

## 12. Bảng Statement
### Mô tả: Lưu thông tin các đáp án hoặc phát biểu liên quan đến câu hỏi.
### Cột:
- **id**: (Primary Key) ID của phát biểu.
- **content**: Nội dung.
- **questionId**: ID của câu hỏi liên kết.
- **imageUrl**: URL hình ảnh.
- **isCorrect**: Đúng/Sai (Boolean).
- **difficulty**: Độ khó.
- **order**: Thứ tự.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- Statement thuộc về Question.

## 13. Bảng Answer
### Mô tả: Lưu thông tin câu trả lời của học sinh.
### Cột:
- **attemptId**: ID của lần làm bài.
- **questionId**: ID của câu hỏi.
- **answerContent**: Nội dung câu trả lời.
- **result**: Kết quả (Boolean).
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

### Quan hệ:
- Answer thuộc về Question.

## 14. Bảng Cheat
### Mô tả: Lưu thông tin gian lận.
### Cột:
- **typeOfCheat**: Loại gian lận.
- **attemptId**: ID của lần làm bài.
- **createdAt**: Ngày tạo.

## 15. Bảng AllCode
### Mô tả: Lưu các mã hóa chung cho hệ thống.
### Cột:
- **code**: (Primary Key) Mã.
- **type**: Loại mã.
- **description**: Mô tả.
- **createdAt**: Ngày tạo.
- **updatedAt**: Ngày cập nhật.

## 16. Bảng Article
### Mô tả: Lưu thông tin bài viết.
### Cột:
- **id**: (Primary Key) ID của bài viết.
- **name**: Tên bài viết.
- **type**: Loại bài viết (liên kết với bảng AllCode qua type).
- **class**: Lớp học (liên kết với bảng AllCode qua class).
- **chapter**: Chương (liên kết với bảng AllCode qua chapter).
- **title**: Tiêu đề bài viết.
- **content**: Nội dung bài viết (dạng văn bản dài).
- **author**: Tác giả bài viết.
- **createdAt**: Ngày tạo bài viết.
- **updatedAt**: Ngày cập nhật bài viết.

### Quan hệ:
- Article thuộc về AllCode qua các cột type, class, và chapter.

## 17. Bảng QuestionReport
### Mô tả: Lưu thông tin báo cáo câu hỏi.
### Cột:
- **id**: (Primary Key) ID của báo cáo.
- **userId**: ID của người dùng báo cáo.
- **questionId**: ID của câu hỏi được báo cáo.
- **content**: Nội dung báo cáo.
- **createdAt**: Ngày tạo báo cáo.

### Quan hệ:
- Hiện tại không có quan hệ được định nghĩa trong model, nhưng có thể liên kết với bảng User và Question qua userId và questionId.

## 18. Bảng Slide
### Mô tả: Lưu thông tin slide trình chiếu.
### Cột:
- **id**: (Primary Key) ID của slide.
- **title**: Tiêu đề slide.
- **description**: Mô tả slide.
- **createdAt**: Ngày tạo slide.
- **updatedAt**: Ngày cập nhật slide.

### Quan hệ:
- Slide có nhiều SlideImage qua slideId.

## 19. Bảng SlideImage
### Mô tả: Lưu thông tin hình ảnh trong slide.
### Cột:
- **id**: (Primary Key) ID của hình ảnh.
- **slideId**: ID của slide liên kết.
- **imageUrl**: URL của hình ảnh.

### Quan hệ:
- SlideImage thuộc về Slide qua slideId.
