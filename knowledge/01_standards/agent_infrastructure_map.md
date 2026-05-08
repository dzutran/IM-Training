# Agent Infrastructure & Knowledge Map

This document explains the organization of the project's "Digital Brain" (the `dzu` folder).

---

## 🏗️ 1. Instruction Layer (`dzu/agent_instructions/`)
The "Executive Branch" that tells the AI **how to behave**.
- `RULES.md`: Mandatory coding and safety constraints.
- `AGENT_PROTOCOL.md`: The 5-stage workflow (Research -> QA).
- `DEPLOY_AGENTS.md`: How to move this team to other projects.
- `TASK_CHECKLIST.md`: The TODO list for every task.
- `PERSONA_*.md`: Role definitions (Architect, Developer, etc.).

## 📚 2. Knowledge Layer (`dzu/knowledge/`)
The "Memory Bank" that contains **project intelligence**.

### `01_standards/` (The Laws)
Stable rules that rarely change.
- `coding_rules.md`: Naming, structure, and aesthetics.
- `workflow_programming_best_practices.md`: Architectural safety.
- `workflow_plugin_reference.md`: Technical IDs and formats.

### `02_guides/` (The References)
Quick lookup guides for daily work.
- `imui_design_system.md`: The visual dictionary (Buttons, Icons, Layouts).
- `imui_validation_guide.md`: How to implement robust validation.
- `workflow_script_guide.md`: Logic patterns for Workflow nodes.

### `03_research/` (The Experience)
Case studies and troubleshooting reports from past development.
- `workflow_dynamic_node_research.md`: Deep dive into complex routing.
- `dynamic_node_troubleshooting_report.md`: Critical bugs and fixes.
- `ai_collaboration_report.md`: Lessons learned in AI-human pairing.

## 🛠️ 3. Practice Layer (`dzu/practices/`)
The "Reference implementation" – real code samples.
- `practice_initial/`: The foundational legacy screen refactored.
- `practice_wf/`: Advanced workflow implementations.

---
*Created: 2026-05-08 | Project Architecture v2.0*
