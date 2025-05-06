# Test Cases cho Frontend

Dưới đây là bộ test cases chi tiết cho ứng dụng Toán Thầy Bee, bao gồm các tính năng chính của hệ thống. Mỗi test case được mô tả với ID, mục đích, các bước thực hiện, dữ liệu test và kết quả mong đợi.

## Tổng hợp các test cases

| ID       | Mục đích                         | Điều kiện tiên quyết          | Kết quả mong đợi                     |
|----------|----------------------------------|-------------------------------|--------------------------------------|
| TC-001   | Đăng nhập thành công             | Đã có tài khoản hợp lệ        | Chuyển sang màn hình trang chủ       |
| TC-002   | Đăng nhập sai mật khẩu           | Đã có tài khoản hợp lệ        | Hiển thị lỗi đăng nhập               |

## Chi tiết test cases

### Test Cases Đăng nhập

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
| **ID**                  | TC-001                                                                       |
| **Mục đích**            | Kiểm tra hệ thống xử lý khi người dùng đăng nhập với mật khẩu không đúng.                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `b4schhh` và mật khẩu `123123`             |
| **Dữ liệu test**        | Thông tin đăng nhập với mật khẩu không đúng.                               |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee<br> 2. Chọn "Đăng nhập" <br> 3. Nhập thông tin đăng nhập: <br> - Tên đăng nhập: `b4schhh` <br> - Mật khẩu: `123456` <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Hệ thống hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng" <br> -	Người dùng vẫn ở màn hình đăng nhập |


