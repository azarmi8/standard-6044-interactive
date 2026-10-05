# SOURCE AUDIT — Standard 6044:1397

## Purpose
این فایل ledger ممیزی محتوای منتشرشده پروژه است. هدف آن این است که هیچ خلاصه، عدد، جدول، فرمول، استثنا یا معیار پذیرش بدون ریشه مشخص در PDF وارد نسخه نهایی نشود.

## Source lock
- Source: 6044-1397.pdf
- Revision: Second revision / 1397
- Pages: 81
- Structure: 15 chapters + 7 appendices (A–G) + bibliography
- Printed-page starts: see docs/SOURCE_VERIFICATION.md

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
| 13 | 32–37 | ch13.md + HTML | NEEDS_CLAUSE_AUDIT |
| 14 | 38–39 | ch14.md + HTML | NEEDS_CLAUSE_AUDIT |
| 15 | 38–39 | ch15.md + HTML | NEEDS_CLAUSE_AUDIT |
| 16 | 40–48 | ch16 HTML | NEEDS_CLAUSE_AUDIT |
| 17 | 49–50 | ch17 HTML | NEEDS_CLAUSE_AUDIT |
| 18 | 51–52 | ch18 HTML | NEEDS_CLAUSE_AUDIT |
| 19 | 53–63 | ch19 HTML | NEEDS_CLAUSE_AUDIT |
| 20 | 64–66 | ch20 HTML | NEEDS_CLAUSE_AUDIT |
| 21 | 67–70 | ch21 HTML | NEEDS_CLAUSE_AUDIT |
| 22 | 71–72 | ch22 HTML | NEEDS_CLAUSE_AUDIT |
| 23 | 73 | ch23 HTML | BIBLIOGRAPHY_REVIEW |

Page ranges are derived from the source table of contents and following section starts. Exact clause claims still require direct page-level verification.

## Verified milestone — Units 5–8

Units 5–8 were checked directly against `6044-1397.pdf` for their mapped source ranges. Chapters 5–8 were rewritten as source-grounded educational paraphrase. Key numeric anchors in Chapters 7–8, including the temperature table and the 15%/85% sampling points, were checked directly against the source.

## Verified milestone — Units 9–12

Units 9–12 were checked directly against the source PDF for their mapped page ranges. The published Markdown was rewritten as source-grounded educational paraphrase. Key acceptance values and sampling rules were checked directly where visible in the source; formulas whose OCR representation was incomplete were intentionally not reconstructed.

## High-priority findings

### F-001 — Invented Appendix H
Severity: High  
Status: Corrected in project navigation/docs.  
The source has appendices A–G only. The former Unit 23 was labeled «پیوست ح — جمع‌بندی کاربرد». This was not source content. Unit 23 is now treated as bibliography/reference.

### F-002 — Existing interactive pages are not source-final
Severity: High  
Status: Open.  
Existing HTML is a functional instructional scaffold. It must not be described as a verified reproduction of the standard until clause-level audit is complete.

### F-003 — Numeric/acceptance content needs direct verification
Severity: High  
Status: Open.  
Any S1–S4, air, temperature, density, strength, sampling frequency, conformity, table or formula content must be checked against the exact source table/clause before release.

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

## Verified milestone — Units 1–4

Units 1–4 were re-read against the source PDF pages and their Markdown content was rewritten as source-grounded educational paraphrase. Units 5–8 and 9–12 are now verified. Units 13–22 remain open for clause-level audit.

## Phase 1 exit condition
No unit is marked fully verified merely because its HTML works. Phase 1 closes only after all source-derived claims in Units 1–22 have a source location and verification status.