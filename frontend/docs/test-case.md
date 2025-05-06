# Test Cases cho Frontend

Dưới đây là bộ test cases chi tiết cho ứng dụng Toán Thầy Bee, bao gồm các tính năng chính của hệ thống. Mỗi test case được mô tả với ID, mục đích, các bước thực hiện, dữ liệu test và kết quả mong đợi.

## Test Cases Đăng nhập

1. Test Case: TC-001 – Đăng nhập thành công

| **Mục**                 | **Nội dung**                                                                 |
|-------------------------|------------------------------------------------------------------------------|
| **ID**                  | TC-001                                                                       |
| **Mục đích**            | Kiểm tra chức năng đăng nhập với thông tin hợp lệ                            |
| **Điều kiện tiên quyết**| Đã có tài khoản với tên đăng nhập `nguyenvana123` và mật khẩu `Test@123`     |
| **Dữ liệu test**        | Tên đăng nhập: `nguyenvana123`<br>Mật khẩu: `Test@123`                       |
| **Các bước thực hiện**  | 1. Mở ứng dụng Toán Thầy Bee <br> 2. Chọn "Đăng nhập" <br> 3. Nhập tên đăng nhập và mật khẩu <br> 4. Nhấn nút "Đăng nhập" |
| **Kết quả mong đợi**    | - Người dùng được đăng nhập thành công <br> - Hệ thống chuyển đến màn hình trang chủ <br> - Thông tin người dùng hiển thị đúng |

<h3>✅ Test Case: TC-001 – Đăng nhập thành công</h3>

<table>
  <tr>
    <th>Mục</th>
    <th>Nội dung</th>
  </tr>
  <tr>
    <td>ID</td>
    <td>TC-001</td>
  </tr>
  <tr>
    <td>Mục đích</td>
    <td>Kiểm tra chức năng đăng nhập với thông tin hợp lệ</td>
  </tr>
  <tr>
    <td>Điều kiện tiên quyết</td>
    <td>Đã có tài khoản với tên đăng nhập <code>nguyenvana123</code> và mật khẩu <code>Test@123</code></td>
  </tr>
  <tr>
    <td>Dữ liệu test</td>
    <td>Tên đăng nhập: <code>nguyenvana123</code><br>Mật khẩu: <code>Test@123</code></td>
  </tr>
  <tr>
    <td>Các bước thực hiện</td>
    <td>
      1. Mở ứng dụng Toán Thầy Bee<br>
      2. Chọn "Đăng nhập"<br>
      3. Nhập tên đăng nhập và mật khẩu<br>
      4. Nhấn nút "Đăng nhập"
    </td>
  </tr>
  <tr>
    <td>Kết quả mong đợi</td>
    <td>
      - Người dùng được đăng nhập thành công<br>
      - Hệ thống chuyển đến màn hình trang chủ<br>
      - Thông tin người dùng hiển thị đúng
    </td>
  </tr>
</table>
