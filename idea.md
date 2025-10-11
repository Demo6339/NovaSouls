☕ HỆ THỐNG ỨNG DỤNG WEB QUẢN LÝ & ĐẶT MÓN
1. Mục tiêu dự án
Xây dựng ứng dụng web quản lý và đặt món cho quán bar, hoạt động theo hai chế độ: đặt tại bàn bằng QR code và đặt mang đi/giao hàng qua website. Ứng dụng gồm hai nhóm người dùng chính: khách hàng và quản trị (admin / nhân viên).

2. Cơ chế hoạt động tổng quát
Website cho phép người dùng quét mã QR tại bàn để gọi món tại chỗ mà không cần đăng nhập, hoặc truy cập website thông thường để đặt hàng mang đi hoặc giao tận nơi (cần đăng nhập).Các đơn hàng được xử lý và cập nhật realtime giữa khách hàng và nhân viên.

3. Các vai trò trong hệ thống:
- Khách hàng (User): Đặt món, theo dõi trạng thái đơn hàng realtime.
- Nhân viên / Quản trị (Admin): quản lý đơn hàng, menu, sự kiện, kho, tài khoản và giao diện; cập nhật trạng thái đơn hàng realtime; theo dõi doanh thu và lịch sử.

4. Cấu trúc trang và chức năng: Gồm 4 phần chính: Trang chủ (menu quán), Trang đăng ký / đăng nhập, Dashboard quản trị.
- Trang chủ
Vào thẳng menu, thiết kế nổi bật. Thanh điều hướng gồm: Nút giỏ hàng, nút tài khoản. Nếu có tableId từ QR → chuyển sang chế độ đặt tại bàn. Nếu không → chế độ đặt giao hàng.
- Trang đăng ký / đăng nhập: Gộp chung 1 trang với hai chế độ: đăng ký và đăng nhập.
* Đăng ký gồm 2 phase: nhập email và mã xác thực, sau đó đặt mật khẩu. Đăng nhập với email và mật khẩuu
- Dashboard quản trị: Gồm các module: Tổng quan, Sản phẩm, Sự kiện, Giao diện, Tài khoản, Lịch sử.
- Tổng quan: thống kê doanh thu, chi phí
- Sản phẩm: công thức, món chính, món thêm, kho hàng
- Sự kiện: quản lý hoạt động, mã giảm giá.
- Tài khoản: quản lý người dùng và phân quyền.
- Lịch sử: log tài khoản, đơn hàng và hoạt động hệ thống.

5. Luồng hoạt động chính
Đặt tại bàn (In-house): quét QR (gán id số của bàn đó), chọn món, đặt hàng, cập nhật realtime.
Đặt mang đi / giao hàng (Delivery): đăng nhập, chọn món, nhập địa chỉ, đặt hàng, theo dõi đơn hàng realtime.

6. Dữ liệu và tính năng realtime
Mọi thay đổi được đồng bộ realtime giữa khách và nhân viên. Đơn hàng gồm loại đơn (inhouse/delivery), trạng thái, chi tiết món, thời gian tạo.

7. Kết quả mong muốn
Một ứng dụng web hoàn chỉnh, dễ sử dụng, giúp tự động hóa quy trình order, quản lý hiệu quả và nâng cao trải nghiệm khách hàng.