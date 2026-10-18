# Secondary 1 Set 1 — release-gate comparison summary

**Status: Not approved for student use.**

## Confidentiality review scope
Reviewed Secondary 1 2026 SA2 Paper 1 and Paper 2 documents against the ten questions in `data/s1-p1-set1-draft.json`. The comparison included document-readable question scenarios, topic and task types, and previously identified similarities. Detailed exam question text, diagrams, numbers, and answer keys are intentionally omitted from this public repository.

## Findings
- Two earlier contexts resembling Paper 1 scenarios were already replaced in the reference set.
- Several **generic syllabus-level overlaps** remain, including number sequences, percentages, geometry, volumes, statistical averages and financial contexts. These topics are normal revision coverage and are not themselves evidence of question copying.
- Current draft scenarios are distinguishable from the readable narrative contexts in Papers 1 and 2. No verbatim confidential examination question has been identified within the inspected readable prompts.
- This is **not clearance**: mathematical expressions, diagrams and image-backed question elements must be checked visually side-by-side by the teacher. Matching answer structures and numerical parameters may be obscured in DOCX plain text extraction.

## Additional QA concerns
- The draft's simple final-answer marking is not equivalent to the examinations' essential-working requirements. Retain development-only status pending method-based marks.
- Some topic and difficulty assignments are provisional; mark distribution compliance alone is insufficient.
- Graph and construction questions remain underrepresented in the reference set compared with the actual exam skills.
- The current branch has an automated browser test page, but results for the latest repository revision have not been independently observed in a full browser session.

## Release gate
1. Visually compare all diagrams, embedded equations, and plotted graphs in the original confidential papers offline.
2. Complete question-by-question mathematical verification and mark-scheme alignment.
3. Run a real-browser regression of the exact GitHub branch revision, document screenshots and test outcomes.
4. Resolve method-marking and representation gaps, then obtain teacher approval.
5. Keep original exam assets, answer keys and detailed overlap matrices outside all public GitHub branches.
