# Test Cases cho Frontend

Dưới đây là bộ test cases chi tiết cho ứng dụng Toán Thầy Bee, bao gồm các tính năng chính của hệ thống. Mỗi test case được mô tả với ID, mục đích, các bước thực hiện, dữ liệu test và kết quả mong đợi.

## Tổng hợp

| ID       | Mục đích                         | Điều kiện tiên quyết          | Kết quả mong đợi                     |
|----------|----------------------------------|-------------------------------|--------------------------------------|
| TC-001   | Đăng nhập thành công             | Đã có tài khoản hợp lệ        | Chuyển sang màn hình trang chủ       |
| TC-002   | Đăng nhập sai mật khẩu           | Đã có tài khoản hợp lệ        | Hiển thị lỗi đăng nhập               |
| ...      | ...                              | ...                           | ...                                  |


## Chi tiết

### Đăng nhập và Quản lý Tài khoản

1. TC-001 – Đăng nhập thành công

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-001                                                                       |
| **Mục đích**            | Kiểm tra chức năng đăng nhập với thông tin hợp lệ                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `b4schhh` và mật khẩu `123123`             |
| **Dữ liệu test**        | Thông tin đăng nhập hợp lệ.                                                  |
| **Dữ liệu test**        | Thông tin đăng nhập hợp lệ.                                                  |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Chọn "Đăng nhập" <br> 3. Nhập tên đăng nhập và mật khẩu <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Người dùng được đăng nhập thành công <br> - Hệ thống chuyển đến màn hình trang chủ <br> - Thông tin người dùng hiển thị đúng |

2. TC-002 – Đăng nhập với mật khẩu không đúng

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-002                                                                       |
| **Mục đích**            | Kiểm tra hệ thống xử lý khi người dùng đăng nhập với mật khẩu không đúng.                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `b4schhh` và mật khẩu `123123`             |
| **Dữ liệu test**        | Thông tin đăng nhập với mật khẩu không đúng.                               |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Chọn "Đăng nhập" <br> 3. Nhập thông tin đăng nhập sai: <br> - Tên đăng nhập: `b4schhh` <br> - Mật khẩu: `123456` <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng" <br> -	Người dùng vẫn ở màn hình đăng nhập |

3. TC-003 – Đăng nhập với tên đăng nhập không tồn tại

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-003                                                                       |
| **Mục đích**            | Kiểm tra hệ thống xử lý khi người dùng đăng nhập với tên đăng nhập không tồn tại.|
| **Điều kiện tiên quyết**| Không có tài khoản với tên đăng nhập userkhongtontai                         |
| **Dữ liệu test**        | Tên đăng nhập: userkhongtontai <br>Mật khẩu: 123123                          |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Chọn "Đăng nhập" <br> 3. Nhập thông tin đăng nhập không tồn tại <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng" <br> -	Người dùng vẫn ở màn hình đăng nhập |

4. TC-004 – Xem thông tin cá nhân

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-004                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem thông tin cá nhân của người dùng.                     |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống.                                        |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập.                                           |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Thông tin cá nhân"|
| **Kết quả mong đợi**    | Hệ thống hiển thị đầy đủ thông tin cá nhân của người dùng                    |

5. TC-005 – Cập nhật thông tin cá nhân

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-005                                                                       |
| **Mục đích**            | Kiểm tra chức năng cập nhật thông tin cá nhân của người dùng.                |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống.                                        |
| **Dữ liệu test**        | Trường học mới: THPT Chu Văn An                                              |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Thông tin cá nhân" <br> 5. Nhấn nút "Chỉnh sửa" <br> 6. Cập nhật số điện thoại và trường học <br> 7. Nhấn nút "Lưu"|
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo cập nhật thành công <br> - Thông tin cá nhân được cập nhật với trường học mới|

