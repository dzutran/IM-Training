# Intra-mart UI Performance & Best Practices

Tips for building fast and responsive interfaces on the Accel Platform.

---

## 1. imuiListTable Optimization

### The Problem
Using `data=$data.users` fetches all records and renders them in the browser at once. For datasets > 1000 rows, this causes:
*   High memory usage.
*   Browser "Freeze" during rendering.
*   Slow initial page load.

### The Solution: Server-side Paging
Instead of passing data, pass a `url` to the JSSP that returns paginated data.

**HTML:**
```html
<imart type="imuiListTable" id="myTable" url="path/to/api/get_paged_data" ... />
```

**Server JS:**
Use `DbParameter` to handle `limit` and `offset` provided by jqGrid.

---

## 2. JSSP RPC Best Practices
*   **Centralized Callbacks**: Always use a single callback to manage UI state consistently.
*   **Type Property**: Include a `type` in every response to help the callback identify the action.
*   **Error Handling**: Wrap server logic in `try-catch` and return a standard error object.

---
## 3. Useful Links
*   [IM-UI Tag Reference (imuiListTable)](https://document.intra-mart.jp/library/iap/public/im_ui/im_ui_tag_reference/index.html)
*   [Client-side API Guide](https://document.intra-mart.jp/library/iap/public/im_ui/im_ui_client_side_programming_guide/index.html)

---
*Last Updated: 2026-05-05 by AI Research Agent*
