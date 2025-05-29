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
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Chỉnh sửa thông tin"|
| **Kết quả mong đợi**    | Hệ thống hiển thị đầy đủ thông tin cá nhân của người dùng                    |

5. TC-005 – Thay đổi ảnh đại diện

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-005                                                                                             |
| **Mục đích**           | Kiểm tra chức năng thay đổi ảnh đại diện                                                           |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Ảnh mới từ thư viện ảnh                                 |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Nhấn vào ảnh đại diện <br> 5. Chọn "Chọn ảnh" <br> 6. Chọn ảnh từ thư viện <br> 7. Chỉnh sửa ảnh và Lưu thay đổi |
| **Kết quả mong đợi**   | - Hiển thị tùy chọn chọn ảnh từ thư viện <br> - Có thể chọn và cắt ảnh <br> - Sau khi xác nhận, ảnh đại diện mới được cập nhật <br> - Ảnh mới được hiển thị trong trang thông tin cá nhân |


6. TC-006 – Cập nhật thông tin cá nhân

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-006                                                                       |
| **Mục đích**            | Kiểm tra chức năng cập nhật thông tin cá nhân của người dùng.                |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống.                                        |
| **Dữ liệu test**        | Trường học mới: THPT Chu Văn An                                              |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Chỉnh sửa thông tin" <br> 5. Cập nhật trường học <br> 6. Nhấn nút "Lưu thay đổi"|
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo cập nhật thành công <br> - Thông tin cá nhân được cập nhật với trường học mới|

7. TC-007 – Đổi mật khẩu

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-007                                                                       |
| **Mục đích**            | Kiểm tra chức năng đổi mật khẩu                                              |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | - Mật khẩu hiện tại: `123123` <br> - Mật khẩu mới: `654321` <br> - Xác nhận mật khẩu mới: `654321` |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Chọn "Đổi mật khẩu" <br> 5. Nhập mật khẩu hiện tại, mật khẩu mới và xác nhận mật khẩu mới <br> 6. Nhấn nút "Đổi mật khẩu" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo đổi mật khẩu thành công <br> - Hệ thống đăng xuất ra ngoài, người dùng có thể đăng nhập bằng mật khẩu mới |

8. TC-008 – Đăng xuất

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-008                                                                                             |
| **Mục đích**           | Kiểm tra chức năng đăng xuất                                                                       |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | Tài khoản người dùng đã đăng nhập                                                                  |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Tài khoản" <br> 4. Cuộn xuống cuối trang <br> 5. Nhấn nút "Đăng xuất"|
| **Kết quả mong đợi**   | - Người dùng được đăng xuất khỏi hệ thống <br> - Chuyển đến màn hình đăng nhập <br> - Không thể truy cập các tính năng yêu cầu đăng nhập |

### Trang chủ và Học tập

1. TC-009 – Xem trang chủ

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-009                                                                       |
| **Mục đích**            | Kiểm tra hiển thị thông tin trên trang chủ                                   |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Trang chủ" |
| **Kết quả mong đợi**    | - Hiển thị tên người dùng và lời chào <br> - Hiển thị các lớp học đề xuất <br> - Hiển thị tổng quan về tiến độ học tập của người dùng|

2. TC-010 – Xem tổng quan học tập

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-010                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem tổng quan học tập                                     |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Trang chủ" <br> 4. Chọn "Xem chi tiết" ở phần Tổng quan |
| **Kết quả mong đợi**    | - Hiển thị thống kê về số mục học tập chưa hoàn thành <br> - Hiển thị lịch sử làm bài <br> - Hiển thị đề đã lưu |

3. TC-011 - Xem danh sách lớp học

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-011                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem danh sách lớp học                                     |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                         |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" |
| **Kết quả mong đợi**    | - Hiển thị danh sách các lớp học đã tham gia <br> - Mỗi lớp học hiển thị tên, thời gian và số lượng thành viên trong lớp |