6. TC-006 – Đổi mật khẩu

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-006                                                                       |
| **Mục đích**            | Kiểm tra chức năng đổi mật khẩu                                              |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | - Mật khẩu hiện tại: `123123` <br> - Mật khẩu mới: `654321` <br> - Xác nhận mật khẩu mới: `654321` |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Đổi mật khẩu" <br> 5. Nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới <br> 6. Nhấn nút "Đổi mật khẩu" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo đổi mật khẩu thành công <br> - Hệ thống đăng xuất ra ngoài, người dùng có thể đăng nhập bằng mật khẩu mới |

### Trang chủ và Học tập

1. TC-007 – Xem trang chủ

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-007                                                                       |
| **Mục đích**            | Kiểm tra hiển thị thông tin trên trang chủ                                   |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Trang chủ" |
| **Kết quả mong đợi**    | - Hiển thị tên người dùng và lời chào <br> - Hiển thị các lớp học đề xuất <br> - Hiển thị tổng quan về tiến độ học tập của người dùng|

2. TC-008 – Xem tổng quan học tập

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-008                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem tổng quan học tập                                     |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Trang chủ" <br> 4. Chọn "Xem chi tiết" ở phần Tổng quan |
| **Kết quả mong đợi**    | - Hiển thị thống kê về số mục học tập chưa hoàn thành <br> - Hiển thị lịch sử làm bài <br> - Hiển thị đề đã lưu |

3. TC-009 - Xem danh sách lớp học

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-010                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem danh sách lớp học                                     |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" |
| **Kết quả mong đợi**    | - Hiển thị danh sách các lớp học đã tham gia <br> - Mỗi lớp học hiển thị tên, thời gian và số lượng thành viên trong lớp |

4. TC-010 – Xem thông tin lớp học

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-010                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem chi tiết lớp học                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã gửi yêu cần tham gia ít nhất một lớp học      |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể |
| **Kết quả mong đợi**    | - Hiển thị thông tin chi tiết về lớp học <br> - Hiển thị danh sách bài học <br> - Hiển thị tiến độ học tập trong lớp <br> - Hiển thị nút "Vào học" (trong trường hợp đã được phê duyệt vào lớp) hoặc "Đang chờ phê duyệt" (trong trường hợp chưa được phê duyệt vào lớp) |

5. TC-011 – Vào học

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-011                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng vào học                                                   |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học                                       |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                                                             |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể <br> 5. Chọn "Vào học"|
| **Kết quả mong đợi**    | - Hiển thị các buổi học trong lớp <br> - Người dùng có thể xem chi tiết các buổi học |

6. TC-012 – Xem chi tiết buổi học

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-012                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng học bài trong lớp học                                                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học <br> Lớp học đó đã có ít nhất 1 buổi học có nội dung                                       |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể <br> 5. Chọn "Vào học" <br> 6. Chọn một buổi học cụ thể|
| **Kết quả mong đợi**    | - Hiển thị danh sách các mục học tập trong buổi học <br> - Có thể mở/đóng từng mục học tập <br> - Hiển thị nội dung chi tiết của mục học tập khi mở |


7. TC-013 – Tải tài liệu PDF

| Mục                   | Nội dung                                                                                              |
|------------------------|-------------------------------------------------------------------------------------------------------|
| **ID**                | TC-013                                                                                                |
| **Mục đích**          | Kiểm tra chức năng tải tài liệu PDF                                                                  |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập có tài liệu PDF                  |
| **Dữ liệu test**      | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có tài liệu PDF                                     |
| **Các bước thực hiện**| 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập có tài liệu PDF  <br>7. Nhấn vào tài liệu PDF để tải |
| **Kết quả mong đợi**  | - Tài liệu PDF được tải về máy |

8. TC-014 – Xem video bài giảng

