# Mathematics practice: release review status

Review date: 2026-10-18. Development branch only.

## Completed
- All twelve choices exist; 11 are generated drafts, one is a separately authored reference draft.
- Structural blueprint and supported answer-checker regression checks are automated.
- Cross-checks cover line gradients/intercepts, L-shaped area, average journey speed, cone surface area, and two-dice probability enumeration.
- Teacher-preview instructions are available in TEACHER_PREVIEW.md.
- The generated two-spin spinner scenario was replaced with an independently enumerated two-dice scenario to increase context variety.

## Release blockers
1. The generated practice banks still have heavily repeated mathematical structures. They are not fully independent practice papers.
2. Some model-work explanations are generic templates rather than fully tailored pedagogical solutions.
3. Numerical answer checking does not fully verify significant-figure presentation.
4. The confidential exam comparison is limited: teacher materials have been checked privately at topic/context level, not subjected to a complete visual question-by-question overlap review. No exam content is stored in this repository.
5. Source textbook chapter alignment for every generated topic has not been confirmed, and no teacher has signed off all questions.
6. The reference bank remains provisional and its first-attempt score represents automatically checkable answers, not examination method marks.

## Student assignment gate
Do not mark the bank as approved or add it to the live student homepage until every prompt, diagram, numerical answer, rounding requirement, hint and model working has been independently checked, and a private exam similarity audit has been completed.

## Private source-based audit update (18 October 2026)
Available school files were reviewed privately: Secondary 1 EOY Paper 1 (version 2) and its marking scheme, Secondary 2 EOY Paper 2 (amended) and Secondary 2 Paper 1 marking scheme, plus both simplified TOS documents. This is *not* a completed audit of both full exam papers for both levels: some mathematics expressions were absent from parsed source text and graphics need separate visual inspection.

- **Confirmed syllabus issue fixed:** The generated Secondary 2 two-roll probability task was replaced by a single-event counting task, matching the scope of the Secondary 2B probability chapter more closely. Its answers have an independent outcome-enumeration test.
- **Structural similarity risk remains:** Both level banks share routine contexts such as average speed, similarity, surface area and median/mean with the examinations. These are standard curriculum topics, and overlap at the topic level is not automatically leakage. A private item-by-item comparison of numbers, phrasing, diagrams and solution paths is still needed before release.
- **Scope mismatch remains:** The generated questions do not fully cover every chapter named in the TOS, particularly statistical diagrams and inequalities. The 20%/80% marks split does not on its own guarantee topic coverage.
- **No publication approval:** The site remains teacher-preview only, with teacherReviewStatus UNVERIFIED. Never commit examination content, exam excerpts or private similarity matrices to public GitHub.

## 18 October source cross-check (four exam papers, parsed text)
- The Secondary 1 Paper 1 and Paper 2 and Secondary 2 Paper 1 and Paper 2 were examined privately at question-heading and extractable-context level, together with the existing TOS. Most assessed topics recur in the practice bank by design; such topic overlap alone is not a confidential-question match.
- Full visual inspection remains necessary: source DOCX math expressions, embedded graphs and construction diagrams were incompletely represented in extracted text, so exact item-by-item similarity cannot yet be certified.
- A genuine display defect was corrected: generated straight-line graphs with high intercepts could place plotted points outside the fixed vertical area. The graph now scales to plotted values, and browser regression coverage was added.
- Unresolved: several draft sets reuse the same ten-question template with different numbers; they do not fully reproduce the intended Paper 1/Paper 2 cognitive-demand distinction. Chapter-level coverage and all individual model solutions need teacher approval.
- **Release gate remains closed.** Never upload original papers, figures, answer keys or similarity matrices to this public GitHub repository.

## Visual review extension — 18 October 2026
The four available paper files were located. Selected pages containing geometry, inequalities, graphs and composite solids were requested in rendered-page mode. One Secondary 2 composite-solid diagram was visually inspectable and confirms the substantial construction-level similarity risk already corrected in the development bank. Some other embedded page images or equations were unavailable or omitted in the document reader; therefore no complete four-paper **visual clearance** is claimed.

Safeguards added: development regression tests require the corrected Secondary 2 Paper 2 composite to use a different joined-solid construction, and the corrected Secondary 1 Paper 2 unit-rate questions to avoid the previously flagged stop-inclusive travel template. These are narrow regression checks, not comprehensive plagiarism detection.

### Remaining private teacher gate
- Compare every question and embedded diagram in all four examination papers against all twelve revision sets; inspect equations and plotted graphs at native resolution where the reader failed
- Verify every draft numerical answer and model-working step, particularly precision, diagrams and physical units
- Confirm question variety and Paper 2 application demand, then record a teacher-only approval outside public GitHub
- Do not assign or publish while these checks remain incomplete

## Presentation-consistency follow-up (18 October 2026)
- Corrected the generated Secondary 1 average-rate question to explicitly request two decimal places; its stored answer already used two-place rounding.
- Required two decimal places for generated monetary discount and payable-amount responses and added corresponding checker regression coverage.
- These checks assess mathematical answer presentation, not student written methods or full examination equivalence.
- Unresolved: rendered equations and figures from several confidential exam DOCX pages remain unavailable for complete visual comparison. No full confidentiality clearance or teacher approval is claimed.
