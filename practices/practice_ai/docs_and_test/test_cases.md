# Test Cases: User Management (practice_ai)

| ID | Feature | Test Scenario | Expected Result |
|:---|:---|:---|:---|
| TC01 | Initial Load | Access `user_list` page | Table displays sample records (u001-u006), Icons (Edit/Del) are visible. |
| TC02 | Search | Input "Nguyen" in search box and click Search | Table reloads and shows only "Nguyen Van A". |
| TC03 | Search | Input "@example.com" and click Search | Table shows all records matching the email domain. |
| TC04 | Search | Clear search box and click Search | Table reloads and shows all users (Full list). |
| TC05 | Create | Click "Add New User", fill data, and click Save | Success message shows, Dialog closes, Table refreshes with new user. |
| TC06 | Create | Click "Add New User", leave Name empty, click Save | Error message "User ID and Name are required" appears. |
| TC07 | Update | Click "Edit" icon on u001, change Name, click Save | Success message shows, Table displays updated name. |
| TC08 | Delete | Click "Del" icon on a user, click "Cancel" in confirm | No change happens. |
| TC09 | Delete | Click "Del" icon on a user, click "OK" in confirm | Success message shows, Row is removed from table. |
