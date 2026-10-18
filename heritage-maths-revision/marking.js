/* Integrated assessment contracts. No confidential SA2 content.
   Browser-only deterministic marking; every attempted part is scored once independently.
*/
(function(){
 const num=(value,target,options={})=>{
  const raw=String(value).trim();
  if(!raw||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?$/.test(raw))return {supported:false,reason:"Enter a numeric answer."};
  const expected=Number(target),got=Number(raw);
  const tol=Number.isFinite(options.tolerance)?options.tolerance:1e-8;
  const correct=Math.abs(got-expected)<=tol;
  const places=options.decimalPlaces;
  if(correct&&Number.isInteger(places)&&places>=0){
   const fractional=raw.includes('.')?raw.split('.')[1].length:0;
   if(fractional!==places)return {supported:true,correct:false,reason:"Your value is correct, but write the answer to "+places+" decimal place(s)."};
  }
  const figures=options.significantFigures;
  if(correct&&Number.isInteger(figures)&&figures>0){
   const mantissa=raw.replace(/^[-+]/,'').split(/[eE]/)[0];
   const digits=mantissa.replace('.','').replace(/^0+/,'');
   const ambiguous=!mantissa.includes('.')&&/0$/.test(mantissa);
   const canonical=Number(expected.toPrecision(figures));
   if(Math.abs(got-canonical)>tol || digits.length<figures || (!ambiguous&&digits.length!==figures))
    return {supported:true,correct:false,reason:"Write the answer to "+figures+" significant figure(s)."};
   if(ambiguous&&digits.length>figures)
    return {supported:true,correct:true,message:"Trailing zeroes in a whole number are ambiguous; scientific notation shows significant figures clearly."};

  }
  return {supported:true,correct};
 };
 const algebra=(value,expected)=>{const r=window.HAAlgebra?.check(value,expected);return r?.supported?{supported:true,correct:r.equivalent}:{supported:false,reason:r?.reason||"Algebra checking is unavailable."}};
 const graph=(value,expected)=>{
  if(!value||!Array.isArray(value.points))return{supported:false,reason:"Graph response unavailable."};
  const pts=value.points;
  if(pts.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>!Number.isFinite(n))))return{supported:false,reason:"Invalid point."};
  const required=expected.points||[];
  const tolerance=Number.isFinite(expected.tolerance)?expected.tolerance:0.001;
  const equal=(a,b)=>Math.abs(a[0]-b[0])<=tolerance&&Math.abs(a[1]-b[1])<=tolerance;
  const unique=pts.every((p,i)=>pts.findIndex(t=>equal(p,t))===i);
  const pointsCorrect=unique&&pts.length===required.length&&required.every(e=>pts.some(p=>equal(p,e)));
  const modeCorrect=value.mode===expected.mode;
  let geometryCorrect=false;
  if(expected.mode==="line"&&pts.length>=2&&modeCorrect){
    const sorted=[...pts].sort((a,b)=>a[0]-b[0]);
    const [p0,p1]=[sorted[0],sorted[sorted.length-1]];
    const dx=p1[0]-p0[0],dy=p1[1]-p0[1];
    geometryCorrect=Math.hypot(dx,dy)>0&&pts.every(p=>Math.abs(dx*(p[1]-p0[1])-dy*(p[0]-p0[0]))<=tolerance*Math.max(1,Math.hypot(dx,dy)));
    if(expected.line){const {m,c}=expected.line;geometryCorrect=geometryCorrect&&pts.every(p=>Math.abs(p[1]-(m*p[0]+c))<=tolerance)}
  }
  const parts=[pointsCorrect,modeCorrect&&geometryCorrect];
  return{supported:true,correct:parts.every(Boolean),parts,message:"Coordinates and collinearity checked. Line extension, curve smoothness and construction accuracy not assessed."};
 };
 const evaluate=(type,value,expected,options={})=>type==="numeric"?num(value,expected,options):type==="algebra"?algebra(value,expected):type==="graph"?graph(value,expected):{supported:false,reason:"Unsupported question type."};
 window.HAMarking={evaluate};
})();
