/* Heritage Academy Mathematics Portal - DEVELOPMENT ONLY.
   No confidential examination question or marking scheme data is embedded here. */
const $ = id => document.getElementById(id);
const STORE='ha-maths-dev-s1p1set1-v1';
let bank=[],index=0,state={},started=Date.now(),timerPaused=false,elapsed=0;
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const typeset=()=>window.MathJax?.typesetPromise?.().catch(()=>{});
function persist(){try{localStorage.setItem(STORE,JSON.stringify(state))}catch(e){console.warn('Local save unavailable',e)}}
function loadState(){try{return JSON.parse(localStorage.getItem(STORE))||{}}catch{return {}}}
const record=id=>state[id]??(state[id]={answers:['',''],attempts:[0,0],firstScore:[null,null],hints:0,revealed:false,flag:false,completed:false});
function marks(q,r){return r.firstScore.reduce((s,n)=>s+(n||0),0)}
function draw(){
const q=bank[index],r=record(q.id),total=bank.reduce((s,x)=>s+marks(x,record(x.id)),0);
$('level').value='Secondary 1';$('paper').value='Paper 1';$('set').value='Set 1';
document.querySelector('.workspace').innerHTML=
'<aside><h2>Questions</h2><p class="muted">First-attempt score: '+total+' / 50</p><div class="navitems">'+bank.map((b,i)=>{const x=record(b.id);return '<button class="'+(i===index?'selected ':'')+(x.completed?'done':'')+'" data-jump="'+i+'">Q'+(i+1)+' '+(x.flag?'⚑ ':'')+(x.completed?'✓':'')+'</button>'}).join('')+'</div><p class="muted">Draft content for teacher verification. Not a live student set.</p><button id="report" class="secondary">Download CSV</button></aside>'+
'<article><small class="muted">Secondary 1 · Paper 1 · Set 1 · '+escapeHTML(q.book)+' · '+escapeHTML(q.difficulty)+'</small><h2>Question '+(index+1)+' <small>('+q.marks+' marks)</small></h2><p class="muted">'+escapeHTML(q.topic)+'</p><p>'+escapeHTML(q.prompt)+'</p>'+
q.steps.map((st,i)=>'<label>'+escapeHTML(st.label)+' · '+q.stepMarks[i]+' marks<input data-answer="'+i+'" type="text" inputmode="decimal" autocomplete="off" value="'+escapeHTML(r.answers[i])+'" placeholder="Enter numerical answer"></label><div class="feedback" id="result'+i+'" aria-live="polite"></div>').join('')+
'<div class="buttons"><button id="check">Check answers</button><button id="hint" class="secondary">Get a hint</button><button id="solution" class="secondary">Show worked solution</button><button id="flag" class="secondary">'+(r.flag?'Unflag':'Flag for review')+'</button></div><div id="details" class="details" '+(!r.revealed?'hidden':'')+'>'+(r.revealed?solutionHTML(q):'')+'</div><div class="buttons"><button id="prev" class="secondary" '+(index===0?'disabled':'')+'>Previous</button><button id="next" '+(index===bank.length-1?'disabled':'')+'>Next question</button></div><p class="muted">Your first attempt earns independent marks; later retries support learning but do not change your first-attempt score.</p></article>';
document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{index=+b.dataset.jump;draw()});
document.querySelectorAll('[data-answer]').forEach(input=>input.oninput=()=>{r.answers[+input.dataset.answer]=input.value;persist()});
$('check').onclick=()=>{for(let i=0;i<2;i++){const raw=r.answers[i].trim(),box=$('result'+i);if(!raw){box.textContent='Enter your answer first.';continue}const correct=Number.isFinite(Number(raw)) && Math.abs(Number(raw)-q.steps[i].answer)<1e-8;const first=r.attempts[i]===0;if(first)r.firstScore[i]=(correct && r.hints===0 && !r.revealed)?q.stepMarks[i]:0;r.attempts[i]++;box.textContent=correct?(first && r.hints===0 && !r.revealed?'Correct, independently.':'Correct after practice.'):'Not correct yet. Review your method and retry.'}r.completed=r.attempts.every(n=>n>0);persist();drawResults(q,r)};
$('hint').onclick=()=>{r.hints++;$('details').hidden=false;$('details').textContent=q.hints[Math.min(r.hints-1,q.hints.length-1)];persist()};
$('solution').onclick=()=>{r.revealed=true;$('details').hidden=false;$('details').innerHTML=solutionHTML(q);typeset();persist()};
$('flag').onclick=()=>{r.flag=!r.flag;persist();draw()};
$('prev').onclick=()=>{index--;draw()};
$('next').onclick=()=>{index++;draw()};
$('report').onclick=downloadCSV;
typeset();
}
function drawResults(q,r){for(let i=0;i<2;i++){const raw=r.answers[i].trim();if(!raw)continue;const correct=Number.isFinite(Number(raw))&&Math.abs(Number(raw)-q.steps[i].answer)<1e-8;$('result'+i).textContent=correct?'Correct.':'Not correct. Retry or use a hint.'}document.querySelector('aside .muted').textContent='First-attempt score: '+bank.reduce((s,x)=>s+marks(x,record(x.id)),0)+' / 50';persist()}
function solutionHTML(q){return '<strong>Model working</strong><ol>'+q.solution.map(s=>'<li>'+escapeHTML(s)+'</li>').join('')+'</ol><p>Compare each step with your own written working.</p>'}
function downloadCSV(){const csv=[['Question','Topic','Book','Difficulty','Marks','Independent Marks','Part A Entry','Part B Entry','Hints','Revealed','Flagged'],...bank.map(q=>{const r=record(q.id);return [q.id,q.topic,q.book,q.difficulty,q.marks,marks(q,r),...r.answers,r.hints,r.revealed,r.flag]})].map(a=>a.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');const link=document.createElement('a'),url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));link.href=url;link.download='heritage-maths-dev-s1p1-set1.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function init(){const workspace=document.querySelector('.workspace');workspace.innerHTML='<article>Loading development reference set…</article>';for(const id of ['level','paper','set']){$(id).disabled=true}
try{const res=await fetch('./data/s1-p1-set1-draft.json',{cache:'no-store'});if(!res.ok)throw Error('HTTP '+res.status);const data=await res.json();bank=data.questions;if(bank.length!==10||bank.reduce((s,q)=>s+q.marks,0)!==50)throw Error('Question bank fails count/marks validation');state=loadState();draw()}catch(e){workspace.innerHTML='<article><h2>Unable to load draft questions</h2><p>'+escapeHTML(e.message)+'</p><p>Run through a local web server, not file://.</p></article>'}}
init();
