# Practice question schema (development)

Required: `id`, `level`, `paper`, `set`, `topic`, `book`, `marks`, `difficulty`, `type`, `prompt`, `accepted_answers`, `hints`, `steps`, `solution`, `explanation`, `common_mistakes`, `marking_rules`.

Accepted types: numeric, algebra, multiple_part, written_self_mark, interactive_graph, construction_self_mark.

Never assume final-answer correctness awards all method marks. Independent score must be separately tracked from assisted mastery. Match decimal accuracy to each question's expected precision. Use dedicated symbolic math evaluation for expressions; do not compare raw LaTeX strings.

Each published set must have exactly 50 marks with 10 Semester 1 / 40 Semester 2 and 25 basic / 20 moderate / 5 challenging marks. Data currently in demo-questions.json are development fixtures, not a completed set. Review confidentiality **before** publishing any complete question bank.
