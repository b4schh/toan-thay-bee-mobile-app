# Test Cases cho Frontend

Dưới đây là bộ test cases chi tiết cho ứng dụng Toán Thầy Bee, bao gồm các tính năng chính của hệ thống. Mỗi test case được mô tả với ID, mục đích, các bước thực hiện, dữ liệu test và kết quả mong đợi.

## Đăng nhập và Quản lý Tài khoản

1. TC-001 – Đăng nhập thành công

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-001                                                                       |
| **Mục đích**            | Kiểm tra chức năng đăng nhập với thông tin hợp lệ                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `b4schhh` và mật khẩu `123123`             |
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

## Trang chủ và Học tập

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

4. TC-010 – Xem chi tiết lớp học

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-010                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem chi tiết lớp học                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học      |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể |
| **Kết quả mong đợi**    | - Hiển thị thông tin chi tiết về lớp học <br> - Hiển thị danh sách bài học <br> - Hiển thị tiến độ học tập trong lớp |

5. TC-011 – Học bài trong lớp học

| **Mục**                 | **Nội dung**                                                                                                  |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-011                                                                                                        |
| **Mục đích**            | Kiểm tra chức năng học bài trong lớp học                                                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học                                       |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                                                             |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể <br> 5. Chọn "Học tập" <br> 6. Chọn một bài học |
| **Kết quả mong đợi**    | - Hiển thị nội dung bài học <br> - Người dùng có thể xem tài liệu PDF <br> - Người dùng có thể xem video bài giảng <br> - Tiến độ học tập được cập nhật sau khi hoàn thành |

