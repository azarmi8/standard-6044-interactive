# SOURCE AUDIT — Standard 6044:1397

## Purpose
این فایل ledger ممیزی محتوای منتشرشده پروژه است. هدف آن این است که هیچ خلاصه، عدد، جدول، فرمول، استثنا یا معیار پذیرش بدون ریشه مشخص در PDF وارد نسخه نهایی نشود.

## Source lock
- Source: 6044-1397.pdf
- Revision: Second revision / 1397
- Pages: 81
- Structure: 15 chapters + 7 appendices (A–G) + bibliography

## Current audit state
| Unit | Source pages | Current project state | Audit state |
|---:|---:|---|---|
| 1 | 1 | ch01.md + HTML | VERIFIED_SOURCE_CONTENT |
| 2 | 2–4 | ch02.md + HTML | VERIFIED_SOURCE_CONTENT |
| 3 | 5–8 | ch03.md + HTML | VERIFIED_SOURCE_CONTENT |
| 4 | 9–10 | ch04.md + HTML | VERIFIED_SOURCE_CONTENT |
| 5 | 11–12 | ch05.md + HTML | VERIFIED_SOURCE_CONTENT |
| 6 | 12–15 | ch06.md + HTML | VERIFIED_SOURCE_CONTENT |
| 7 | 15–20 | ch07.md + HTML | VERIFIED_SOURCE_CONTENT |
| 8 | 21–22 | ch08.md + HTML | VERIFIED_SOURCE_CONTENT |
| 9 | 22–23 | ch09.md + HTML | VERIFIED_SOURCE_CONTENT |
| 10 | 24–28 | ch10.md + HTML | VERIFIED_SOURCE_CONTENT |
| 11 | 28–30 | ch11.md + HTML | VERIFIED_SOURCE_CONTENT |
| 12 | 30–32 | ch12.md + HTML | VERIFIED_SOURCE_CONTENT |
| 13 | 32–37 | ch13.md + HTML | VERIFIED_SOURCE_CONTENT |
| 14 | 38 | ch14.md + HTML | VERIFIED_SOURCE_CONTENT |
| 15 | 38–39 | ch15.md + HTML | VERIFIED_SOURCE_CONTENT |
| 16 / A | 40–48 | ch16.md + HTML | VERIFIED_SOURCE_CONTENT |
| 17 / B | 49–50 | ch17.md + HTML | VERIFIED_SOURCE_CONTENT |
| 18 / C | 51–52 | ch18.md + HTML | VERIFIED_SOURCE_CONTENT |
| 19 / D | 53–63 | ch19.md + HTML | VERIFIED_SOURCE_CONTENT |
| 20 / E | 64–66 | ch20.md + HTML | VERIFIED_SOURCE_CONTENT |
| 21 / F | 67–70 | ch21.md + HTML | VERIFIED_SOURCE_CONTENT |
| 22 / G | 71–72 | ch22.md + HTML | VERIFIED_SOURCE_CONTENT |
| 23 | 73 | ch23 HTML | BIBLIOGRAPHY_REVIEW |

## Verified milestone — Units 13–15
Chapters 13–15 were checked directly against source pages 32–39.

Key verified anchors:
- Chapter 13: material measurement, weighing/tolerance rules, batching equipment, Table 5, mixer capacity constraints and equipment requirements.
- Chapter 14: producer responsibility and production-control system scope.
- Chapter 15: conformity assessment and cases where an authorized body evaluates/approves production control.
- OCR ambiguity was not used to invent missing values.

## Verified milestone — Appendices A–G
Appendices A–G were checked directly against source pages 40–72.

Key verified anchors:
- A: uniformity evaluation, two-sample comparison, 15%/85% sampling path, Table A-1.
- B: target strength formulas and statistical-data path.
- C: air-content table for freeze/thaw exposure conditions.
- D: production-control records, initial testing, personnel/material/equipment control and control-program tables.
- E: supplementary controls for high-strength concrete.
- F: initial/periodic/extraordinary assessment and certification lifecycle.
- G: deleted/replaced/added clauses relative to the source standard.

## Important numeric/formula rule
Numeric values were only promoted to the Markdown when they were directly legible/confirmed from the source. Where a table is too dense for reliable OCR, the chapter explicitly treats the table as source data to be loaded from the PDF rather than reconstructing uncertain digits.

## High-priority findings

### F-001 — Invented Appendix H
Severity: High  
Status: Corrected.  
The source has appendices A–G only. The former Unit 23 was not source content and is now treated as bibliography/reference.

### F-002 — Existing interactive pages require final publication audit
Severity: High  
Status: Open — source structure and current numeric-bearing interactions are verified, but final clause-level audit of all published source-derived wording/cross-references remains a release gate.  
Existing HTML is a functional instructional scaffold. It must not be described as a verified reproduction of the standard until the interactive layer itself is audited against the verified Markdown/source ledger.

### F-003 — Numeric/acceptance content needs direct verification
Severity: High  
Status: Resolved for current interactive HTML.  
Units 1–22 have now had direct source review. The current numeric-bearing interactive chapters were reconciled against the verified source ledger: Ch7 temperature limits; Ch8 15%/85% sampling and 15-minute interval; Ch10 slump/SCC classes and fresh-density tolerance; Ch11 sampling/conformity criteria; Ch13 mixer capacity constraints; Appendix B formulas; Appendix C air-content values; Appendix D record-retention period; Appendix F surveillance/extraordinary-audit triggers. Future simulation logic must use the same source-ledger data rather than duplicating numbers.

### F-004 — OCR ambiguity
Severity: Medium  
Status: Process locked.  
When extracted Persian text is ambiguous, inspect the source page image before editing content. Do not infer missing digits or symbols.

## Audit rule
A source-derived item becomes VERIFIED only when:
1. the source page is identified;
2. the clause/table/formula is identified when applicable;
3. the published wording is faithful educational paraphrase;
4. numeric values and exceptions are directly checked;
5. any interpretation is labeled as educational interpretation rather than source text.

## Phase 1 status
**COMPLETE — Source Lock & Audit.**

The source identity, 15-chapter + A–G structure, page map, correction of the former Appendix H, and source-reading pass for Units 1–22 are locked. The remaining work is a final clause-level audit of the published educational wording/cross-references, which belongs to the release QA gates and does not reopen source scope.