4. TC-012 – Xem thông tin lớp học

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-012                                                                       |
| **Mục đích**            | Kiểm tra chức năng xem chi tiết lớp học                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã gửi yêu cần tham gia ít nhất một lớp học      |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể |
| **Kết quả mong đợi**    | - Hiển thị thông tin chi tiết về lớp học <br> - Hiển thị danh sách bài học <br> - Hiển thị tiến độ học tập trong lớp <br> - Hiển thị nút "Vào học" (trong trường hợp đã được phê duyệt vào lớp) hoặc "Đang chờ phê duyệt" (trong trường hợp chưa được phê duyệt vào lớp) |

5. TC-013 – Vào học

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-013                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng vào học                                                   |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học                                       |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                                                             |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể <br> 5. Chọn "Vào học"|
| **Kết quả mong đợi**    | - Hiển thị các buổi học trong lớp <br> - Người dùng có thể xem chi tiết các buổi học |

6. TC-014 – Xem chi tiết buổi học

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-014                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng học bài trong lớp học                                                                      |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học <br> Lớp học đó đã có ít nhất 1 buổi học có nội dung                                       |
| **Dữ liệu test**        | Tài khoản người dùng đã đăng nhập                                                                            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn một lớp học cụ thể <br> 5. Chọn "Vào học" <br> 6. Chọn một buổi học cụ thể|
| **Kết quả mong đợi**    | - Hiển thị danh sách các mục học tập trong buổi học <br> - Có thể mở/đóng từng mục học tập <br> - Hiển thị nội dung chi tiết của mục học tập khi mở |


7. TC-015 – Tải tài liệu PDF

| Mục                   | Nội dung                                                                                              |
|------------------------|-------------------------------------------------------------------------------------------------------|
| **ID**                | TC-015                                                                                                |
| **Mục đích**          | Kiểm tra chức năng tải tài liệu PDF                                                                  |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập có tài liệu PDF                  |
| **Dữ liệu test**      | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có tài liệu PDF                                     |
| **Các bước thực hiện**| 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập có tài liệu PDF  <br>7. Nhấn vào tài liệu PDF để tải |
| **Kết quả mong đợi**  | - Tài liệu PDF được tải về máy |

8. TC-016 – Xem video bài giảng

| Mục                   | Nội dung                                                                                              |
|------------------------|-------------------------------------------------------------------------------------------------------|
| **ID**                | TC-016                                                                                                |
| **Mục đích**          | Kiểm tra chức năng xem video bài giảng                                                               |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập có video bài giảng               |
| **Dữ liệu test**      | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có video bài giảng                                 |
| **Các bước thực hiện**| 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập có video bài giảng  <br>7. Nhấn vào video để xem |
| **Kết quả mong đợi**  | - Video được mở và phát  <br>- Có thể tạm dừng/tiếp tục phát video  <br>- Có thể điều chỉnh âm lượng  <br>- Có thể chuyển sang chế độ toàn màn hình |

9. TC-017 – Đánh dấu hoàn thành nội dung học tập

| Mục                     | Nội dung                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-017                                                                                                   |
| **Mục đích**            | Kiểm tra chức năng đánh dấu hoàn thành nội dung học tập                                                  |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đang xem nội dung học tập                                        |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có nội dung học tập                                    |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập  <br>7. Nhấn nút "Đánh dấu hoàn thành" |
| **Kết quả mong đợi**    | - Mục học tập được đánh dấu là đã hoàn thành (hiển thị dấu tích)  <br>- Tiến độ học tập được cập nhật  <br>- Khi quay lại danh sách, mục học tập vẫn được đánh dấu là đã hoàn thành |

10. TC-018 – Bỏ đánh dấu hoàn thành nội dung học tập

