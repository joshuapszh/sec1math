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

test('Generated set variants have unique prompt signatures',()=>{const fingerprints=new Set();for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const q=sandbox.window.HASetGenerator.make(level,paper,set).questions;const signature=JSON.stringify(q.map(x=>x.prompt));assert.equal(fingerprints.has(signature),false,'Duplicate question bank '+level+'/'+paper+'/'+set);fingerprints.add(signature)}});
test('Generated set topics, answers and rounding requirements',()=>{for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;assert.equal(new Set(qs.map(x=>x.id)).size,10);for(const q of qs){assert.equal(q.steps.length,2);assert.equal(q.stepMarks.reduce((sum,x)=>sum+x,0),5);assert.equal(q.solution.length,2);assert.equal(q.hints.length,3);for(const part of q.steps)assert.ok(typeof part.answer==='number'||typeof part.answer==='string');if(/mean|probability|volume of cones/i.test(q.topic))assert.ok(q.steps[1].type==='numeric')} }});

test('Decimal-place marking accepts requested trailing zeros',()=>{assert.equal(HAMarking.evaluate('numeric','0.500',0.5,{decimalPlaces:3}).correct,true);assert.equal(HAMarking.evaluate('numeric','0.5',0.5,{decimalPlaces:3}).correct,false);assert.equal(HAMarking.evaluate('numeric','11.10',11.1,{decimalPlaces:2}).correct,true)});
test('Generated sets supply decimal precision rules where stated',()=>{for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;for(const q of qs){if(/2 decimal places/.test(q.prompt))assert.equal(q.steps[1].format?.decimalPlaces,2);if(/3 decimal places/.test(q.prompt))assert.equal(q.steps[1].format?.decimalPlaces,3)}}});

test('Linear graph items use mathematically consistent slope and intercept',()=>{for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){const q=sandbox.window.HASetGenerator.make(2,paper,set).questions[1];assert.equal(q.diagram.kind,'linear-graph');for(const [x,y] of q.diagram.points)assert.equal(y,q.steps[0].answer*x+q.steps[1].answer)}});
test('L shape area is outer rectangle minus cutout',()=>{for(let paper=1;paper<=2;paper++){const q=sandbox.window.HASetGenerator.make(1,paper,3).questions[6];const d=q.diagram;assert.equal(d.kind,'cutout-rectangle');assert.equal(q.steps[0].answer,d.outer[0]*d.outer[1]);assert.equal(q.steps[1].answer,q.steps[0].answer-d.inner[0]*d.inner[1])}});

test('Journey-rate variant arithmetic',()=>{for(let paper=1;paper<=1;paper++){const q=sandbox.window.HASetGenerator.make(1,paper,2).questions[4];assert.equal(q.topic,'Speed and distance');const m=q.prompt.match(/covers (\d+) km in 2 hours and then (\d+) km in (\d+) hours/);assert.ok(m);assert.equal(q.steps[0].answer,Number(m[1])+Number(m[2]));assert.equal(q.steps[1].answer,Math.round((Number(m[1])+Number(m[2]))/(2+Number(m[3]))*100)/100)}});
test('Cone surface-area variant arithmetic and format',()=>{for(let paper=1;paper<=2;paper++){const q=sandbox.window.HASetGenerator.make(2,paper,3).questions[8];assert.equal(q.topic,'Surface area of cones');assert.equal(q.steps[1].format.decimalPlaces,2);const match=q.prompt.match(/radius (\d+) cm and slant height (\d+) cm/);assert.ok(match);const r=Number(match[1]),l=Number(match[2]);assert.equal(q.steps[1].answer,Math.round(3.142*r*(r+l)*100)/100)}});

test('Every generated draft includes answer explanations and correct allocations',()=>{for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;for(const q of qs){assert.ok(q.prompt.length>35);assert.equal(q.hints.length,3);assert.equal(q.solution.length,2);assert.ok(q.solution.every(s=>typeof s==='string'&&s.trim().length>0));assert.equal(q.stepMarks[0]+q.stepMarks[1],5);assert.equal(q.teacherReviewStatus,'UNVERIFIED')}}});

test('All generated solutions contain calculation and concept explanation',()=>{for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){if(level===1&&paper===1&&set===1)continue;const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;for(const q of qs){assert.equal(q.solution.length,2);assert.ok(q.solution.every(x=>x.includes('Part (')&&x.includes('Check that your answer')));assert.ok(q.explanation.length>=40)}}});

