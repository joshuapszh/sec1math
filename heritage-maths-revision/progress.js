/* Versioned development progress. Unknown or conflicting records are quarantined,
   not silently imported into the active score. */
(function(){
 const KEY='ha-maths-dev-progress-v2';
 const VERSION=2;
 function load(questions,key=KEY){
   const known=new Map(questions.map(q=>[q.id,q]));
   let blob;try{blob=JSON.parse(localStorage.getItem(key)||'null')}catch{return {records:{},quarantined:[],notice:'Saved data was unreadable.'}}
   if(!blob)return {records:{},quarantined:[],notice:''};
   if(blob.version!==VERSION||!blob.records||typeof blob.records!=='object')return {records:{},quarantined:[blob],notice:'Incompatible backup kept aside.'};
   const records={},quarantined=[...(Array.isArray(blob.quarantined)?blob.quarantined:[])];
   for(const [id,r] of Object.entries(blob.records)){
     const q=known.get(id),signature=q&&[q.prompt,JSON.stringify(q.steps),JSON.stringify(q.stepMarks)].join('|');
     if(!q||r.signature!==signature||!Array.isArray(r.answers)||!Array.isArray(r.firstScore)){quarantined.push({id,record:r});continue}
     records[id]=r;
   }
   return {records,quarantined,notice:quarantined.length?'Some mismatched question progress was kept aside.':''};
 }
 function save(questions,records,quarantined=[],key=KEY){
   const byId=new Map(questions.map(q=>[q.id,q]));const packed={};
   for(const [id,r] of Object.entries(records)){const q=byId.get(id);if(!q)continue;packed[id]={...r,signature:[q.prompt,JSON.stringify(q.steps),JSON.stringify(q.stepMarks)].join('|')}}
   localStorage.setItem(key,JSON.stringify({version:VERSION,records:packed,quarantined,savedAt:new Date().toISOString()}));
 }
 window.HAProgress={load,save,key:KEY};
})();