| Mục                     | Nội dung                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-018                                                                                                   |
| **Mục đích**            | Kiểm tra chức năng bỏ đánh dấu hoàn thành nội dung học tập                                               |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có nội dung học tập đã được đánh dấu hoàn thành                 |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập<br>- Buổi học có nội dung học tập đã đánh dấu hoàn thành            |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Lớp học"  <br>4. Chọn một lớp học  <br>5. Chọn một buổi học  <br>6. Chọn một mục học tập đã đánh dấu hoàn thành  <br>7. Nhấn nút "Bỏ đánh dấu hoàn thành" |
| **Kết quả mong đợi**    | - Mục học tập không còn được đánh dấu là đã hoàn thành (dấu tích biến mất)  <br>- Tiến độ học tập được cập nhật  <br>- Khi quay lại danh sách, mục học tập không còn được đánh dấu là đã hoàn thành |

11. TC-019 – Tham gia lớp học mới

| **Mục**                 | **Nội dung**                                                                                                   |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-019                                                                                                         |
| **Mục đích**            | Kiểm tra chức năng tham gia lớp học mới bằng mã lớp                                                            |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống <br> Có mã lớp học hợp lệ                                                 |
| **Dữ liệu test**        | Mã lớp học:                                                                                              |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Ấn vào nút dấu cộng bên cạnh thanh tìm kiếm <br> 5. Nhập mã lớp học <br> 6. Nhấn nút "Tham gia" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo tham gia lớp học thành công <br> - Lớp học mới xuất hiện trong danh sách lớp học |

12. TC-020 – Xem và hủy yêu cầu tham gia lớp học đang chờ phê duyệt

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-020                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng xem thông tin lớp học đang chờ phê duyệt và hủy yêu cầu tham gia                                           |
| **Điều kiện tiên quyết**| Người dùng đã gửi yêu cầu tham gia một lớp học (ví dụ bằng mã lớp TOAN12A) và lớp đang ở trạng thái "đang chờ phê duyệt"     |
| **Dữ liệu test**        | Tài khoản người dùng đã gửi yêu cầu tham gia lớp học TOAN12A                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Chọn lớp học TOAN12A đang chờ phê duyệt <br> 5. Kiểm tra thông tin lớp học <br> 6. Nhấn nút "Hủy yêu cầu tham gia" |
| **Kết quả mong đợi**    | - Hiển thị thông tin chi tiết của lớp học <br> - Nút "Hủy yêu cầu tham gia" hiển thị <br> - Sau khi nhấn, hệ thống xác nhận hủy và lớp học biến mất khỏi danh sách |


13. TC-021 – Tìm kiếm lớp học theo tên

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-021                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng tìm kiếm lớp học theo tên                                          |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và đã tham gia ít nhất một lớp học     |
| **Dữ liệu test**        | Tên lớp học được nhập vào ô tìm kiếm                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Lớp học" <br> 4. Ấn vào thanh tìm kiếm và nhập tên lớp học <br> 5. Bỏ focus ra khỏi ô tìm kiếm |
| **Kết quả mong đợi**    | - Hiển thị lớp học có tên chứa nội dung tìm kiếm |

### Luyện tập và Làm bài thi

1. TC-022 – Xem danh sách đề thi

| Mục                     | Nội dung                                                                                              |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-022                                                                                                  |
| **Mục đích**            | Kiểm tra chức năng xem danh sách đề thi                                                                |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống                                                                    |
| **Dữ liệu test**        | - Tài khoản người dùng đã đăng nhập                                                                     |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Luyện tập"        |
| **Kết quả mong đợi**    | - Hiển thị danh sách các bài tập và đề thi  <br>- Các bài tập được phân loại theo chủ đề, lớp, loại bài |

2. TC-023 – Tìm kiếm đề thi theo tên

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-023                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng tìm kiếm đề thi theo tên                                          |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu     |
| **Dữ liệu test**        | Tên đề thi được nhập vào ô tìm kiếm                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Luyện đề" <br> 4. Ấn vào thanh tìm kiếm và nhập tên đề thi <br> 5. Bỏ focus ra khỏi ô tìm kiếm |
| **Kết quả mong đợi**    | - Hiển thị đề thi có tên chứa nội dung tìm kiếm |

