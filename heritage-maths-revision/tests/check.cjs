/* Run: node heritage-maths-revision/tests/check.cjs
   Functional checks: no confidential question source material. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const sandbox={window:{},console,localStorage:(()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}})(),Date,JSON};
vm.createContext(sandbox);
for(const f of ['algebra-check.js','marking.js','progress.js','set-generator.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),sandbox,{filename:f});
const {HAAlgebra, HAMarking, HAProgress}=sandbox.window;
let count=0;function test(desc,fn){try{fn();console.log('PASS',desc);count++}catch(e){console.error('FAIL',desc,e.message);process.exitCode=1}}
test('Equivalent algebra',()=>assert.equal(HAAlgebra.check('8+6*(x-1)','6x+2').equivalent,true));
test('Negative squared term precedence',()=>assert.equal(HAAlgebra.check('-x^2','-1*x^2').equivalent,true));
test('Numeric fraction LaTeX',()=>assert.equal(HAAlgebra.check('\\frac{6}{2}x','3x').equivalent,true));
test('Numeric square root LaTeX',()=>assert.equal(HAAlgebra.check('\\sqrt{9}x','3x').equivalent,true));
test('Incorrect algebra rejected',()=>assert.equal(HAAlgebra.check('6x+8','6x+2').equivalent,false));
test('Unsupported algebra rejected safely',()=>assert.equal(HAAlgebra.check('x/2','x').supported,false));
test('Numerical blank not counted',()=>assert.equal(HAMarking.evaluate('numeric','',42).supported,false));
test('Numerical correct',()=>assert.equal(HAMarking.evaluate('numeric','42',42).correct,true));
const expected={points:[[0,1],[1,2],[2,3]],mode:'line',line:{m:1,c:1}};
test('Graph exact points',()=>assert.equal(HAMarking.evaluate('graph',{points:[[1,2],[0,1],[2,3]],mode:'line'},expected).correct,true));
test('Graph extra point rejected',()=>assert.equal(HAMarking.evaluate('graph',{points:[[0,1],[1,2],[2,3],[3,4]],mode:'line'},expected).correct,false));
test('Graph wrong line rejected',()=>assert.equal(HAMarking.evaluate('graph',{points:[[0,1],[1,2],[2,4]],mode:'line'},expected).correct,false));
const questions=JSON.parse(fs.readFileSync(path.join(root,'data/s1-p1-set1-draft.json'),'utf8')).questions;
test('Ten unique questions',()=>{assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10)});
test('Mark blueprint correct',()=>{const sum=p=>questions.filter(p).reduce((s,q)=>s+q.marks,0);assert.equal(sum(()=>true),50);assert.equal(sum(q=>q.book==='1A'),10);assert.equal(sum(q=>q.book==='1B'),40);for(const [level,n] of [['basic',25],['moderate',20],['challenging',5]])assert.equal(sum(q=>q.difficulty===level),n)});
test('Method allocation remains explicitly provisional',()=>assert.ok(questions.every(q=>q.teacherReviewStatus==='UNVERIFIED')));
test('Answers internally consistent',()=>{for(const q of questions){assert.equal(q.steps.length,q.stepMarks.length);assert.equal(q.stepMarks.reduce((s,v)=>s+v,0),q.marks);for(const step of q.steps)assert.equal(HAMarking.evaluate(step.type||'numeric',String(step.answer),step.answer).correct,true)}});
test('Progress restore after refresh',()=>{const q=questions[0];HAProgress.save(questions,{[q.id]:{answers:['36','252'],attempts:[1,1],firstScore:[2,3],hints:0,revealed:false}},[]);const r=HAProgress.load(questions);assert.equal(r.records[q.id].firstScore[1],3)});
test('Changed questions quarantined',()=>{const changed=questions.map(q=>q.id===questions[0].id?{...q,prompt:'UPDATED'}:q);const r=HAProgress.load(changed);assert.equal(!!r.records[questions[0].id],false);assert.equal(r.quarantined.length,1)});
console.log('Completed',count,'checks; exit',process.exitCode||0);

test('All 12 revision set blueprints',()=>{for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;assert.equal(qs.length,10);assert.equal(qs.reduce((a,q)=>a+q.marks,0),50);assert.equal(qs.filter(q=>q.book===level+'A').reduce((a,q)=>a+q.marks,0),10);for(const q of qs)for(const step of q.steps)assert.equal(HAMarking.evaluate(step.type||'numeric',String(step.answer),step.answer).correct,true)}});