| Mục                   | Nội dung                                                                                              |
|------------------------|-------------------------------------------------------------------------------------------------------|
| **ID**                | TC-014                                                                                                |
| **Mục đích**          | Kiểm tra chức năng xem video bài giảng                                                               |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập có video bài giảng               |
| **Dữ liệu test**      | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có video bài giảng                                 |
| **Các bước thực hiện**| 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập có video bài giảng  <br>7. Nhấn vào video để xem |
| **Kết quả mong đợi**  | - Video được mở và phát  <br>- Có thể tạm dừng/tiếp tục phát video  <br>- Có thể điều chỉnh âm lượng  <br>- Có thể chuyển sang chế độ toàn màn hình |

9. TC-015 – Đánh dấu hoàn thành nội dung học tập

| Mục                     | Nội dung                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-015                                                                                                   |
| **Mục đích**            | Kiểm tra chức năng đánh dấu hoàn thành nội dung học tập                                                  |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập                                        |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có nội dung học tập                                    |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập  <br>7. Nhấn nút "Đánh dấu hoàn thành" |
| **Kết quả mong đợi**    | - Mục học tập được đánh dấu là đã hoàn thành (hiển thị dấu tích)  <br>- Tiến độ học tập được cập nhật  <br>- Khi quay lại danh sách, mục học tập vẫn được đánh dấu là đã hoàn thành |

10. TC-016 – Bỏ đánh dấu hoàn thành nội dung học tập

| Mục                     | Nội dung                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-016                                                                                                   |
| **Mục đích**            | Kiểm tra chức năng bỏ đánh dấu hoàn thành nội dung học tập                                               |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có nội dung học tập đã được đánh dấu hoàn thành                 |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có nội dung học tập đã đánh dấu hoàn thành            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập đã đánh dấu hoàn thành  <br>7. Nhấn nút "Bỏ đánh dấu hoàn thành" |
| **Kết quả mong đợi**    | - Mục học tập không còn được đánh dấu là đã hoàn thành (dấu tích biến mất)  <br>- Tiến độ học tập được cập nhật  <br>- Khi quay lại danh sách, mục học tập không còn được đánh dấu là đã hoàn thành |

11. TC-017 – Tham gia lớp học mới

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-017                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng tham gia lớp học mới bằng mã lớp                                                            |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống <br> Có mã lớp học hợp lệ                                                 |
| **Dữ liệu test**        | Mã lớp học:                                                                                              |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Ấn vào nút dấu cộng bên cạnh thanh tìm kiếm <br> 5. Nhập mã lớp học <br> 6. Nhấn nút "Tham gia" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo tham gia lớp học thành công <br> - Lớp học mới xuất hiện trong danh sách lớp học |

12. TC-018 – Xem và hủy yêu cầu tham gia lớp học đang chờ phê duyệt

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-018                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng xem thông tin lớp học đang chờ phê duyệt và hủy yêu cầu tham gia                                           |
| **Điều kiện tiên quyết**| Người dùng đã gửi yêu cầu tham gia một lớp học (ví dụ bằng mã lớp TOAN12A) và lớp đang ở trạng thái "đang chờ phê duyệt"     |
| **Dữ liệu test**        | Tài khoản người dùng đã gửi yêu cầu tham gia lớp học TOAN12A                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn lớp học TOAN12A đang chờ phê duyệt <br> 5. Kiểm tra thông tin lớp học <br> 6. Nhấn nút "Hủy yêu cầu tham gia" |
| **Kết quả mong đợi**    | - Hiển thị thông tin chi tiết của lớp học <br> - Nút "Hủy yêu cầu tham gia" hiển thị <br> - Sau khi nhấn, hệ thống xác nhận hủy và lớp học biến mất khỏi danh sách |


12. TC-019 – Tìm kiếm lớp học theo tên

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-019                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng tìm kiếm lớp học theo tên                                          |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học     |
| **Dữ liệu test**        | Tên lớp học được nhập vào ô tìm kiếm                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Ấn vào thanh tìm kiếm và nhập tên lớp học <br> 5. Bỏ focus ra khỏi ô tìm kiếm |
| **Kết quả mong đợi**    | - Hiển thị lớp học có tên chứa nội dung tìm kiếm |