3. TC-024 – Lọc đề thi theo điều kiện

| **Mục**                 | **Nội dung**                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-024                                                                                                                       |
| **Mục đích**            | Kiểm tra khả năng lọc đề thi theo điều kiện                               |
| **Điều kiện tiên quyết**| Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu     |
| **Dữ liệu test**        | Các điều kiện được chọn trong bộ lọc                                                                 |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Luyện đề" <br> 4. Ấn vào nút Lọc bên cạnh thanh tìm kiếm <br> 5. Chọn các điều kiện (có thể chọn 1 hoặc nhiều) |
| **Kết quả mong đợi**    | - Hiển thị danh sách đề thi thỏa mãn các điều kiện được chọn <br> - Có thể xóa bộ lọc và xem lại tất cả đề thi |

4. TC-025 – Xem chi tiết đề thi

| Mục                     | Nội dung                                                                                                  |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-025                                                                                                      |
| **Mục đích**           | Kiểm tra chức năng xem chi tiết đề thi                                                                    |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và có ít nhất 1 đề thi trong cơ sở dữ liệu                                                                     |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi cụ thể                                                                         |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br>2. Đăng nhập với tài khoản hợp lệ  <br>3. Chọn tab "Luyện tập"  <br>4. Chọn một đề thi cụ thể |
| **Kết quả mong đợi**   | - Hiển thị thông tin chi tiết về đề thi  <br>- Hiển thị nút "Bắt đầu làm bài" |

5. TC-026 – Làm đề thi

| Mục                     | Nội dung                                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-026                                                                                                               |
| **Mục đích**           | Kiểm tra chức năng làm đề thi                                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                                               |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi cụ thể                                       |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Chọn tab "Luyện tập"  <br> 4. Chọn đề thi bất kì  <br> 5. Nhấn nút "Bắt đầu làm bài"  <br> 6. Trả lời các câu hỏi  <br> 7. Nhấn nút "Nộp bài" |
| **Kết quả mong đợi**   | - Hiển thị đồng hồ đếm ngược thời gian làm bài  <br> - Hiển thị các câu hỏi và lựa chọn  <br> - Người dùng có thể chọn đáp án  <br> - Sau khi nộp bài, hiển thị kết quả và điểm số |

6. TC-027 – Kiểm tra quá trình làm bài

| Mục                     | Nội dung                                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-027                                                                                                               |
| **Mục đích**           | Kiểm tra chức năng xem quá trình làm bài                                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi                                                                              |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi đang làm                                       |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Chọn tab "Luyện tập"  <br> 4. Chọn đề thi bất kì  <br> 5. Nhấn nút "Bắt đầu làm bài" <br> 6. Ấn vào biểu tượng Menu ở góc phải màn hình để xem quá trình làm bài |
| **Kết quả mong đợi**   | - Hiển thị đồng hồ đếm ngược thời gian làm bài  <br> - Hiển thị số thứ tự các câu hỏi theo màu sắc (Trắng - chưa làm, Xanh - đã làm, Vàng - đang làm) <br> - Hiển thị chú thích màu sắc với số lượng câu hỏi chính xác  <br> - Hiển thị nút nộp bài |

7. TC-028 – Chuyển đổi giữa các câu hỏi trong bài thi

| Mục                  | Nội dung                                                                                                  |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| **ID**                | TC-028                                                                                                   |
| **Mục đích**           | Kiểm tra chức năng chuyển đổi giữa các câu hỏi trong bài thi                                            |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi                                                  |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập  <br> - Đề thi đang làm                                              |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Bắt đầu làm một bài thi  <br> 4. Sử dụng nút "Câu trước" và "Câu sau" để di chuyển giữa các câu hỏi |
| **Kết quả mong đợi**   | - Khi nhấn "Câu trước", hiển thị câu hỏi trước đó  <br> - Khi nhấn "Câu sau", hiển thị câu hỏi tiếp theo  <br> - Nút "Câu trước"/"Câu sau" bị vô hiệu hóa khi ở câu hỏi đầu tiên/cuối cùng  <br> - Các đáp án đã chọn được lưu lại khi chuyển câu |

