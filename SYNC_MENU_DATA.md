# Đồng bộ Data Menu giữa Frontend và Admin Dashboard

## Tổng quan
Hệ thống đã được cập nhật để đồng bộ data menu giữa trang chủ (Menu.tsx) và trang admin dashboard. Tất cả data menu được quản lý tập trung thông qua `MenuContext`.

## Các thay đổi chính

### 1. MenuContext (src/contexts/MenuContext.tsx)
- **Tạo context tập trung** để quản lý tất cả data menu
- **Interface MenuItem** với đầy đủ thông tin: id, name, description, price, image, category, temperature, purchaseCount, stock, status
- **Interface MenuCategory** để quản lý danh mục
- **Các function quản lý:**
  - `addItem()` - Thêm món mới
  - `updateItem()` - Cập nhật món
  - `deleteItem()` - Xóa món
  - `getItemById()` - Lấy món theo ID
  - `getItemsByCategory()` - Lấy món theo danh mục

### 2. Trang Admin Menu (src/pages/admin/products/Menu.tsx)
- **Hiển thị data từ MenuContext** thay vì data cứng
- **Chức năng thêm món mới** với modal form đầy đủ:
  - Tên món, mô tả, giá
  - Danh mục (Soju, Cocktail, Coffee, Nước hoa quả, Nước ngọt)
  - Nhiệt độ (Nóng/Lạnh)
  - URL hình ảnh, tồn kho, trạng thái
- **Chức năng chỉnh sửa món** với modal tương tự
- **Chức năng xóa món** với xác nhận
- **Tìm kiếm và lọc** món theo tên/mô tả

### 3. Trang Menu chủ (src/pages/Menu.tsx)
- **Sử dụng data từ MenuContext** thay vì data cứng
- **Tự động cập nhật** khi admin thay đổi menu
- **Hiển thị đầy đủ thông tin** từ context

### 4. App.tsx
- **Wrap ứng dụng với MenuProvider** để cung cấp context cho toàn bộ app

## Cách sử dụng

### Thêm món mới từ Admin:
1. Vào `/admin/products/menu`
2. Click nút "Thêm món"
3. Điền đầy đủ thông tin trong form
4. Click "Thêm món" để lưu

### Chỉnh sửa món từ Admin:
1. Vào `/admin/products/menu`
2. Click nút "Sửa" (icon bút chì) trên món muốn sửa
3. Chỉnh sửa thông tin trong modal
4. Click "Cập nhật" để lưu

### Xóa món từ Admin:
1. Vào `/admin/products/menu`
2. Click nút "Xóa" (icon thùng rác) trên món muốn xóa
3. Món sẽ bị xóa ngay lập tức

### Xem menu từ Frontend:
1. Vào trang chủ `/` hoặc `/menu`
2. Menu sẽ tự động hiển thị data mới nhất từ admin
3. Có thể tìm kiếm, lọc theo danh mục và giá

## Cấu trúc Data

### MenuItem:
```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  temperature: 'nóng' | 'lạnh';
  stock: number;
  status: 'active' | 'inactive';
  purchaseCount: number; // Doanh số thật từ đơn hàng
  stockStatus: 'còn hàng' | 'gần hết' | 'đã hết'; // Trạng thái tồn kho
}
```

### MenuCategory:
```typescript
{
  id: string;
  name: string;
  icon: any;
  items: MenuItem[];
}
```

## Cập nhật mới nhất

### ✅ **Cập nhật 3 mục thông tin popup:**
- **Phân loại**: Hiển thị Nóng/Lạnh thay vì Danh mục
- **Lượt mua**: Doanh số thật từ đơn hàng (hiện tại = 0, sẵn sàng cho data thật)
- **Trạng thái**: Còn hàng/Gần hết/Đã hết thay vì Có sẵn/Tạm dừng

### ✅ **Thông tin popup hoàn toàn có thể quản lý:**
- **Tên món** - Có thể chỉnh sửa từ admin
- **Giá** - Có thể chỉnh sửa từ admin  
- **Mô tả** - Có thể chỉnh sửa từ admin
- **Danh mục** - Có thể chỉnh sửa từ admin
- **Trạng thái** - Có thể chỉnh sửa từ admin (Hoạt động/Tạm dừng)
- **Tồn kho** - Có thể chỉnh sửa từ admin
- **Hình ảnh** - Có thể chỉnh sửa từ admin
- **Nhiệt độ** - Có thể chỉnh sửa từ admin

### ✅ **3 mục thông tin chính trong popup:**
- **Phân loại** - Hiển thị Nóng/Lạnh (từ trường temperature)
- **Lượt mua** - Doanh số thật từ đơn hàng (hiện tại = 0, sẽ cập nhật sau)
- **Trạng thái** - Còn hàng/Gần hết/Đã hết (từ trường stockStatus)

### ✅ **Validation đầy đủ:**
- Tất cả trường bắt buộc đều có validation
- Stock phải >= 0
- Price phải > 0
- Tên món, mô tả, danh mục không được để trống

## Lợi ích

1. **Đồng bộ realtime** - Thay đổi từ admin ngay lập tức hiển thị trên frontend
2. **Quản lý tập trung** - Tất cả data menu ở một nơi
3. **Dễ bảo trì** - Không cần cập nhật data ở nhiều nơi
4. **Tính năng đầy đủ** - CRUD operations hoàn chỉnh
5. **UI/UX tốt** - Modal forms đẹp, responsive
6. **Data thật** - Không có doanh số giả, tập trung vào quản lý menu thực tế

## Lưu ý

- Data hiện tại được lưu trong memory, sẽ mất khi refresh trang
- Để lưu trữ lâu dài, cần tích hợp với database (Supabase/PostgreSQL)
- Doanh số thật sẽ được phát triển sau từ các đơn hàng đã hoàn thành
- Có thể thêm confirmation dialog cho việc xóa món
