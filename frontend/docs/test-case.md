# Test Cases cho Frontend

Dưới đây là bộ test cases chi tiết cho ứng dụng Toán Thầy Bee, bao gồm các tính năng chính của hệ thống. Mỗi test case được mô tả với ID, mục đích, các bước thực hiện, dữ liệu test và kết quả mong đợi.

## Test Cases Đăng nhập

1. TC-001 – Đăng nhập thành công

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-001                                                                       |
| **Mục đích**            | Kiểm tra chức năng đăng nhập với thông tin hợp lệ                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `b4schhh` và mật khẩu `123123`             |
| **Dữ liệu test**        | Tên đăng nhập: `b4schhh`<br>Mật khẩu: `123123`                               |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Chọn "Đăng nhập" <br> 3. Nhập tên đăng nhập và mật khẩu <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Người dùng được đăng nhập thành công <br> - Hệ thống chuyển đến màn hình trang chủ <br> - Thông tin người dùng hiển thị đúng |