8. TC-029 – Trả lời câu hỏi trắc nghiệm

| Mục                    | Nội dung                                                                                                        |
|-------------------------|----------------------------------------------------------------------------------------------------------------|
| **ID**                  | TC-029                                                                                                         |
| **Mục đích**             | Kiểm tra chức năng trả lời câu hỏi trắc nghiệm                                                                 |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi có câu hỏi trắc nghiệm                                 |
| **Dữ liệu test**         | - Tài khoản người dùng đã đăng nhập <br> - Bài thi có câu hỏi trắc nghiệm                                       |
| **Các bước thực hiện**    | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi <br> 4. Chọn một câu hỏi trắc nghiệm <br> 5. Chọn một đáp án (A, B, C hoặc D) <br> 6. Chuyển sang câu hỏi khác và quay lại câu hỏi đã trả lời |
| **Kết quả mong đợi**     | - Khi chọn đáp án, đáp án được đánh dấu là đã chọn <br> - Khi quay lại câu hỏi, đáp án đã chọn vẫn được hiển thị <br> - Câu hỏi ở trang quá trình làm bài được chuyển từ chưa làm thành đã làm <br> - Thông tin được gửi đến server thông qua `socket.emit("select_answer", payload)` |

9. TC-030 – Trả lời câu hỏi đúng sai

| Mục                    | Nội dung                                                                                                        |
|------------------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-030                                                                                                          |
| **Mục đích**           | Kiểm tra chức năng trả lời câu hỏi đúng sai                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi có câu hỏi đúng sai                                     |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Bài thi có câu hỏi đúng sai                |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi <br> 4. Chọn một câu hỏi đúng sai <br> 5. Chọn đáp án <br> 6. Chuyển sang câu hỏi khác và quay lại câu hỏi đã trả lời |
| **Kết quả mong đợi**   | - Khi chọn, đáp án được đánh dấu là đã chọn <br> - Khi quay lại câu hỏi, đáp án đã chọn vẫn được hiển thị <br> - Nếu chọn đủ đáp án trong câu thì câu hỏi ở trang quá trình làm bài được chuyển từ chưa làm thành đã làm <br> - Thông tin được gửi đến server thông qua `socket.emit("select_answer", payload)` |

10. TC-031 – Trả lời câu hỏi điền đáp án

| Mục                    | Nội dung                                                                                                        |
|------------------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-031                                                                                                          |
| **Mục đích**           | Kiểm tra chức năng trả lời câu hỏi điền đáp án                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi có câu hỏi điền đáp án                                     |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Bài thi có câu hỏi điền đáp án <br> - Câu trả lời: "3.14"                |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi <br> 4. Chọn một câu hỏi điền đáp án <br> 5. Nhập đáp án vào ô văn bản <br> 6. Chuyển sang câu hỏi khác và quay lại câu hỏi đã trả lời |
| **Kết quả mong đợi**   | - Khi nhập đáp án, giá trị được hiển thị trong ô nhập liệu <br> - Khi quay lại câu hỏi, giá trị đã nhập vẫn được hiển thị <br> - Câu hỏi ở trang quá trình làm bài được chuyển từ chưa làm thành đã làm <br> - Thông tin được gửi đến server thông qua `socket.emit("select_answer", payload)` |

11. TC-032 – Đánh dấu câu hỏi để xem lại sau