test('Independent one-card outcome enumeration',()=>{const n=Array.from({length:12},(_,i)=>i+1);const a=n.filter(x=>x%3===0),u=n.filter(x=>x%3===0||x%4===0);for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){const q=sandbox.window.HASetGenerator.make(2,paper,set).questions[9];assert.equal(q.steps[0].answer,a.length);assert.equal(q.steps[1].answer,u.length/n.length);assert.equal(q.steps[1].format.decimalPlaces,3)}});

test('Significant figure checker',()=>{assert.equal(HAMarking.evaluate('numeric','12.3',12.3,{significantFigures:3}).correct,true);assert.equal(HAMarking.evaluate('numeric','12.30',12.3,{significantFigures:3}).correct,false);assert.equal(HAMarking.evaluate('numeric','0.0123',0.0123,{significantFigures:3}).correct,true);assert.equal(HAMarking.evaluate('numeric','0.01230',0.0123,{significantFigures:3}).correct,false)});
test('Cone-volume draft sets explicitly require three significant figures',()=>{for(let paper=1;paper<=2;paper++)for(let set=1;set<=2;set++){if(paper===2&&set===1)continue;const q=sandbox.window.HASetGenerator.make(2,paper,set).questions[8];assert.equal(q.steps[1].format.significantFigures,3)}});

test('Scientific notation and ambiguous integer significant figures',()=>{
 assert.equal(HAMarking.evaluate('numeric','1.20e3',1200,{significantFigures:3}).correct,true);
 assert.equal(HAMarking.evaluate('numeric','1.2e3',1200,{significantFigures:3}).correct,false);
 assert.equal(HAMarking.evaluate('numeric','0.01230',0.0123,{significantFigures:3}).correct,false);
 assert.equal(HAMarking.evaluate('numeric','0.0123',0.0123,{significantFigures:3}).correct,true);
 assert.match(HAMarking.evaluate('numeric','1200',1200,{significantFigures:3}).message,/ambiguous/);
});
test('Independently recompute generated statistics and numerical probability',()=>{
 for(let level=1;level<=2;level++)for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){
  if(level===1&&paper===1&&set===1)continue;
  const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;
  const stat=qs.find(q=>q.topic==='Statistics'||q.topic==='Averages');
  assert.ok(stat);
  const values=(stat.prompt.match(/(?:are |values are )([\d, ]+)\./)||[])[1];
  assert.ok(values,'Must find seven input values');
  const nums=values.split(',').map(x=>Number(x.trim())),sorted=[...nums].sort((a,b)=>a-b);
  assert.equal(nums.length,7);
  assert.equal(stat.steps[0].answer,sorted[3]);
  assert.equal(stat.steps[1].answer,Math.round(nums.reduce((a,b)=>a+b,0)/7*100)/100);
  if(level===2){
    const event=qs[9];assert.equal(event.steps[0].answer,4);
    assert.equal(event.steps[1].answer,0.5);
  }
 }
});

test('Inequality practice solutions follow the strict boundary',()=>{for(let paper=1;paper<=2;paper++){const q=sandbox.window.HASetGenerator.make(1,paper,2).questions[5];assert.equal(q.topic,'Simple inequalities');assert.equal(q.steps[1].answer,q.steps[0].answer-1);assert.ok(q.prompt.includes('<'))}});
test('Histogram density answers independently checked',()=>{for(let paper=1;paper<=2;paper++){const q=sandbox.window.HASetGenerator.make(2,paper,2).questions[7];assert.equal(q.topic,'Statistical diagrams');const p=q.prompt.match(/widths ([\d, ]+) minutes and frequencies ([\d, ]+)\./);assert.ok(p);const w=p[1].split(',').map(Number),f=p[2].split(',').map(Number),d=f.map((x,i)=>x/w[i]);assert.equal(q.steps[0].answer,d[1]);assert.equal(q.steps[1].answer,Math.max(...d))}});

test('Generated practice topic coverage and question classifications remain explicit',()=>{
 const required={1:['Ratio','Percentage','Number patterns','Linear graphs','Simple inequalities','Composite area','Volume of prisms','Statistics'],2:['Linear graphs','Similarity','Pythagoras theorem','Trigonometry','Surface area','Probability','Statistical diagrams','Averages']};
 for(const level of [1,2]){
  const topics=new Set();
  for(const paper of [1,2])for(const set of [1,2,3]){
   if(level===1&&paper===1&&set===1)continue;
   for(const q of sandbox.window.HASetGenerator.make(level,paper,set).questions)topics.add(q.topic);
  }
  for(const topic of required[level])assert.ok(topics.has(topic),level+' missing '+topic);
 }
});

