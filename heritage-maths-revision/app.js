/* Heritage Academy Mathematics Portal - DEVELOPMENT ONLY.
   No confidential examination question or marking scheme data is embedded here. */
const $ = id => document.getElementById(id);
/* Earlier V1 records are not silently merged into changed question content. */
let selected={level:1,paper:1,set:1},bank=[],index=0,state={},quarantined=[],started=Date.now(),timerPaused=false,elapsed=0;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const typeset=()=>window.MathJax?.typesetPromise?.().catch(()=>{});
function persist(){try{window.HAProgress.save(bank,state,quarantined,storeKey())}catch(e){console.warn('Local save unavailable',e)}}
const storeKey=()=>selected.level===1&&selected.paper===1&&selected.set===1?window.HAProgress.key:'ha-maths-draft-'+selected.level+'-'+selected.paper+'-'+selected.set;
const record=id=>state[id]??(state[id]={answers:['',''],attempts:[0,0],firstScore:[null,null],hints:0,revealed:false,flag:false,completed:false});
function marks(q,r){return r.firstScore.reduce((s,n)=>s+(n||0),0)}
function draw(){
const q=bank[index],r=record(q.id),total=bank.reduce((s,x)=>s+marks(x,record(x.id)),0);
$('level').value='Secondary '+selected.level;$('paper').value='Paper '+selected.paper;$('set').value='Set '+selected.set;
document.querySelector('.workspace').innerHTML=
'<aside><h2>Questions</h2><p class="muted">First-attempt score: '+total+' / 50</p><div class="navitems">'+bank.map((b,i)=>{const x=record(b.id);return '<button class="'+(i===index?'selected ':'')+(x.completed?'done':'')+'" data-jump="'+i+'">Q'+(i+1)+' '+(x.flag?'⚑ ':'')+(x.completed?'✓':'')+'</button>'}).join('')+'</div><p class="muted">Draft content for teacher verification. Not a live student set.</p><button id="report" class="secondary">Download CSV</button></aside>'+
'<article><small class="muted">Secondary '+selected.level+' · Paper '+selected.paper+' · Set '+selected.set+' · '+escapeHTML(q.book)+' · '+escapeHTML(q.difficulty)+'</small><h2>Question '+(index+1)+' <small>('+q.marks+' marks)</small></h2><p class="muted">'+escapeHTML(q.topic)+'</p><p>'+escapeHTML(q.prompt)+'</p><div id="question-diagram"></div>'+
q.steps.map((st,i)=>'<label>'+escapeHTML(st.label)+' · '+q.stepMarks[i]+' marks<input '+(st.type==='algebra'?'data-math-expression ':'')+'data-answer="'+i+'" type="text" inputmode="decimal" autocomplete="off" value="'+escapeHTML(r.answers[i])+'" placeholder="Enter your answer"></label><div class="feedback" id="result'+i+'" aria-live="polite"></div>').join('')+
'<div class="buttons"><button id="check">Check answers</button><button id="hint" class="secondary">Get a hint</button><button id="solution" class="secondary">Show worked solution</button><button id="flag" class="secondary">'+(r.flag?'Unflag':'Flag for review')+'</button></div><div id="details" class="details" '+(!r.revealed?'hidden':'')+'>'+(r.revealed?solutionHTML(q):'')+'</div><div class="buttons"><button id="prev" class="secondary" '+(index===0?'disabled':'')+'>Previous</button><button id="next" '+(index===bank.length-1?'disabled':'')+'>Next question</button></div><p class="muted">Your first attempt earns independent marks; later retries support learning but do not change your first-attempt score.</p></article>';
document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{index=+b.dataset.jump;draw()});
document.querySelectorAll('[data-answer]').forEach(input=>input.oninput=()=>{r.answers[+input.dataset.answer]=input.value;persist()});window.HAMathInput?.enhance(document.querySelector('.workspace'));
$('check').onclick=()=>{for(let i=0;i<2;i++){const raw=r.answers[i].trim(),box=$('result'+i);if(!raw){box.textContent='Enter your answer first.';continue}const assessed=window.HAMarking?.evaluate(q.steps[i].type||'numeric',raw,q.steps[i].answer,q.steps[i].format||{});if(!assessed?.supported){box.textContent=assessed?.reason||'Unable to assess';continue}const correct=assessed.correct;const first=r.attempts[i]===0;if(first)r.firstScore[i]=(correct && r.hints===0 && !r.revealed)?q.stepMarks[i]:0;r.attempts[i]++;box.textContent=correct?(first && r.hints===0 && !r.revealed?'Correct, independently.':'Correct after practice.'):(assessed.reason||'Not correct yet. Review your method and retry.')}r.completed=r.attempts.every(n=>n>0);persist();drawResults(q,r)};
$('hint').onclick=()=>{r.hints++;$('details').hidden=false;$('details').textContent=q.hints[Math.min(r.hints-1,q.hints.length-1)];persist()};
$('solution').onclick=()=>{r.revealed=true;$('details').hidden=false;$('details').innerHTML=solutionHTML(q);typeset();persist()};
$('flag').onclick=()=>{r.flag=!r.flag;persist();draw()};
$('prev').onclick=()=>{index--;draw()};
$('next').onclick=()=>{index++;draw()};
$('report').onclick=downloadCSV;
window.HADiagrams?.render(document.getElementById('question-diagram'),q.diagram);window.HAMethodReview?.mount(q,document.querySelector('.workspace article'));
typeset();
}
function drawResults(q,r){for(let i=0;i<2;i++){const raw=r.answers[i].trim();if(!raw)continue;const result=window.HAMarking?.evaluate(q.steps[i].type||'numeric',raw,q.steps[i].answer,q.steps[i].format||{});const correct=result?.supported&&result.correct;$('result'+i).textContent=correct?'Correct.':'Not correct. Retry or use a hint.'}document.querySelector('aside .muted').textContent='First-attempt score: '+bank.reduce((s,x)=>s+marks(x,record(x.id)),0)+' / 50';persist()}
function solutionHTML(q){return '<strong>Model working</strong><ol>'+q.solution.map(step=>'<li>'+escapeHTML(step)+'</li>').join('')+'</ol><p><strong>Check your reasoning:</strong> '+escapeHTML(q.explanation||'Compare each step with your own written working.')+'</p>'+(q.commonMistakes?.length?'<p><strong>Common mistake:</strong> '+q.commonMistakes.map(escapeHTML).join(' ')+'</p>':'')+'<p class="muted">These are model answers for learning, not automatic method-mark certification.</p>'}
function downloadCSV(){const csv=[['Question','Topic','Book','Difficulty','Marks','Independent Marks','Part A Entry','Part B Entry','Hints','Revealed','Flagged'],...bank.map(q=>{const r=record(q.id);return [q.id,q.topic,q.book,q.difficulty,q.marks,marks(q,r),...r.answers,r.hints,r.revealed,r.flag]})].map(a=>a.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const link=document.createElement('a'),url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));link.href=url;link.download='heritage-maths-dev-s'+selected.level+'p'+selected.paper+'set'+selected.set+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function init(){
 const workspace=document.querySelector('.workspace');
 const selectedValue=(id)=>Number($(id).value.match(/\d+/)?.[0]||1);
 async function loadSelected(){
  selected={level:selectedValue('level'),paper:selectedValue('paper'),set:selectedValue('set')};
  workspace.innerHTML='<article>Loading draft revision practice…</article>';
  try{
   let data;
   if(selected.level===1&&selected.paper===1&&selected.set===1){
    const response=await fetch('./data/s1-p1-set1-draft.json',{cache:'no-store'});
    if(!response.ok)throw Error('HTTP '+response.status);
    data=await response.json();
   }else data=window.HASetGenerator.make(selected.level,selected.paper,selected.set);
   bank=data.questions;
   if(bank.length!==10||bank.reduce((sum,q)=>sum+q.marks,0)!==50)throw Error('Set blueprint failed validation');
   if(bank.filter(q=>q.book===selected.level+'A').reduce((sum,q)=>sum+q.marks,0)!==10)throw Error('Semester weighting failed');
   index=0;
   const saved=window.HAProgress.load(bank,storeKey());state=saved.records;quarantined=saved.quarantined;
   if(saved.notice)console.warn(saved.notice);
   draw();
  }catch(e){workspace.innerHTML='<article><h2>Unable to load set</h2><p>'+escapeHTML(e.message)+'</p></article>'}
 }
 for(const id of ['level','paper','set'])$(id).addEventListener('change',loadSelected);
 await loadSelected();
}
init();

window.addEventListener('DOMContentLoaded',()=>{window.HAMathInput?.enhance();const g=document.getElementById('graph-lab');if(g)window.HAGraph?.init(g);window.HAMethodReview?.practice(document.querySelector('main'))});

/* Developer question diagnostics are implemented in diagnostics.js. */