### Luyện tập và Làm bài thi

1. TC-019 – Xem danh sách đề thi

| Mục                     | Nội dung                                                                                              |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-019                                                                                                  |
| **Mục đích**            | Kiểm tra chức năng xem danh sách đề thi                                                                |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                                                    |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập                                                                     |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Luyện tập"        |
| **Kết quả mong đợi**    | - Hiển thị danh sách các bài tập và đề thi  <br>- Các bài tập được phân loại theo chủ đề, lớp, loại bài |

2. TC-020 – Tìm kiếm đề thi theo tên

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-020                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng tìm kiếm đề thi theo tên                                          |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu     |
| **Dữ liệu test**        | Tên đề thi được nhập vào ô tìm kiếm                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Luyện đề" <br> 4. Ấn vào thanh tìm kiếm và nhập tên đề thi <br> 5. Bỏ focus ra khỏi ô tìm kiếm |
| **Kết quả mong đợi**    | - Hiển thị đề thi có tên chứa nội dung tìm kiếm |

3. TC-021 – Lọc đề thi theo điều kiện

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-021                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng lọc đề thi theo điều kiện                               |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu     |
| **Dữ liệu test**        | Các điều kiện được chọn trong bộ lọc                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Luyện đề" <br> 4. Ấn vào nút Lọc bên cạnh thanh tìm kiếm <br> 5. Chọn các điều kiện (có thể chọn 1 hoặc nhiều) |
| **Kết quả mong đợi**    | - Hiển thị danh sách đề thi thỏa mãn các điều kiện được chọn |

4. TC-022 – Xem chi tiết đề thi

| Mục                     | Nội dung                                                                                                  |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-022                                                                                                      |
| **Mục đích**           | Kiểm tra chức năng xem chi tiết đề thi                                                                    |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu                                                                     |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi cụ thể                                                                         |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Luyện tập"  <br>4. Chọn một đề thi cụ thể |
| **Kết quả mong đợi**   | - Hiển thị thông tin chi tiết về đề thi  <br>- Hiển thị nút "Bắt đầu làm bài" |

5. TC-023 – Làm đề thi

| Mục                     | Nội dung                                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-023                                                                                                               |
| **Mục đích**           | Kiểm tra chức năng làm đề thi                                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                                               |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi cụ thể                                       |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Chọn tab "Luyện tập"  <br> 4. Chọn đề thi bất kì  <br> 5. Nhấn nút "Bắt đầu làm bài"  <br> 6. Trả lời các câu hỏi  <br> 7. Nhấn nút "Nộp bài" |
| **Kết quả mong đợi**   | - Hiển thị đồng hồ đếm ngược thời gian làm bài  <br> - Hiển thị các câu hỏi và lựa chọn  <br> - Người dùng có thể chọn đáp án  <br> - Sau khi nộp bài, hiển thị kết quả và điểm số |

6. TC-024 – Kiểm tra quá trình làm bài

| Mục                     | Nội dung                                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-024                                                                                                               |
| **Mục đích**           | Kiểm tra chức năng xem quá trình làm bbài                                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                                               |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi đang làm                                       |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Chọn tab "Luyện tập"  <br> 4. Chọn đề thi bất kì  <br> 5. Nhấn nút "Bắt đầu làm bài" <br> 6. Ấn vào biểu tượng Menu ở góc phải màn hình để xem quá trình làm bài |
| **Kết quả mong đợi**   | - Hiển thị đồng hồ đếm ngược thời gian làm bài  <br> - Hiển thị số thứ tự các câu hỏi theo màu sắc (Trắng - chưa làm, Xanh - đã làm, Vàng - đang làm) <br> - Hiển thị chú thích màu sắc với số lượng câu hỏi chính xác  <br> - Hiển thị nút nộp bài |