test('Secondary 1 new coordinate line uses correct substitution and intercept',()=>{
 for(let paper=1;paper<=2;paper++){
  const q=sandbox.window.HASetGenerator.make(1,paper,3).questions[4];
  assert.equal(q.topic,'Linear graphs');
  assert.equal(q.diagram.kind,'linear-graph');
  assert.equal(q.steps[1].answer,q.diagram.intercept);
  assert.equal(q.steps[0].answer,2*q.diagram.slope+q.diagram.intercept);
  for(const [x,y] of q.diagram.points)assert.equal(y,q.diagram.slope*x+q.diagram.intercept);
 }
});

test('Paper 2 application variants compute independently',()=>{
 for(const set of [1,2,3]){
  const a=sandbox.window.HASetGenerator.make(1,2,set).questions[9];
  const b=sandbox.window.HASetGenerator.make(2,2,set).questions[3];
  assert.equal(a.topic,'Financial decisions');
  assert.equal(b.topic,'Similarity of areas');
  const m=a.prompt.match(/buys (\d+) reusable cups for SGD (\d+) each.*sells (\d+) cups at SGD (\d+) and five cups at SGD (\d+).*SGD (\d+) delivery/);
  assert.ok(m);const [qty,cost,sold,price,clearance,delivery]=m.slice(1).map(Number);
  const revenue=sold*price+5*clearance;
  assert.equal(sold+5,qty);assert.equal(a.steps[0].answer,revenue);
  assert.equal(a.steps[1].answer,revenue-qty*cost-delivery);
  const side=Number(b.prompt.match(/have sides (\d+) cm/)[1]);
  assert.equal(b.steps[0].answer,side*side);
  assert.equal(b.steps[1].answer,3*side*side);
 }
});

test('Paper 2 notebook unit costs and composite volumes',()=>{
 for(let set=1;set<=2;set++){
  const q1=sandbox.window.HASetGenerator.make(1,2,set).questions[4];
  assert.equal(q1.topic,'Unit rates and combined cost');
  const m=q1.prompt.match(/sells (\d+) identical notebooks at SGD (\d+) each and (\d+) identical notebooks at SGD (\d+) each/);
  assert.ok(m);const [n1,p1,n2,p2]=m.slice(1).map(Number);
  const total=n1*p1+n2*p2;
  assert.equal(q1.steps[0].answer,total);
  assert.equal(q1.steps[1].answer,Math.round(total/(n1+n2)*100)/100);
  assert.equal(q1.steps[1].format.decimalPlaces,2);
 }
 const q2=sandbox.window.HASetGenerator.make(2,2,1).questions[8];
 assert.equal(q2.topic,'Composite solid volume');
 const m=q2.prompt.match(/base (\d+) cm by (\d+) cm and height (\d+) cm.*perpendicular height is (\d+) cm/);
 assert.ok(m);const [side,other,height,pyrHeight]=m.slice(1).map(Number);
 assert.equal(side,other);
 const pv=side*side*pyrHeight/3;
 assert.equal(q2.steps[0].answer,pv);
 assert.equal(q2.steps[1].answer,pv+side*side*height);
 assert.ok(!q2.prompt.includes('hemisphere'));
});

test('Paper 2 composite avoids previous exam-like cone hemisphere construction',()=>{
 const q=sandbox.window.HASetGenerator.make(2,2,1).questions[8];
 assert.equal(q.topic,'Composite solid volume');
 assert.match(q.prompt,/cuboid/);
 assert.match(q.prompt,/square pyramid/);
 assert.doesNotMatch(q.prompt,/hemisphere/i);
 assert.doesNotMatch(q.prompt,/cone of radius/i);
});
test('Paper 2 unit-cost application is not stop-inclusive average-speed template',()=>{
 for(const set of [1,2]){
  const q=sandbox.window.HASetGenerator.make(1,2,set).questions[4];
  assert.equal(q.topic,'Unit rates and combined cost');
  assert.doesNotMatch(q.prompt,/shuttle|van|rests|stop|km\/h/i);
 }
});

