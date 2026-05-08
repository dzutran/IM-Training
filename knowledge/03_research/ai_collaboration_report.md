# Báo cáo Tổng kết: Quy trình Phát triển Workflow Intra-mart cùng Đội ngũ AI (IM-Squad)

**Ngày lập**: 08/05/2026
**Dự án**: Intra-mart Training (practice_wf)
**Đơn vị thực hiện**: User & IM-Squad (AI Agents)

---

## 1. Phương pháp luận: Mô hình Multi-Agent (IM-Squad)
Thay vì làm việc với một AI chung chung, dự án đã triển khai hệ thống **Persona-based Agents**. Mỗi Agent đảm nhận một vai trò chuyên biệt, giúp tối ưu hóa chất lượng mã nguồn:

- **Researcher**: Chuyên trách tra cứu tài liệu mẫu (từ folder `external/`) để tìm ra các Best Practice của Intra-mart.
- **Architect**: Thiết kế cấu trúc hệ thống, đảm bảo tính tuân thủ các quy tắc cốt lõi (JSSP Pairing, Thin Client).
- **Developer**: Thực thi viết mã, refactor code và giải quyết các lỗi kỹ thuật.
- **Reviewer**: Kiểm soát chất lượng, đảm bảo tiền tố `zzz` và các tiêu chuẩn bảo mật/thẩm mỹ.
- **QA Engineer**: Kiểm thử kịch bản người dùng và xác thực UI.

---

## 2. Các thành tựu đã đạt được (Done)

### 2.1. Module wf_01 (Màn hình Apply)
- **Kiến trúc Validation kép (Advanced Override)**: Đây là bước đột phá lớn nhất. Chúng ta đã làm chủ việc ghi đè hoàn toàn các Message mặc định của hệ thống bằng đối tượng `customRules` và `customMessages` nội bộ.
- **Hệ thống Thông báo (Professional Mail)**: Tự động gửi Email HTML chuyên nghiệp dựa trên trạng thái (Apply, Approve, Sendback). Tích hợp link xử lý trực tiếp (`process_direct`).
- **Định tuyến động (Dynamic Routing)**: Sử dụng JSSP RPC để cấu hình Node động dựa trên dữ liệu nghiệp vụ (số ngày nghỉ, tổng tiền).

### 2.2. Module wf_02 (Màn hình Monitor)
- **Chuẩn hóa UI (imui standard)**: Đưa toàn bộ giao diện hiện đại về chuẩn `imui` để đảm bảo tính đồng nhất với hệ thống Intra-mart gốc.
- **Deep-linking**: Xử lý tham số `imwCallOriginalPagePath` để điều hướng chính xác giữa các màn hình giám sát và xử lý.

---

## 3. Quá trình Nghiên cứu & Những bài học kinh nghiệm (Research Insights)

### 3.1. Những gì đã làm được và Hoạt động tốt:
- **Kỹ thuật "Ghi đè tối thượng"**: Việc định nghĩa Rules/Messages inline giúp giải quyết triệt để vấn đề "Undefined" và text cứng.
- **JSSP RPC Injection**: Phương pháp truyền JSON `imwNodeSetting` qua RPC là cách sạch nhất để cấu hình workflow mà không làm rác logic màn hình.
- **Persistent Skills**: Việc lưu trữ Persona vào thư mục `.gemini/antigravity/skills` giúp AI "ghi nhớ" dự án vĩnh viễn qua mọi phiên làm việc.

### 3.2. Những hạn chế / Chưa làm được (Pending/Constraints):
- **JSSP Pairing Rule**: Không thể tách hoàn toàn Client-side JS ra file riêng do cơ chế nạp trang của Intra-mart yêu cầu file .html và .js phải nằm cùng thư mục.
- **Hardcoded Config**: Một số thông tin như `baseUrl` trong mail vẫn đang gán cứng, cần được chuyển sang cấu hình hệ thống (Public Storage) trong tương lai.

---

## 4. Hướng dẫn Vận hành cùng AI cho Team

Để team có thể vận hành hiệu quả như chúng ta đã làm, cần tuân thủ 3 trụ cột:

1.  **Cung cấp ngữ cảnh (Context is King)**: Luôn cho AI "đọc" các file chuẩn của hệ thống (`external/...`) trước khi yêu cầu nó code. Điều này giúp AI không viết code theo kiểu "đoán mò".
2.  **Sử dụng Skill Files**: Mọi quy tắc của team (như phải có tiền tố `zzz`) phải được viết vào file `.md` và nạp vào phần **Skill Custom Paths**. AI sẽ tự động tuân thủ mà không cần nhắc lại.
3.  **Phối hợp luồng (Coordination)**: Sử dụng câu lệnh gọi đích danh Agent (ví dụ: `@agent Reviewer hãy kiểm tra code này`). Điều này kích hoạt các bộ lọc tư duy khác nhau của AI.

---
### Kết luận
Sự kết hợp giữa **Kiến thức nghiệp vụ của Con người** và **Khả năng thực thi/Tra cứu của AI** đã giúp rút ngắn thời gian phát triển từ vài ngày xuống vài giờ, đồng thời đảm bảo mã nguồn đạt chuẩn chuyên nghiệp cấp độ cao nhất của Intra-mart.

---
*Tài liệu này được đúc kết từ quá trình hợp tác giữa User và IM-Squad.*
