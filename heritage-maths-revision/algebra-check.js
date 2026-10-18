/* No eval or Function: polynomial input limited to degree <= 2 with integer coefficients. */
(function(){
function parse(raw){
 let s=raw.replace(/\s/g,'').replace(/\\left|\\right/g,'').replace(/\\cdot|\\times/g,'*').replace(/\{|\}/g,'').replace(/−/g,'-');
 if(!s || !/^[0-9xX+\-*^().]+$/.test(s))throw Error('Use numbers, x, +, -, *, parentheses and powers up to 2.');
 s=s.replace(/X/g,'x').replace(/(\d)(x|\()/g,'$1*$2').replace(/x\(/g,'x*(').replace(/\)(x|\d|\()/g,')*$1');
 const t=s.match(/\d+(?:\.\d+)?|x|[()+\-*^]/g);if(!t||t.join('')!==s)throw Error('Invalid expression.');
 let i=0;const add=(a,b)=>a.map((v,j)=>v+b[j]),neg=a=>a.map(v=>-v),mul=(a,b)=>{const c=[0,0,0];a.forEach((u,j)=>b.forEach((v,k)=>{if(j+k>2&&Math.abs(u*v)>1e-10)throw Error('Only expressions up to x² supported.');if(j+k<=2)c[j+k]+=u*v}));return c};
 function atom(){if(t[i]==='-'){i++;return neg(atom())}if(t[i]==='+'){i++;return atom()}if(t[i]==='('){i++;let a=sum();if(t[i++]!==')')throw Error('Missing closing bracket.');return a}const x=t[i++];if(x==='x')return[0,1,0];if(x&&/^\d/.test(x))return[Number(x),0,0];throw Error('Expected number, x or bracket.')}
 function power(){let a=atom();if(t[i]==='^'){i++;const exp=t[i++];if(!['0','1','2'].includes(exp))throw Error('Only powers 0, 1 and 2 supported.');if(exp==='0')a=[1,0,0];if(exp==='2')a=mul(a,a)}return a}
 function term(){let a=power();while(t[i]==='*'){i++;a=mul(a,power())}return a}
 function sum(){let a=term();while(t[i]==='+'||t[i]==='-'){let op=t[i++],b=term();a=add(a,op==='+'?b:neg(b))}return a}
 const result=sum();if(i!==t.length)throw Error('Unexpected operator.');return result;
}
function check(user,expected){try{const a=parse(user),b=parse(expected);return {supported:true,equivalent:a.every((v,i)=>Math.abs(v-b[i])<1e-8)}}catch(e){return {supported:false,equivalent:false,reason:e.message}}}
window.HAAlgebra={parse,check};
})();
