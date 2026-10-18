# Teacher calibration using simulated student scripts

**18 October 2026 · DEVELOPMENT ONLY · No real student scripts received**

This document checks the existing draft marking guide against *constructed* student working. It is an internal calibration exercise, not evidence of teacher agreement or of actual student performance.

## Calibration examples

| Item | Simulated student working | Suggested manual credit | Why |
|---|---|---|---|
| Q1(b), 3m | Correct response 252 only, no working | **At most A1, subject to teacher policy** | Bare result does not demonstrate two distinct method steps. Current app would award all three marks. |
| Q1(b), 3m | Writes 432 × 7 ÷ 12 = 252 | **3/3** | Valid direct one-line alternative: ratio model, execution and accuracy. Do not demand intermediate 36. |
| Q2(a), 2m | 54 ÷ 2 = 27; 27 − 9 = 18 cm | **2/2** | Equivalent perimeter approach. |
| Q2(b), 3m | Earlier length incorrectly 17 cm; writes x+4=17, x=13 | **2/3 provisionally (follow-through)** | Valid relationship and isolation from the earlier value, but incorrect final answer; judge whether the initial error was already penalised. |
| Q3(b), 3m | One part mistakenly calculated as 8, then 3 × 8 = 24 | **Up to 2/3 (follow-through)** | Identifies three parts and multiplies consistently; the final A mark is not earned. Avoid penalising the same initial error twice. |
| Q4(b), 3m | 120 × 0.85 = 102 | **3/3** | Direct percentage method is fully valid; the two existing M bullets should not imply redundant computation is required. |
| Q5(b), 3m | 84 ÷ (3+2) = 16.8 L/min | **3/3** | A single concise expression demonstrates both total-time calculation and rate. |
| Q6(a), 3m | 7 + 5(x−1), not expanded | **3/3** | Mathematically equivalent nth term. Accept equivalent algebraic expression and avoid requiring 5x+2 exclusively. |
| Q6(b), 2m | Uses incorrect expression 5n+3, finds 78 | **1/2 possible follow-through** | Valid substitution at n=15, incorrect answer. |
| Q7(b), 3m | 240 − 36 = 204 m², with no earlier record of squaring | **2–3/3 depending visible working** | If 36 was established in working, three marks may be defensible; if unexplained, cannot assume how it was obtained. |
| Q8(a), 2m | Writes sorted data, then median 11 | **2/2** | Correct ordering and answer. |
| Q8(b), 3m | 78 ÷ 7 = 11.142857, final 11.14 | **2/3** | Correct method, rounding does not satisfy three significant figures. |
| Q9(b), 3m | Earlier area incorrectly 46 cm²; uses 46 × 15 = 690 cm³ | **Up to 2/3 follow-through** | Correct volume relationship and use of prior area, but wrong final result. |
| Q10(a), 2m | 35 × 7 + 15 × 3 = 290 | **2/2** | Valid revenue from both sales groups. |
| Q10(b), 3m | Profit 90; computes 90 ÷ 290 × 100 = 31.0% | **1/3 suggested** | Correct profit, wrong denominator for percentage of cost. |
| Q10(b), 3m | (290 − 200)/200 × 100 = 45% | **Method 2/2; A mark subject to specified 1 d.p. convention** | Numerical value correct; requested displayed format is 45.0%. Teacher should set a consistent policy for the missing decimal place. |

## Rubric corrections required

1. **No double-awarding method points.** Two method marks in a three-mark part must correspond to genuinely separable mathematical decisions, not two restatements of one operation. Where only one meaningful method step exists, revise mark allocation or the problem.
2. **Accept compact correct working.** A single formula may visibly demonstrate multiple operations; do not make step-by-step narration compulsory if the mathematics is complete.
3. **Follow-through credit is conditional.** Award later method credit for a correct process using an earlier mistaken result when the error is not a conceptual invalidation; never assume the final A mark when the answer differs.
4. **Equivalent expressions are valid.** Q6(a) accepts 7+5(x−1), 5x+2 and any algebraically equivalent form; letter choice should match the interface's documented entry convention.
5. **Numerical accuracy vs displayed accuracy.** Q8(b) needs 11.1 (3 s.f.). Q10(b) asks for 45.0% (1 d.p.); a bare numeric checker currently sees 45 and 45.0 as equal and must not silently claim presentation compliance.
6. **Units.** Consider units on length, area, volume and rates consistently. Avoid hidden marks or repeatedly penalising a single missing unit.
7. **Question realism.** Several 3-mark parts remain one- or two-operation tasks. Rewriting these items and rubrics together is preferable to inventing marks for repetition.

## Recommended teacher moderation template

For each script: record question/part, verbatim working, method points supported, accuracy points supported, follow-through basis, unit/precision decisions, total proposed marks, teacher-reviewed marks and reasons for any difference.

## Decision

**Do not implement automatic method scoring yet.** This exercise used hypothetical responses; obtain anonymised real student scripts or teacher-authored examples marked independently by two reviewers to establish agreement before deploying a method-mark model. No confidential exam sources or student identifiers are included here.
