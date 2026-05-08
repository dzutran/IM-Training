# Báo cáo Phân tích Hệ thống Workflow Purchase (Gold Standard Sample)

Tài liệu này đúc kết các tiêu chuẩn kỹ thuật và kiến trúc từ bộ mẫu `sample/im_workflow/purchase` của Intra-mart, phục vụ cho việc chuẩn hóa quy trình phát triển của Team.

---

## 1. Kiến trúc phân tầng (Tiered Architecture)

Bộ mẫu Purchase sử dụng mô hình phân tách trách nhiệm (Separation of Concerns) rất nghiêm ngặt:

| Thư mục | Tên tầng | Trách nhiệm |
| :--- | :--- | :--- |
| `screen/` | UI Layer | Hiển thị Form (HTML/JS), thực hiện Validate phía Client. |
| `action/` | Coordination Layer | Tiếp nhận sự kiện Workflow, điều phối logic nghiệp vụ (Apply, Approve). |
| `common.js` | Data Access Layer (DAL) | Thực hiện các lệnh SQL (Insert/Update/Delete) vào Database. |
| `listener/` | Event Layer | Xử lý các tác vụ phụ khi hồ sơ di chuyển (Arrive/Matter Event). |

> [!IMPORTANT]
> **Bài học**: Không nên viết SQL trực tiếp trong màn hình. Hãy đẩy toàn bộ logic DB vào `common.js` và gọi nó thông qua `Content.executeFunction`.

---

## 2. Luồng xử lý Dữ liệu (Data Processing Flow)

Quy trình chuẩn khi một người dùng nhấn nút **"Apply"**:

1.  **Client-side**: Validate dữ liệu bằng `imuiValidate`.
2.  **Framework**: Workflow Engine nhận yêu cầu và tự động mở một **DB Transaction**.
3.  **ActionProcess (`apply`)**: 
    *   Lấy mã hồ sơ từ `WorkflowNumberingManager`.
    *   Đóng gói dữ liệu người dùng từ `userParameter`.
    *   Gọi hàm lưu trữ từ lớp DAL (`common.js`).
4.  **DAL (`common.js`)**: Thực hiện `tdb.insert` vào bảng nghiệp vụ (ví dụ: `sample_imw_t_purchase`).
5.  **Framework**: Nếu mọi thứ OK, Engine sẽ **Commit Transaction** và lưu thông tin Workflow. Nếu lỗi, nó sẽ **Rollback** sạch sẽ cả dữ liệu nghiệp vụ.

---

## 3. Các kỹ thuật "Pro" cần áp dụng

### 3.1. Quản lý Giao dịch tự động
Hệ thống mẫu **tuyệt đối không** sử dụng `tdb.commit()` hay `tdb.rollback()` thủ công trong `ActionProcess`. Việc này để Workflow Engine toàn quyền quản lý, tránh tình trạng "hồ sơ Workflow đã nộp nhưng dữ liệu nghiệp vụ bị mất" (hoặc ngược lại).

### 3.2. Phân tách màn hình theo trạng thái
Thay vì dùng 1 file HTML khổng lồ, bộ mẫu chia ra:
- `apply.html`: Chuyên cho việc nhập liệu mới.
- `approve.html`: Chuyên cho việc phê duyệt (chỉ cho sửa những field được phép).
- `detail.html`: Chuyên cho việc xem lại (Read-only).

### 3.3. Plugin phân quyền động (Dynamic Authority)
Tại thư mục `plugin/authority/item_total`, họ cho thấy cách viết code để hệ thống tự động nhận diện: "Nếu đơn hàng > 10 triệu, phải thêm sếp Tổng vào luồng duyệt". Đây là kỹ thuật đỉnh cao để xử lý các quy trình nghiệp vụ biến thiên.

---

## 4. Kết luận cho Team
Để vận hành và phát triển nhanh như AI, Team cần tuân thủ các "Standard" này. Việc chia nhỏ và phân tầng giúp AI có thể hỗ trợ chúng ta sửa lỗi hoặc thêm tính năng ở một vùng cụ thể mà không làm ảnh hưởng đến toàn bộ hệ thống.

---
*Tài liệu được tổng hợp bởi IM-Squad Agent Team.*
