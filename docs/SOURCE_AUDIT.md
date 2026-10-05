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
| 1 | 1 | ch01.md + HTML | NEEDS_CLAUSE_AUDIT |
| 2 | 2–4 | ch02.md + HTML | NEEDS_CLAUSE_AUDIT |
| 3 | 5–8 | ch03.md + HTML | NEEDS_CLAUSE_AUDIT |
| 4 | 9–10 | ch04.md + HTML | NEEDS_CLAUSE_AUDIT |
| 5 | 11 | ch05.md + HTML | NEEDS_CLAUSE_AUDIT |
| 6 | 12–14 | ch06.md + HTML | NEEDS_CLAUSE_AUDIT |
| 7 | 15–20 | ch07.md + HTML | NEEDS_CLAUSE_AUDIT |
| 8 | 21 | ch08.md + HTML | NEEDS_CLAUSE_AUDIT |
| 9 | 22–23 | ch09.md + HTML | NEEDS_CLAUSE_AUDIT |
| 10 | 24–27 | ch10.md + HTML | NEEDS_CLAUSE_AUDIT |
| 11 | 28–29 | ch11.md + HTML | NEEDS_CLAUSE_AUDIT |
| 12 | 30–31 | ch12.md + HTML | NEEDS_CLAUSE_AUDIT |
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

## Phase 1 exit condition
No unit is marked fully verified merely because its HTML works. Phase 1 closes only after all source-derived claims in Units 1–22 have a source location and verification status.