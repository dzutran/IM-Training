# Deploying the Agent Team to a New Environment

This guide explains how to migrate this standardized AI Agent infrastructure to a new machine, workspace, or a real-world project.

---

## 🚀 Quick Migration Steps

### 1. Clone the Infrastructure
Ensure the `dzu/` folder is present in your new project root. This folder contains the "Brain" of the operation.
```bash
git clone <your-repo-url>
```

### 2. Boot up the "AI Brain"
Copy the instructions and personas from the project folder into the AI's global skills directory.
- **Source**: `dzu/agent_instructions/*`
- **Destination**: `.gemini/antigravity/skills/` (or your AI's specific skill path)

### 3. Activation Prompt
Once the skills are copied, start your first conversation with the following prompt:
> "I have initialized the workspace with the dzu infrastructure. Please read the `AGENT_PROTOCOL.md` and `RULES.md` in your skills folder. Identify yourself as the Lead Architect and verify the current project state against the `dzu/knowledge` base. We are ready to begin."

---

## 🧠 Why This System is Portable
1.  **Framework Agnostic**: The rules for Intra-mart (SQL standards, imui tags, Transaction safety) are the same across all IAP (Intra-mart Accel Platform) versions.
2.  **Persona-Based**: By defining Personas (`Developer`, `Reviewer`, etc.), you ensure the AI maintains a professional mindset regardless of the workspace.
3.  **Knowledge-Driven**: The `dzu/knowledge` folder acts as a "Long-Term Memory". Any agent can read the existing research reports and guides to understand the project's history in minutes.

---

## 🛠️ Customizing for Real Projects
When moving to a real client project:
1.  **Update `01_standards/coding_rules.md`**: Add client-specific naming conventions.
2.  **Update `01_standards/workflow_plugin_reference.md`**: Map the specific Plugin IDs used in the client's environment.
3.  **Clean `03_research/`**: Remove training-specific reports but keep the universal Intra-mart "Gotchas".

---
*Created: 2026-05-08 | Intra-mart Agentic Infrastructure v2.0 | Standardized for dzutran/IM-Training*
