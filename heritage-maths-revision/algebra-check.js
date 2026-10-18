/* Restricted algebra evaluator: polynomial degree <=2. No eval().
   Supports a subset of LaTeX used by the visual toolbar. */
(function(){
function normalize(input){
 let s=String(input).replace(/\s/g,'').replace(/−/g,'-').replace(/\\left|\\right/g,'').replace(/\\cdot|\\times/g,'*');
 // Process innermost constant LaTeX fractions and square roots.
 for(let pass=0;pass<8;pass++){
   const before=s;
   s=s.replace(/\\frac\{(-?(?:\d+(?:\.\d+)?))\}\{(-?(?:\d+(?:\.\d+)?))\}/g,(_,a,b)=>{if(Number(b)===0)throw Error('Division by zero.');return '('+(Number(a)/Number(b))+')'});
   s=s.replace(/\\sqrt\{(\d+(?:\.\d+)?)\}/g,(_,a)=>'('+Math.sqrt(Number(a))+')');
   if(s===before)break;
 }
 s=s.replace(/\^\{([012])\}/g,'^$1').replace(/[{}]/g,m=>{throw Error('Unsupported LaTeX group '+m+'.')});
 if(s.includes('\\'))throw Error('Unsupported LaTeX. Use powers, numeric fractions or numeric square roots.');
 if(!/^[0-9.xX()+\-*^]+$/.test(s))throw Error('Unsupported expression characters.');
 s=s.replace(/X/g,'x').replace(/(\d|\))(?=x|\()/g,'$1*').replace(/x(?=\()/g,'x*').replace(/\)(?=\d)/g,')*');
 return s;
}
function parse(raw){
 const s=normalize(raw),tokens=s.match(/\d+(?:\.\d+)?|\.\d+|x|[()+\-*^]/g);
 if(!tokens||tokens.join('')!==s)throw Error('Malformed algebraic expression.');
 let i=0;
 const add=(a,b)=>a.map((v,j)=>v+b[j]),neg=a=>a.map(v=>-v);
 function multiply(a,b){const out=[0,0,0];a.forEach((v,j)=>b.forEach((w,k)=>{if(j+k>2&&Math.abs(v*w)>1e-9)throw Error('Degree above 2 is unsupported.');if(j+k<=2)out[j+k]+=v*w}));return out}
 function primary(){if(tokens[i]==='('){i++;const a=sum();if(tokens[i++]!==')')throw Error('Missing closing bracket.');return a}const t=tokens[i++];if(t==='x')return[0,1,0];if(t&&/^(?:\d|\.)/.test(t))return[Number(t),0,0];throw Error('Expected a term.')}
 function power(){let a=primary();if(tokens[i]==='^'){i++;const exp=tokens[i++];if(!['0','1','2'].includes(exp))throw Error('Only powers 0, 1, 2 supported.');if(exp==='0')a=[1,0,0];if(exp==='2')a=multiply(a,a)}return a}
 function signed(){if(tokens[i]==='+'){i++;return signed()}if(tokens[i]==='-'){i++;return neg(signed())}return power()}
 function product(){let a=signed();while(tokens[i]==='*'){i++;a=multiply(a,signed())}return a}
 function sum(){let a=product();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],b=product();a=add(a,op==='+'?b:neg(b))}return a}
 const a=sum();if(i!==tokens.length)throw Error('Unexpected operator.');if(a.some(x=>!Number.isFinite(x)))throw Error('Non-finite expression.');return a;
}
function check(input,expected){try{const a=parse(input),b=parse(expected);return{supported:true,equivalent:a.every((v,i)=>Math.abs(v-b[i])<1e-8)}}catch(e){return{supported:false,equivalent:false,reason:e.message}}}
window.HAAlgebra={parse,check,normalize};
})();
