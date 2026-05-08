# Research 07: Advanced UI Customization in Intra-mart

> [!CAUTION]
> **WARNING**: The modern design patterns described in this document (Gradients, Custom Fonts, Glassmorphism) are considered "Advanced Customizations". They may NOT comply with standard corporate UI guidelines (imui). Use these only for specific projects where a custom "Wow" factor is explicitly requested and approved.

## Context
Intra-mart's default UI (imui) can sometimes feel utilitarian. This research explores how to overlay modern CSS design trends onto the existing framework for specific high-end use cases.

## Design Patterns Explored

### 1. The "Wow" Header Strategy
Standard imui headers are flat. By applying a 135-degree linear gradient with dark indigo and violet tones, we create depth.
- **Key CSS**: `background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);`
- **Result**: Immediate visual impact upon page load.

### 2. Information Scannability via Stat Cards
Instead of hiding totals inside a table or footer, using "Stat Cards" at the top of the dashboard allows users to grasp system health in seconds.
- **Visuals**: Border-bottom accent colors (Blue for total, Red for critical) provide semantic meaning.
- **Implementation**: Flexbox layout for responsiveness.

### 3. Contextual Row Highlighting
Research into JQGrid's `gridComplete` event shows that we can dynamically inject CSS classes based on row data.
- **Use Case**: Highlighting "Critical Pending Nodes" (e.g., final approval stages).
- **Technique**: Use `addClass('im-workflow-highlight-row')` on the row element.

### 4. Typography Upgrades
Replacing standard system fonts with 'Outfit' or 'Inter' via Google Fonts (or local hosting) significantly softens the UI and makes it feel like a modern SaaS application.

## UI Performance Considerations
- **Inline Styles vs External**: For Intra-mart, inline styles within the HTML file (for specific dashboard elements) often provide better maintenance reliability during package deployments, despite being against general "best practices."
- **Asset Loading**: Using CSS animations (`fadeInUp`) adds a layer of "polish" without significant performance overhead.

## Future Recommendations
- Explore **Glassmorphism** for modal dialogs.
- Implement **Chart.js** integration for visual trend analysis of workflow completion times.