| Mục                    | Nội dung                                                                                                                   |
|------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-032                                                                                                                     |
| **Mục đích**           | Kiểm tra chức năng đánh dấu câu hỏi để xem lại sau                                                                         |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi                                                                 |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Bài thi đang làm                                                               |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi <br> 4. Chọn một câu hỏi <br> 5. Nhấn nút "Đánh dấu" hoặc biểu tượng cờ <br> 6. Chuyển sang câu hỏi khác và quay lại danh sách câu hỏi |
| **Kết quả mong đợi**   | - Khi đánh dấu câu hỏi, biểu tượng cờ hoặc dấu hiệu đánh dấu xuất hiện <br> - Trong danh sách câu hỏi, câu đã đánh dấu được hiển thị với biểu tượng cờ hoặc màu khác <br> - Có thể bỏ đánh dấu bằng cách nhấn lại nút "Đánh dấu" |


12. TC-033 – Nộp bài thi thủ công

| Mục                    | Nội dung                                                                                                        |
|------------------------|-----------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-033                                                                                                          |
| **Mục đích**           | Kiểm tra chức năng nộp bài thi thủ công                                                                         |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi                                                       |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Bài thi đang làm                                                     |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi <br> 4. Trả lời một số câu hỏi <br> 5. Mở bảng quá trình và nhấn nút "Nộp bài" <br> 6. Xác nhận nộp bài trong hộp thoại xác nhận |
| **Kết quả mong đợi**   | - Hiển thị hộp thoại xác nhận nộp bài <br> - Sau khi xác nhận, bài thi được nộp <br> - Hiển thị thông báo nộp bài thành công <br> - Chuyển đến trang kết quả bài thi <br> - Hiển thị điểm số và các câu trả lời đúng/sai |

13. TC-034 – Nộp bài thi tự động khi hết thời gian

| Mục                    | Nội dung                                                                                                                   |
|------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-034                                                                                                                    |
| **Mục đích**           | Kiểm tra chức năng nộp bài thi tự động khi hết thời gian                                                                  |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đang làm bài thi có giới hạn thời gian                                             |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Bài thi có thời gian làm bài ngắn (ví dụ: 2 phút)                              |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Bắt đầu làm một bài thi có thời gian ngắn <br> 4. Chờ đến khi hết thời gian làm bài |
| **Kết quả mong đợi**   | - Khi thời gian còn 1 phút, hiển thị cảnh báo sắp hết thời gian <br> - Khi hết thời gian, bài thi tự động được nộp <br> - Hiển thị thông báo hết thời gian và bài đã được nộp <br> - Chuyển đến trang kết quả bài thi <br> - Hiển thị điểm số và các câu trả lời đúng/sai |


14. TC-035 – Kiểm tra xem kết quả làm bài

| Mục                     | Nội dung                                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------------------------|
| **ID**                 | TC-035                                                                                                               |
| **Mục đích**           | Kiểm tra chức năng xem kết quả làm bài                                                                                      |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và vừa nộp xong bài thi                                                                     |
| **Dữ liệu test**       | - Tài khoản người dùng đã đăng nhập <br> - Đề thi vừa nộp                                       |
| **Các bước thực hiện** | 1. Người dùng ở trang kết quả sau khi nộp bài thành công <br> 2. Ấn vào biểu tượng Menu ở góc phải màn hình để xem chi tiết bài làm |
| **Kết quả mong đợi**   | - Hiển thị trang kết quả với chi tiết câu hỏi và đáp án đã chọn <br> - Trang tổng quát hiển thị điểm số, thời gian làm bài, số câu đúng/sai và các câu hỏi kèm đáp án đã chọn |

15. TC-036 – Xem lại bài thi đã làm

| Mục                | Nội dung                                                                 |
|---------------------|-------------------------------------------------------------------------|
| **ID**              | TC-036                                                                  |
| **Mục đích**         | Kiểm tra chức năng xem lại bài thi đã làm                               |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống và đã làm ít nhất một bài thi      |
| **Dữ liệu test**     | - Tài khoản người dùng đã đăng nhập  <br> - Bài thi đã hoàn thành       |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee  <br> 2. Đăng nhập với tài khoản hợp lệ  <br> 3. Chọn tab "Luyện tập"  <br> 4. Chọn một bài thi đã làm  <br> 5. Chọn "Lịch sử làm bài" |
| **Kết quả mong đợi** | - Hiển thị danh sách các lần làm bài  <br> - Khi chọn một lần làm bài, hiển thị chi tiết đáp án đã chọn và đáp án đúng  <br> - Hiển thị điểm số và thời gian làm bài |

