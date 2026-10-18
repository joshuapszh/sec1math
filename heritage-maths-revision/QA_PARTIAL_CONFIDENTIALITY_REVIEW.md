# QA and confidential similarity review — 18 October 2026

Status: **PARTIAL. NOT APPROVED FOR STUDENTS.**

## Verified
- Exam confidentiality source documents were accessed privately; no exam source files are committed.
- Comparison of Secondary 1 Paper 1 draft prompts with readable paragraphs of the confidential Secondary 1 Paper 1 exam identified avoidable contextual similarities in school-library books and cyclist rates. Both draft prompts were replaced with different contexts. The revised questions retain their original correct numerical answers and mark allocations.
- Draft Question 1 topic metadata was corrected to whole-number arithmetic.
- GitHub development branch contains the fixes. The default `main` branch is not intentionally modified.

## Limitations
- This is **not** a completed leak audit: exam questions with equations, images, diagrams or embedded mathematical objects need individual visual comparison. Paper 2 and Secondary 2 exams were not exhaustively checked here.
- Local execution of the latest GitHub revision in Chromium was **not** achieved in this review. Network fetch of the repository into the local browser environment failed; do not treat the browser regression suite as passed.
- Method marking remains final-answer-based for most draft parts, not formal assessment of shown working.
- A question matching only by topic is not necessarily leakage; contextual similarity findings were handled conservatively.

## Required next gate
1. Run `qa.html` from the current branch through a local web server, capture failures.
2. Exercise navigation, Q6 algebra keyboard, hint/retry scores, local storage and graph plotting in a real browser.
3. Complete private visual comparison against *both* Sec 1 SA2 papers and marking schemes.
4. Review mathematical answer keys, part marks, syllabus/difficulty accuracy and accessibility independently.
5. No public student release without documented sign-off.
