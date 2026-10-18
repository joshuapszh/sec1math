/* Integrated assessment contracts. No confidential SA2 content.
   Browser-only deterministic marking; every attempted part is scored once independently.
*/
(function(){
 const num=(value,target,tolerance=1e-8)=>{const s=String(value).trim();if(!s||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return {supported:false,reason:"Enter a numeric answer."};return{supported:true,correct:Math.abs(Number(s)-target)<=tolerance}};
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
 const evaluate=(type,value,expected)=>type==="numeric"?num(value,expected):type==="algebra"?algebra(value,expected):type==="graph"?graph(value,expected):{supported:false,reason:"Unsupported question type."};
 window.HAMarking={evaluate};
})();
