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
  purchaseCount: number;
  stock?: number;
  status?: 'active' | 'inactive';
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

## Lợi ích

1. **Đồng bộ realtime** - Thay đổi từ admin ngay lập tức hiển thị trên frontend
2. **Quản lý tập trung** - Tất cả data menu ở một nơi
3. **Dễ bảo trì** - Không cần cập nhật data ở nhiều nơi
4. **Tính năng đầy đủ** - CRUD operations hoàn chỉnh
5. **UI/UX tốt** - Modal forms đẹp, responsive

## Lưu ý

- Data hiện tại được lưu trong memory, sẽ mất khi refresh trang
- Để lưu trữ lâu dài, cần tích hợp với database (Supabase/PostgreSQL)
- Có thể thêm validation cho form input
- Có thể thêm confirmation dialog cho việc xóa món
