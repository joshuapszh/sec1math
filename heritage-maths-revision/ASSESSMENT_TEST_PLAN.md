# Development assessment checks

Status: NOT RELEASE APPROVED. These are manual test cases, not completed browser test evidence.

## Reference set
- Load Secondary 1 / Paper 1 / Set 1. Ten questions, 50 marks.
- Question 6 Part (a) should accept `6x+2`, `2+6x`, `8+6*(x-1)` for 2 marks on the first unaided attempt.
- Question 6 Part (a) should reject `6x+8`; Part (b) should accept `122` and reject `120` independently.
- Blank responses and unsupported expressions should not consume the first attempt.
- A wrong but supported first submission receives 0 independent marks; later correct retries provide feedback but do not change this score.
- Hints or revealing a solution before first submission prevent independent credit.
- Reloading page should preserve input and first-attempt scoring.
- Existing progress saved against the old question-6 structure may conflict. Because the draft has changed, reset local development progress before testing. Stable identifiers and migrations are required before release.

## Algebra constraints
- Currently supports restricted single-variable polynomial input in x, degree <= 2, with integer/decimal coefficients.
- The toolbar inserts LaTeX, but the parser does not yet accept full LaTeX such as `\\frac` or `\\sqrt`; these must be identified as unsupported rather than marked wrong.
- Test errors like `x^3`, `x/2`, malformed brackets, unsupported functions, and blank entries.
- The polynomial parser requires independent tests before any student grading claims.

## Graph constraints
- The SVG graph currently supports integer coordinates and straight segments, not smooth curves or geometric constructions.
- The graph lab is outside the 50-mark set. Its point/connection test must not be treated as assessed exam work.
- Test point order, duplicates, extra points, wrong coordinates, graph reset, and high-DPI/scaled screen clicks.
- The mode-selected mark does not prove the drawn segment is a correct full straight line.

## Release gates
Do not deploy or link from the live student-facing index before:
1. Browser-based interaction testing;
2. Detailed mathematical review, alternative answers and partial marking;
3. Every graph and construction validated independently;
4. Complete source syllabus mapping;
5. Comparison against confidential SA2 papers kept entirely outside public GitHub.