### Tính năng Bài viết và Tài liệu
1. TC-037 – Xem danh sách bài viết

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-037                                                                                             |
| **Mục đích**           | Kiểm tra chức năng xem danh sách bài viết                                                          |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | Tài khoản người dùng đã đăng nhập                                                                  |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Bài viết"     |
| **Kết quả mong đợi**   | - Hiển thị danh sách các bài viết <br> - Mỗi bài viết hiển thị tiêu đề, mô tả ngắn và hình ảnh (nếu có) <br> - Có thể cuộn để xem thêm bài viết |

2. TC-038 – Tìm kiếm bài viết

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-038                                                                                             |
| **Mục đích**           | Kiểm tra chức năng tìm kiếm bài viết                                                               |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | Tài khoản người dùng đã đăng nhập <br> Từ khóa tìm kiếm: "đạo hàm"                                |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Bài viết" <br> 4. Nhấn vào ô tìm kiếm <br> 5. Nhập từ khóa "đạo hàm" <br> 6. Nhấn nút Enter trên bàn phím |
| **Kết quả mong đợi**   | - Hiển thị danh sách các bài viết liên quan đến từ khóa "đạo hàm" <br> - Nếu không có kết quả, hiển thị thông báo không tìm thấy bài viết <br> - Có thể xóa từ khóa và tìm kiếm lại |

3. TC-039 – Lọc bài viết

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-039                                                                                             |
| **Mục đích**           | Kiểm tra chức năng lọc bài viết                                                       |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | Tài khoản người dùng đã đăng nhập <br> Điều kiện lọc được chọn trong Bộ lọc                                         |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Bài viết" <br> 4. Nhấn vào bộ lọc <br> 5. Chọn điều kiện lọc <br> 6. Nhấn nút "Áp dụng" |
| **Kết quả mong đợi**   | - Hiển thị danh sách các bài viết thỏa mãn điều kiện lọc <br> - Nếu không có kết quả, hiển thị thông báo không tìm thấy bài viết <br> - Có thể xóa bộ lọc và xem lại tất cả bài viết |

4. TC-040 – Xem chi tiết bài viết

| Mục                    | Nội dung                                                                                           |
|------------------------|----------------------------------------------------------------------------------------------------|
| **ID**                 | TC-040                                                                                             |
| **Mục đích**           | Kiểm tra chức năng xem chi tiết bài viết                                                           |
| **Điều kiện tiên quyết** | Người dùng đã đăng nhập vào hệ thống                                                              |
| **Dữ liệu test**       | Tài khoản người dùng đã đăng nhập <br> Bài viết bất kì              |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Đăng nhập với tài khoản hợp lệ <br> 3. Chọn tab "Bài viết" <br> 4. Chọn bài viết bất kì |
| **Kết quả mong đợi**   | - Hiển thị nội dung đầy đủ của bài viết <br> - Hiển thị chính xác các công thức toán học <br> - Hiển thị hình ảnh minh họa (nếu có) <br> - Có thể cuộn để đọc toàn bộ bài viết |


### Kết nối Internet và đồng bộ hóa

1. TC-041 – Kiểm tra kết nối internet khi thực hiện API call

| Mục                     | Nội dung |
|--------------------------|---------|
| **ID**                   | TC-044 |
| **Mục đích**             | Kiểm tra ứng dụng xử lý khi không có kết nối internet trước khi gọi API |
| **Điều kiện tiên quyết** | Đã cài đặt ứng dụng mobile |
| **Dữ liệu test**         | Tài khoản người dùng hợp lệ |
| **Các bước thực hiện**   | 1. Tắt kết nối internet trên thiết bị<br>2. Mở ứng dụng Toán Thầy Bee<br>3. Thử đăng nhập hoặc thực hiện một hành động cần kết nối internet |
| **Kết quả mong đợi**     | - Ứng dụng hiển thị thông báo không có kết nối internet<br>- Không thực hiện API call<br>- Hiển thị gợi ý kiểm tra lại kết nối mạng |

