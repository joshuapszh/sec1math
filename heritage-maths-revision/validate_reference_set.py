#!/usr/bin/env python3
"""Validate mark allocations and integrity; NOT a substitute for mathematical review."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent
bank=json.loads((root/'data/s1-p1-set1-draft.json').read_text(encoding='utf-8'))['questions']
assert len(bank)==10
assert len({q['id'] for q in bank})==10
assert sum(q['marks'] for q in bank)==50
assert sum(q['marks'] for q in bank if q['book']=='1A')==10
assert sum(q['marks'] for q in bank if q['book']=='1B')==40
for d,expected in [('basic',25),('moderate',20),('challenging',5)]:
    assert sum(q['marks'] for q in bank if q['difficulty']==d)==expected
for q in bank:
    assert len(q['steps'])==len(q['stepMarks'])==2
    assert sum(q['stepMarks'])==q['marks']
    assert len(q['solution'])==2
    assert q['teacherReviewStatus']=='UNVERIFIED'
print('Schema and mark-distribution checks passed.')
print('No mathematical or confidential-exam similarity audit has been performed.')
