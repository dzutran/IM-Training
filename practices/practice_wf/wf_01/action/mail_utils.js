/**
 * Workflow Mail Utilities
 * Cung cấp các hàm gửi email thông báo cho module wf_01
 */
var MailUtils = (function () {
    return {
        /**
         * Gửi email thông báo chi tiết cho người dùng
         * @param {String} userCd - Mã người dùng nhận mail
         * @param {String} subject - Tiêu đề
         * @param {Object} details - Đối tượng chứa thông tin đơn (systemMatterId, matterName, reason, days, v.v.)
         */
        sendNotification: function (userCd, subject, details) {
            try {
                var targetEmail = userCd + "@intra-mart.local";
                if (userCd === Contexts.getAccountContext().userCd) {
                    targetEmail = Contexts.getAccountContext().mailAddress || targetEmail;
                }

                // 0. Xây dựng URL điều hướng (Ưu tiên processUrl cho người xử lý, mặc định referenceUrl cho người xem)
                var url = details.processUrl || ("http://192.168.0.201:8082/imart/im_workflow/user/reference/reference_direct/" + details.systemMatterId);

                // 1. Xây dựng nội dung Plain Text (Dành cho các trình đọc mail cũ)
                var body = "Chào " + (details.applyUserName || userCd) + ",\n\n" +
                           "Đơn workflow của bạn vừa có cập nhật mới:\n" +
                           "--------------------------------------------------\n" +
                           "Trạng thái: " + subject + "\n" +
                           "Mã đơn:     " + (details.systemMatterId || "N/A") + "\n" +
                           "Tên đơn:    " + (details.matterName || "N/A") + "\n";
                if (details.reason) body += "Lý do:      " + details.reason + "\n";
                if (details.days)   body += "Số ngày:    " + details.days + " ngày\n";
                body += "--------------------------------------------------\n\n" +
                        "Xem chi tiết đơn tại: " + url + "\n\n" +
                        "Trân trọng,\nWorkflow System";

                // 2. Xây dựng nội dung HTML hoàn chỉnh (Bọc trong thẻ <html> theo docs)
                var htmlBody = "<html><body style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #374151;'>" +
                    "<div style='max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;'>" +
                    "  <div style='background: #f9fafb; padding: 20px; border-bottom: 1px solid #e5e7eb;'>" +
                    "    <h3 style='margin: 0; color: #111827;'>Cập nhật trạng thái đơn</h3>" +
                    "  </div>" +
                    "  <div style='padding: 20px;'>" +
                    "    <p>Chào <strong>" + (details.applyUserName || userCd) + "</strong>,</p>" +
                    "    <p>Đơn workflow của bạn đã được xử lý với trạng thái: <span style='background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: 600;'>" + subject + "</span></p>" +
                    "    <div style='background: #f3f4f6; padding: 15px; border-radius: 6px; margin: 15px 0;'>" +
                    "      <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>" +
                    "        <tr><td style='padding: 4px 0; color: #6b7280;' width='100'>Mã đơn:</td><td style='font-weight: 500;'>" + (details.systemMatterId || "N/A") + "</td></tr>" +
                    "        <tr><td style='padding: 4px 0; color: #6b7280;'>Tên đơn:</td><td style='font-weight: 500;'>" + (details.matterName || "N/A") + "</td></tr>";
                
                if (details.reason) {
                    htmlBody += "<tr><td style='padding: 4px 0; color: #6b7280;'>Lý do:</td><td style='font-weight: 500;'>" + details.reason + "</td></tr>";
                }
                if (details.days) {
                    htmlBody += "<tr><td style='padding: 4px 0; color: #6b7280;'>Số ngày:</td><td style='font-weight: 500;'>" + details.days + " ngày</td></tr>";
                }

                htmlBody += "      </table>" +
                    "    </div>" +
                    "    <p style='margin-top: 25px;'>" +
                    "      <a href='" + url + "' style='background: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;'>Xem chi tiết đơn hàng</a>" +
                    "    </p>" +
                    "    <p style='color: #6b7280; font-size: 13px; margin-top: 30px;'>Đây là thông báo tự động, vui lòng không phản hồi email này.</p>" +
                    "  </div>" +
                    "</div>" +
                    "</body></html>";

                var sender = new MailSender();
                sender.addTo(targetEmail);
                sender.setSubject("[Workflow ZZZ] " + subject + " - " + (details.matterName || ""));
                sender.setText(body);     // Bản text thuần làm dự phòng (Fallback)
                sender.setHTML(htmlBody); // Bản HTML cho trải nghiệm tốt nhất
                sender.setFrom("system@intra-mart.local", "Workflow System");

                var result = sender.send();
                if (!result) {
                    // Mail Error
                } else {
                    // Mail Sent successfully
                }
        return result;
            } catch (e) {
                return false;
            }
        },

        /**
         * Gửi email thông báo đơn giản (Plain Text)
         * @param {String} userCd - Mã người dùng nhận mail
         * @param {String} subject - Tiêu đề
         * @param {String} body - Nội dung văn bản
         */
        sendSimpleNotification: function (userCd, subject, body) {
            try {
                var targetEmail = userCd + "@intra-mart.local";
                
                var sender = new MailSender();
                sender.addTo(targetEmail);
                sender.setSubject("[Workflow ZZZ] " + subject);
                sender.setText(body);
                sender.setFrom("system@intra-mart.local", "Workflow System");

                var result = sender.send();
                if (!result) {
                    // Simple Mail Error
                } else {
                    // Simple Mail Sent successfully
                }
                return result;
            } catch (e) {
                return false;
            }
        }
    };
})();
