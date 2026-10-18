/* Teacher-only development diagnostics, separate from the 50-mark draft paper.
   Algebra: 2 marks for an equivalent expression.
   Graph: 2 marks for exactly the three required points, 1 for line mode.
   No hints before first attempt and no private examination material.
*/
(function(){
function byId(id){return document.getElementById(id)}
function setup(){
const alg=byId("algebra-check"),graph=byId("graph-check");if(!alg||!graph)return;
const aResult=byId("algebra-feedback"),gResult=byId("graph-feedback");
const aInput=byId("algebra-answer"),holder=byId("graph-lab");
let algebraAttempted=false,graphAttempted=false,firstAlgebra=null,firstGraph=null;
alg.onclick=function(){
 const submitted=aInput.value.trim();if(!submitted){aResult.textContent="Enter an expression first.";return}
 const checked=window.HAAlgebra?.check(submitted,"2x+6");
 if(!checked?.supported){aResult.textContent="Cannot assess: "+(checked?.reason||"Unsupported mathematical syntax")+". No marks recorded.";return}
 if(!algebraAttempted){firstAlgebra=checked.equivalent?2:0;algebraAttempted=true}
 aResult.textContent=(checked.equivalent?"Equivalent expression.":"Not equivalent. Expand the bracket and try again.")+" First independent attempt: "+firstAlgebra+"/2 marks.";
 aResult.dataset.checked=String(checked.equivalent);
};
graph.onclick=function(){
 const response=holder?.getGraphState?.();if(!response){gResult.textContent="Graph tool unavailable. No marks recorded.";return}
 const expected=new Set(["0,1","1,2","2,3"]),actual=response.points.map(p=>p.join(","));const unique=new Set(actual);
 const correctPoints=actual.length===3&&unique.size===3&&[...expected].every(p=>unique.has(p));
 const geometry=window.HAMarking?.evaluate('graph',response,{points:[[0,1],[1,2],[2,3]],mode:'line',line:{m:1,c:1}});const lineSelected=!!geometry?.parts?.[1],score=(correctPoints?2:0)+(lineSelected?1:0);
 if(!graphAttempted){firstGraph=score;graphAttempted=true}
 gResult.textContent=(correctPoints?"All three points correct (2/2).":"Incorrect or extra points (0/2).")+" "+(lineSelected?"Correct straight-line relationship (1/1).":"Straight-line relationship not verified (0/1).")+" Independent first attempt: "+firstGraph+"/3. Note: this checks selected line mode, not whether the rendered line extends correctly.";
};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup();
})();