test('Independently audit generated ratio, discount and prism answers',()=>{
 for(const level of [1])for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){
  if(paper===1&&set===1)continue;
  const qs=sandbox.window.HASetGenerator.make(level,paper,set).questions;
  const ratio=qs.find(q=>q.topic==='Ratio');
  const rm=ratio.prompt.match(/ratio (\d+):(\d+)\. There are (\d+) amber/);assert.ok(rm);
  const [greenParts,amberParts,amber]=rm.slice(1).map(Number);
  assert.equal(ratio.steps[0].answer,amber/amberParts);
  assert.equal(ratio.steps[1].answer,greenParts*amber/amberParts);
  const pct=qs.find(q=>q.topic==='Percentage');
  const pm=pct.prompt.match(/costs \$(\d+) and has a (\d+)% discount/);assert.ok(pm);
  const price=Number(pm[1]),percent=Number(pm[2]);
  assert.equal(pct.steps[0].answer,Math.round(price*percent)/100);
  assert.equal(pct.steps[1].answer,Math.round(price*(100-percent))/100);
  const prism=qs.find(q=>q.topic==='Volume of prisms');
  const vm=prism.prompt.match(/base of (\d+) cm, perpendicular height (\d+) cm, and prism length (\d+) cm/);assert.ok(vm);
  const [base,height,length]=vm.slice(1).map(Number);
  assert.equal(prism.steps[0].answer,base*height/2);
  assert.equal(prism.steps[1].answer,base*height*length/2);
 }
});
test('Independently verify generated sequences and inequalities where present',()=>{
 for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){
  if(paper===1&&set===1)continue;
  const qs=sandbox.window.HASetGenerator.make(1,paper,set).questions;
  const seq=qs.find(q=>q.topic==='Number patterns');
  if(seq){
   const m=seq.prompt.match(/sequence begins (\d+), (\d+), (\d+)/);assert.ok(m);
   const first=Number(m[1]),difference=Number(m[2])-first;
   assert.equal(Number(m[3])-Number(m[2]),difference);
   assert.equal(seq.steps[1].answer,first+11*difference);
  }
 }
});

test('Generated percentage and rate accuracy instructions match numeric checker',()=>{
 for(const paper of [1,2])for(const set of [1,2,3]){
  if(paper===1&&set===1)continue;
  const qs=sandbox.window.HASetGenerator.make(1,paper,set).questions;
  const pct=qs.find(q=>q.topic==='Percentage');
  assert.ok(pct);
  assert.equal(pct.steps[0].format.decimalPlaces,2);
  assert.equal(pct.steps[1].format.decimalPlaces,2);
  assert.equal(HAMarking.evaluate('numeric',pct.steps[1].answer.toFixed(2),pct.steps[1].answer,pct.steps[1].format).correct,true);
  assert.equal(HAMarking.evaluate('numeric',String(pct.steps[1].answer),pct.steps[1].answer,pct.steps[1].format).correct, String(pct.steps[1].answer).split('.')[1]?.length===2);
  const rate=qs.find(q=>q.topic==='Average rate');
  if(rate){assert.match(rate.prompt,/2 decimal places/);assert.equal(rate.steps[1].format.decimalPlaces,2);}
 }
});

test('Paper 2 application explanations describe the actual mathematics',()=>{
 for(let set=1;set<=2;set++){
  const q=sandbox.window.HASetGenerator.make(1,2,set).questions[4];
  assert.equal(q.topic,'Unit rates and combined cost');
  assert.match(q.explanation,/total cost divided by total quantity/);
 }
 const solid=sandbox.window.HASetGenerator.make(2,2,1).questions[8];
 assert.match(solid.explanation,/pyramid and cuboid volumes separately/);
});

test('Independent Secondary 2 Pythagoras, similarity and trigonometry audit',()=>{
 for(let paper=1;paper<=2;paper++)for(let set=1;set<=3;set++){
  const q=sandbox.window.HASetGenerator.make(2,paper,set).questions;
  const py=q.find(x=>x.topic==='Pythagoras theorem');
  const pm=py.prompt.match(/shorter sides (\d+) cm and (\d+) cm/);assert.ok(pm);
  const x=Number(pm[1]),y=Number(pm[2]);
  assert.equal(py.steps[0].answer,x*x+y*y);
  assert.equal(py.steps[1].answer,Math.hypot(x,y));
  const tri=q.find(x=>x.topic==='Trigonometry');
  assert.ok(tri);const tm=tri.prompt.match(/opposite side is (\d+) cm/);assert.ok(tm);
  assert.equal(tri.steps[0].answer,0.5);
  assert.ok(Math.abs(tri.steps[1].answer-Number(tm[1])/Math.sin(Math.PI/6))<1e-10);
  const sim=q.find(x=>x.topic==='Similarity'||x.topic==='Similarity of areas');
  assert.ok(sim);
  if(sim.topic==='Similarity of areas'){
   const sm=sim.prompt.match(/sides (\d+) cm and (\d+) cm/);assert.ok(sm);
   const [a,b]=sm.slice(1).map(Number);
   assert.equal(sim.steps[0].answer,a*a);
   assert.equal(sim.steps[1].answer,b*b-a*a);
  }else{
   const sm=sim.prompt.match(/shapes are (\d+) cm and (\d+) cm.*is (\d+) cm/);assert.ok(sm);
   const [a,b,c]=sm.slice(1).map(Number);
   assert.equal(sim.steps[0].answer,b/a);
   assert.equal(sim.steps[1].answer,c*b/a);
  }
 }
});
