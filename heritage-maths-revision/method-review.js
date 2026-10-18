/* Development-only teacher-style method checklist and geometry practice.
   Self-review is separate from auto-scored independent answer marks. */
(function(){
 const key='ha-maths-method-review-v1';
 const get=()=>{try{return JSON.parse(localStorage.getItem(key)||'{}')}catch{return {}}};
 const put=x=>{try{localStorage.setItem(key,JSON.stringify(x))}catch{}};
 window.HAMethodReview={
  mount(question,root){
   if(!question||!root)return;
   const store=get(), entry=store[question.id]||{working:'',checks:[]};
   const box=document.createElement('section');box.className='method-review';
   const heading=document.createElement('h3');heading.textContent='Show your mathematical working';box.append(heading);
   const disclaimer=document.createElement('p');disclaimer.className='muted';disclaimer.textContent='Written method is not auto-marked. Compare it with the worked solution and tick the steps you demonstrated; a teacher must confirm formal method marks.';box.append(disclaimer);
   const area=document.createElement('textarea');area.rows=4;area.placeholder='Write equations, units and intermediate steps here…';area.value=entry.working||'';area.setAttribute('aria-label','Mathematical working');box.append(area);
   const label=document.createElement('h4');label.textContent='Self-review checklist (not examination marks)';box.append(label);
   const checklist=document.createElement('div');checklist.className='method-checklist';
   (question.solution||[]).forEach((step,i)=>{
     const line=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=!!entry.checks[i];check.addEventListener('change',save);
     const description=document.createElement('span');description.textContent='I showed an appropriate step for part '+String.fromCharCode(97+i)+' and included correct units where needed.';
     line.append(check,description);checklist.append(line);
   });box.append(checklist);
   function save(){store[question.id]={working:area.value,checks:Array.from(checklist.querySelectorAll('input')).map(c=>c.checked)};put(store)}
   area.addEventListener('input',save);
   root.append(box);
  },
  practice(root){
   if(!root)return;
   const section=document.createElement('section');section.className='lab';
   section.innerHTML='<h2>Additional geometry practice (unscored)</h2><p>These original learning activities do not form part of the 50-mark reference paper.</p><h3>Line graph</h3><p>Use the graph above to plot points for <strong>y = x + 1</strong> at x = -1, 0 and 1. Explain why your points form a straight line.</p><textarea id="graph-method" rows="3" placeholder="Explain the gradient and y-intercept."></textarea><h3>Ruler-and-compass construction</h3><p>On paper, draw a line segment AB of 7 cm. Construct its perpendicular bisector using a compass and straightedge. Label the intersection M.</p><details><summary>View construction checklist (self-assessment)</summary><ol><li>Draw AB = 7 cm using a ruler.</li><li>Set compass radius greater than half of AB.</li><li>Draw intersecting arcs above and below AB from A and B, using the same radius.</li><li>Join the two arc intersections with a straightedge.</li><li>Check AM = MB = 3.5 cm and that the new line meets AB at 90°.</li></ol><p>Compare your physical construction against the conditions. A teacher should confirm accuracy; no digital construction marks are awarded.</p></details>';
   root.append(section);
  }
 };
})();
