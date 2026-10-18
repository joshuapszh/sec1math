/* Development-only example. No confidential SA2 material. */
const $=id=>document.getElementById(id);
const typeset=()=>{if(window.MathJax?.typesetPromise)window.MathJax.typesetPromise().catch(()=>{});};
let hints=0,tries=0,shown=false;
$('check').addEventListener('click',()=>{const s=$('answer').value.trim();if(!s){$('feedback').textContent='Enter an answer first.';return;}tries++;const correct=Number.isFinite(Number(s))&&Number(s)===9;$('feedback').textContent=correct?(tries===1&&hints===0&&!shown?'Correct on your first unaided attempt.':'Correct after practice.'):'Not yet correct. Check your working or request a hint.';});
$('hint').addEventListener('click',()=>{hints++;const hintsText=['First, divide both sides of the equation by 5.','Next, isolate x by adding 3 to both sides.'];$('details').hidden=false;$('details').textContent=hintsText[Math.min(hints-1,1)];});
$('solution').addEventListener('click',()=>{shown=true;$('details').hidden=false;$('details').innerHTML='<strong>Formal working</strong><div>\\[5(x-3)=30\\]</div><div>\\[x-3=6\\]</div><div>\\[x=9\\]</div><p>Explanation: Divide by 5, then add 3. Common mistake: forgetting to add 3 after dividing.</p>';typeset();});
