/* Original parametric practice drafts, not exam material or teacher-approved. */
(function(){
function make(level,paper,set){
 const n=level*100+paper*17+set*11,a=n%6+4,b=n%5+3,c=n%4+2,bookA=level+'A',bookB=level+'B';
 function add(i,book,difficulty,topic,prompt,one,two,work1,work2,algebra){
 return {id:'S'+level+'P'+paper+'S'+set+'-Q'+String(i).padStart(2,'0'),level:'Secondary '+level,paper,set,book,difficulty,topic,prompt,marks:5,stepMarks:[2,3],steps:[{label:'Part (a)',type:algebra?'algebra':'numeric',answer:one},{label:'Part (b)',type:'numeric',answer:two}],solution:[work1,work2],hints:['Identify the relevant relationship or formula.','Work out part (a) first.','Use the result in part (b) and check your units.'],commonMistakes:['Check each arithmetic operation.'],explanation:'Compare your working with the model solution.',teacherReviewStatus:'UNVERIFIED',source:'original generated draft'};
 }
 const r2=v=>Math.round(v*100)/100;
 let q=[];
 if(level===1){
 const total=12*a*b,price=20*a,discount=b+6,area=(a+12)*(b+8),sq=c+2;
 const list=[a,a+2,a+4,b+8,b+10,b+12,c+11],ordered=[...list].sort((x,y)=>x-y),sum=list.reduce((s,x)=>s+x,0);
 const cost=a+2,count=10*b,revenue=(count-10)*(cost+3)+10*(cost-1);
 q=[
 add(1,bookA,'basic','Arithmetic','A production unit packs '+total+' labels evenly in '+a+' boxes. Find (a) labels in one box and (b) labels in '+c+' boxes.',total/a,total/a*c,total+' ÷ '+a+' = '+total/a,total/a+' × '+c+' = '+total/a*c),
 add(2,bookA,'basic','Linear equations','The perimeter of a rectangle of width '+b+' cm is '+2*(a+b+10)+' cm. Find (a) its length and (b) the value of x if the length equals x + '+c+'.',a+10,a+10-c,'Length = half perimeter minus width = '+(a+10),'x = '+(a+10)+' − '+c+' = '+(a+10-c)),
 add(3,bookB,'basic','Ratio','Purple and amber tiles are in the ratio '+c+':8. There are '+8*b+' amber tiles. Find (a) one ratio part and (b) purple tiles.',b,b*c,'One part = '+8*b+' ÷ 8 = '+b,'Purple = '+c+' × '+b+' = '+b*c),
 add(4,bookB,'basic','Percentage','A gallery pass costs $'+price+' and has a '+discount+'% discount. Find (a) the discount and (b) the final price.',r2(price*discount/100),r2(price*(100-discount)/100),'Discount = '+discount+'% of '+price+' = '+r2(price*discount/100),'Final price = '+price+' − '+r2(price*discount/100)+' = '+r2(price*(100-discount)/100)),
 add(5,bookB,'basic','Average rate','A device transfers '+9*a+' litres in 3 minutes and '+4*b+' litres in 2 more minutes. Find (a) total volume and (b) average litres per minute.',9*a+4*b,r2((9*a+4*b)/5),'Total = '+9*a+' + '+4*b+' = '+(9*a+4*b),'Rate = '+(9*a+4*b)+' ÷ 5 = '+r2((9*a+4*b)/5)),
 add(6,bookB,'moderate','Number patterns','A sequence begins '+(a+5)+', '+(a+b+5)+', '+(a+2*b+5)+'. Find (a) the nth-term expression (use x as position) and (b) the 12th term.',b+'x+'+(a+5-b),a+5+11*b,'nth term = '+(a+5)+' + '+b+'(n−1) = '+b+'n+'+(a+5-b),'Term 12 = '+(a+5)+' + 11 × '+b+' = '+(a+5+11*b),true),
 add(7,bookB,'moderate','Area','A rectangular yard measures '+(a+12)+' m by '+(b+8)+' m. A square pit of side '+sq+' m is excluded. Find (a) rectangular area and (b) remaining area.',area,area-sq*sq,'Area = '+(a+12)+' × '+(b+8)+' = '+area,'Remaining = '+area+' − '+sq+'² = '+(area-sq*sq)),
 add(8,bookB,'moderate','Statistics','Seven recorded values are '+list.join(', ')+'. Find (a) their median and (b) their mean to 2 decimal places.',ordered[3],r2(sum/7),'Sorted: '+ordered.join(', ')+'; median '+ordered[3],'Mean = '+sum+' ÷ 7 = '+r2(sum/7)),
 add(9,bookB,'moderate','Volume of prisms','A triangular prism has a cross-section base of '+2*a+' cm, perpendicular height '+b+' cm, and prism length '+(c+7)+' cm. Find (a) cross-section area and (b) volume.',a*b,a*b*(c+7),'Area = ½ × '+2*a+' × '+b+' = '+a*b,'Volume = '+a*b+' × '+(c+7)+' = '+a*b*(c+7)),
 add(10,bookB,'challenging','Financial arithmetic','A stall buys '+count+' goods for $'+cost+' each. It sells '+(count-10)+' at $'+(cost+3)+' and the remaining 10 at $'+(cost-1)+'. Find (a) total revenue and (b) profit.',revenue,revenue-count*cost,'Revenue = '+(count-10)+' × '+(cost+3)+' + 10 × '+(cost-1)+' = '+revenue,'Profit = '+revenue+' − '+count*cost+' = '+(revenue-count*cost))
 ];
 }else{
 const leg=3*a,other=4*a,hyp=5*a,counts=a+b+c,rad=c+3,h=a+5;
 const scores=[2,3,4,4,5,6,7].map(x=>x+set),sum=scores.reduce((x,y)=>x+y,0);
 q=[
 add(1,bookA,'basic','Simultaneous equations','The equations x+y='+ (a+b)+' and x−y='+(a-b)+' hold. Find (a) x and (b) y.',a,b,'Adding gives 2x = '+2*a+', x='+a,'Substitution gives y='+b),
 add(2,bookA,'basic','Direct proportion','A quantity y varies directly as x. When x='+a+', y='+a*b+'. Find (a) the constant of proportionality and (b) y when x='+(a+c)+'.',b,b*(a+c),'k = '+a*b+' ÷ '+a+' = '+b,'y = '+b+' × '+(a+c)+' = '+b*(a+c)),
 add(3,bookB,'basic','Pythagoras theorem','A right triangle has shorter sides '+leg+' cm and '+other+' cm. Find (a) the square of its hypotenuse and (b) the hypotenuse.',hyp*hyp,hyp,'c² = '+leg+'² + '+other+'² = '+hyp*hyp,'c = '+hyp+' cm'),
 add(4,bookB,'basic','Similarity','Corresponding sides in similar shapes are '+a+' cm and '+2*a+' cm. Another side on the small shape is '+(b+3)+' cm. Find (a) scale factor and (b) corresponding large side.',2,2*(b+3),'Scale factor = '+2*a+' ÷ '+a+' = 2','Other side = 2 × '+(b+3)+' = '+2*(b+3)),
 add(5,bookB,'basic','Averages','The ordered survey values are '+scores.join(', ')+'. Find (a) median and (b) mean to 2 decimal places.',scores[3],r2(sum/7),'Median = fourth value = '+scores[3],'Mean = '+sum+' ÷ 7 = '+r2(sum/7)),
 add(6,bookB,'moderate','Trigonometry','In a right triangle an acute angle is 30 degrees and its opposite side is '+a+' cm. Find (a) sin 30 degrees as a decimal and (b) hypotenuse length.',0.5,2*a,'sin 30 = 0.5','Hypotenuse = '+a+' ÷ 0.5 = '+2*a),
 add(7,bookB,'moderate','Surface area','A closed cube has side '+rad+' cm. Find (a) area of one face and (b) total surface area.',rad*rad,6*rad*rad,'Face area = '+rad+'² = '+rad*rad,'Total = 6 × '+rad*rad+' = '+6*rad*rad),
 add(8,bookB,'moderate','Probability','A bag contains '+a+' red, '+b+' green and '+c+' yellow counters. Find (a) total counters and (b) probability of green to 3 decimal places.',counts,Number((b/counts).toFixed(3)),'Total = '+counts,'P(green) = '+b+'/'+counts+' = '+Number((b/counts).toFixed(3))),
 add(9,bookB,'moderate','Volume of cones','A cone has radius '+rad+' cm and height '+h+' cm. Use π=3.142. Find (a) r²h and (b) cone volume to 3 significant figures.',rad*rad*h,Number((3.142*rad*rad*h/3).toPrecision(3)),'r²h = '+rad*rad*h,'Volume = πr²h/3 = '+Number((3.142*rad*rad*h/3).toPrecision(3))),
 add(10,bookB,'challenging','Probability without replacement','A box has '+a+' red, '+b+' blue and '+c+' white balls. Two are selected without replacement. Find (a) total balls and (b) probability of two reds to 3 decimal places.',counts,Number((a/counts*(a-1)/(counts-1)).toFixed(3)),'Total = '+counts,'P(two red) = ('+a+'/'+counts+') × ('+(a-1)+'/'+(counts-1)+') = '+Number((a/counts*(a-1)/(counts-1)).toFixed(3)))
 ];
 }
 return {status:'DRAFT generated content — accuracy, difficulty and exam similarity pending review',title:'Secondary '+level+' Paper '+paper+' Set '+set,questions:q};
}
window.HASetGenerator={make};
})();
