/* Integrated assessment contracts. No confidential SA2 content.
   Browser-only deterministic marking; every attempted part is scored once independently.
*/
(function(){
 const num=(value,target,tolerance=1e-8)=>{const s=String(value).trim();if(!s||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return {supported:false,reason:"Enter a numeric answer."};return{supported:true,correct:Math.abs(Number(s)-target)<=tolerance}};
 const algebra=(value,expected)=>{const r=window.HAAlgebra?.check(value,expected);return r?.supported?{supported:true,correct:r.equivalent}:{supported:false,reason:r?.reason||"Algebra checking is unavailable."}};
 const graph=(value,expected)=>{
  if(!value||!Array.isArray(value.points))return{supported:false,reason:"Graph response unavailable."};
  const actual=value.points.map(p=>p.join(",")),unique=new Set(actual),required=expected.points.map(p=>p.join(","));
  const points=actual.length===required.length&&unique.size===required.length&&required.every(p=>unique.has(p));
  const line=value.mode===expected.mode;
  return{supported:true,correct:points&&line,parts:[points,line],message:"Point positions and connection mode are checked. This does not validate extended lines or smoothness."};
 };
 const evaluate=(type,value,expected)=>type==="numeric"?num(value,expected):type==="algebra"?algebra(value,expected):type==="graph"?graph(value,expected):{supported:false,reason:"Unsupported question type."};
 window.HAMarking={evaluate};
})();
