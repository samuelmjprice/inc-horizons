# Files Needing Amendment

Audit date: 1 June 2026

| File / Area | What Is Wrong | Why It Matters | Recommended Amendment | Changed Now | Follow-up Needed |
|---|---|---|---|---|---|
| `script.js` | Single large file contains all rendering and API logic. | Harder to maintain under pressure. | Modularize after event. | No | Yes |
| `content.json` | Many placeholders and confirmation markers. | Website is structurally ready but data is not fully final. | Team data completion pass. | No | Yes |
| `data/` workbooks | Multiple historical/current review files. | Can confuse future source-of-truth decisions. | Keep final approved workbook documented as source of truth. | No | Yes |
| `backups/` | Multiple large backup folders are committed. | Repo size grows quickly. | Keep for event safety; archive externally after event. | No | Yes |
| `assets/documents/*.pdf` | Large reference PDFs. | Could slow download if embedded. | Keep linked only. | No | Monitor |
| `Capture Log` | Local-only persistence. | Logs may not be shared across devices. | Add backend table/API if production use is approved. | No | Yes |
| Slack production routes | Pending setup/approval. | Avoid accidental channel noise. | Approve and enable in stages. | No | Yes |

## Do Not Delete Yet

Do not delete older trackers, backups, or reports before the event. They are useful audit/source trace material.