2. TC-042 – Lưu quá trình làm bài khi thoát ứng dụng

| Mục                     | Nội dung |
|------------------------|----------|
| **ID**                 | TC-042 |
| **Mục đích**           | Kiểm tra khả năng lưu và khôi phục quá trình làm bài khi người dùng thoát ứng dụng và vào lại |
| **Điều kiện tiên quyết** | - Người dùng đã đăng nhập vào hệ thống<br>- Có ít nhất một đề thi khả dụng |
| **Dữ liệu test**       | - Tài khoản người dùng hợp lệ<br>- Đề thi cụ thể (ví dụ: Đề thi Toán lớp 10) |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee<br>2. Đăng nhập với tài khoản hợp lệ<br>3. Chọn tab "Luyện tập"<br>4. Chọn một đề thi cụ thể<br>5. Nhấn nút "Bắt đầu làm bài"<br>6. Trả lời 5–7 câu hỏi đầu tiên<br>7. Thoát hoàn toàn khỏi ứng dụng (đóng ứng dụng)<br>8. Mở lại ứng dụng<br>9. Đăng nhập lại với cùng tài khoản<br>10. Chọn tab "Luyện tập"<br>11. Chọn lại đề thi đã làm dở |
| **Kết quả mong đợi**   | - Hệ thống hiển thị thông báo "Bạn có muốn tiếp tục làm bài thi đang dở không?"<br>- Khi chọn "Có", hệ thống mở lại bài thi với các câu trả lời đã chọn trước đó<br>- Thời gian làm bài tiếp tục từ thời điểm còn lại<br>- Các câu hỏi đã trả lời vẫn hiển thị đáp án đã chọn<br>- Quá trình làm bài tiếp tục bình thường<br>- Khi nộp bài, tất cả các câu trả lời (cả trước và sau khi thoát ứng dụng) đều được tính điểm chính xác |

3. TC-043 – Kiểm tra giới hạn số lượt làm bài thi

| Mục                     | Nội dung |
|------------------------|----------|
| **ID**                 | TC-043 |
| **Mục đích**           | Kiểm tra tính năng giới hạn số lượt làm bài thi |
| **Điều kiện tiên quyết** | - Người dùng đã đăng nhập vào hệ thống<br>- Có ít nhất một đề thi có cấu hình giới hạn số lần làm bài (`attemptLimit`) |
| **Dữ liệu test**       | - Tài khoản người dùng hợp lệ<br>- Đề thi có `attemptLimit = 1` (giới hạn 1 lần làm bài) |
| **Các bước thực hiện** | 1. Mở ứng dụng Toán Thầy Bee<br>2. Đăng nhập với tài khoản hợp lệ<br>3. Chọn tab "Luyện tập"<br>4. Chọn đề thi có giới hạn số lần làm bài<br>5. Nhấn nút "Bắt đầu làm bài"<br>6. Làm bài và nộp bài<br>7. Quay lại danh sách đề thi<br>8. Chọn lại đề thi vừa làm<br>9. Nhấn nút "Bắt đầu làm bài" lần thứ 2 |
| **Kết quả mong đợi**   | - Lần làm thứ nhất: hệ thống cho phép làm bài bình thường<br>- Lần làm thứ hai: hệ thống hiển thị thông báo *"Bạn đã đạt giới hạn số lần làm bài cho phép"*<br>- Nút "Bắt đầu làm bài" bị vô hiệu hóa hoặc không hiển thị<br>- Hệ thống hiển thị số lần đã làm và giới hạn số lần làm bài<br>- Người dùng vẫn có thể xem lại kết quả các lần làm bài trước đó |
