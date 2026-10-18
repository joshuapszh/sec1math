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
 add(5,bookB,'basic','Average rate','A device transfers '+9*a+' litres in 3 minutes and '+4*b+' litres in 2 more minutes. Find (a) total volume and (b) average rate in litres per minute, correct to 2 decimal places.',9*a+4*b,r2((9*a+4*b)/5),'Total = '+9*a+' + '+4*b+' = '+(9*a+4*b),'Rate = '+(9*a+4*b)+' ÷ 5 = '+r2((9*a+4*b)/5)),
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
 add(7,bookB,'moderate','Surface area','A cylindrical display has radius '+rad+' cm and height '+h+' cm. Use π = 3.142. (a) Find the area of its circular base to 2 decimal places. (b) Find the curved surface area to 2 decimal places.',r2(3.142*rad*rad),r2(2*3.142*rad*h),'Base area = 3.142 × '+rad+'² = '+r2(3.142*rad*rad)+' cm²','Curved surface area = 2 × 3.142 × '+rad+' × '+h+' = '+r2(2*3.142*rad*h)+' cm²'),
 add(8,bookB,'moderate','Probability','A bag contains '+a+' red, '+b+' green and '+c+' yellow counters. Find (a) total counters and (b) probability of green to 3 decimal places.',counts,Number((b/counts).toFixed(3)),'Total = '+counts,'P(green) = '+b+'/'+counts+' = '+Number((b/counts).toFixed(3))),
 add(9,bookB,'moderate','Volume of cones','A cone has radius '+rad+' cm and height '+h+' cm. Use π=3.142. Find (a) r²h and (b) cone volume to 3 significant figures.',rad*rad*h,Number((3.142*rad*rad*h/3).toPrecision(3)),'r²h = '+rad*rad*h,'Volume = πr²h/3 = '+Number((3.142*rad*rad*h/3).toPrecision(3))),
 add(10,bookB,'challenging','Probability of single events','Twelve cards labelled 1 to 12 are mixed. One card is selected at random. (a) How many cards have numbers divisible by 3? (b) Find the probability the number is divisible by 3 or by 4, correct to 3 decimal places.',4,0.5,'Multiples of 3: 3, 6, 9, 12, giving four favourable cards.','Multiples of 3 or 4: 3, 4, 6, 8, 9, 12. There are 6 distinct outcomes out of 12, so probability = 6/12 = 0.500.')
 ];
 }
 // Distinct graph and multi-step applications. Keep existing mark blueprint.
 if(level===2){
  const slope=c, intercept=b-2, x1=-1, x2=0;
  const graphQuestion=add(2,bookA,'basic','Linear graphs',
   'The straight line passes through ('+x1+', '+(slope*x1+intercept)+') and ('+x2+', '+(slope*x2+intercept)+'). (a) Find its gradient. (b) Find its y-intercept.',
   slope,intercept,
   'Gradient = ('+(slope*x2+intercept)+' − '+(slope*x1+intercept)+') ÷ ('+x2+' − ('+x1+')) = '+slope,
   'Using y = mx + c, c = '+intercept);
  graphQuestion.diagram={kind:'linear-graph',slope,intercept,points:[[x1,slope*x1+intercept],[x2,slope*x2+intercept]]};
  q[1]=graphQuestion;
 }
 if(level===1&&set===3){
  const outerL=a+14,outerW=b+10,cutL=c+2,cutW=c+1;
  q[6]=add(7,bookB,'moderate','Composite area',
   'An L-shaped tiled region is made by removing a '+cutL+' m by '+cutW+' m rectangle from one corner of a '+outerL+' m by '+outerW+' m rectangle. (a) Find the outer area. (b) Find the tiled area.',
   outerL*outerW,outerL*outerW-cutL*cutW,
   'Outer area = '+outerL+' × '+outerW+' = '+(outerL*outerW)+' m²',
   'Tiled area = '+(outerL*outerW)+' − '+cutL+' × '+cutW+' = '+(outerL*outerW-cutL*cutW)+' m²');
  q[6].diagram={kind:'cutout-rectangle',outer:[outerL,outerW],inner:[cutL,cutW],unit:'m'};
 }

 if(level===1&&set===2){
  const walking=12+a,cycling=18+b,minutes=2+c;
  q[4]=add(5,bookB,'basic','Speed and distance',
   'A delivery rider covers '+cycling+' km in 2 hours and then '+walking+' km in '+minutes+' hours. (a) Find the total distance in kilometres. (b) Calculate the average speed for the entire journey in km/h, correct to 2 decimal places.',
   cycling+walking,r2((cycling+walking)/(2+minutes)),
   'Total distance = '+cycling+' + '+walking+' = '+(cycling+walking)+' km',
   'Average speed = '+(cycling+walking)+' ÷ (2 + '+minutes+') = '+r2((cycling+walking)/(2+minutes))+' km/h');
  q[4].steps[1].format={decimalPlaces:2};
 }
 if(level===2&&set===3){
  const r=c+3, h=a+4, pi=3.142, curved=r2(pi*r*(2*r+h));
  q[8]=add(9,bookB,'moderate','Surface area of cones',
   'A cone has radius '+r+' cm and slant height '+(r+h)+' cm. Use pi = 3.142. (a) Find the circular base area to 2 decimal places. (b) Find the total surface area to 2 decimal places.',
   r2(pi*r*r),curved,
   'Base area = 3.142 × '+r+'² = '+r2(pi*r*r)+' cm²',
   'Total surface area = 3.142 × '+r+' × ('+r+' + '+(r+h)+') = '+curved+' cm²');
  q[8].steps[0].format={decimalPlaces:2};q[8].steps[1].format={decimalPlaces:2};
 }


 // Additional original syllabus practice; numeric responses avoid ungraded graph construction.
 if(level===1&&set===2){
  const threshold=a+8,offset=c+3;
  q[5]=add(6,bookB,'moderate','Simple inequalities',
   'A number x satisfies 3x + '+offset+' < '+(3*threshold+offset)+'. (a) Find the boundary value when 3x + '+offset+' = '+(3*threshold+offset)+'. (b) Find the greatest integer that satisfies the inequality.',
   threshold,threshold-1,
   'Subtract '+offset+' and divide by 3: x = '+threshold+'.',
   'The solution is x < '+threshold+'; the greatest integer below '+threshold+' is '+(threshold-1)+'.');
 }
 if(level===2&&set===2){
  const widths=[5,10,5],densities=[b+1,c+1,a+1],freq=widths.map((w,i)=>w*densities[i]);
  q[7]=add(8,bookB,'moderate','Statistical diagrams',
   'A histogram uses a vertical frequency-density scale. Its three adjacent class intervals have widths '+widths.join(', ')+' minutes and frequencies '+freq.join(', ')+'. (a) Find the frequency density of the middle interval. (b) Find the greatest frequency density.',
   densities[1],Math.max(...densities),
   'Frequency density = frequency ÷ class width = '+freq[1]+' ÷ '+widths[1]+' = '+densities[1]+'.',
   'Compare '+densities.join(', ')+': the greatest is '+Math.max(...densities)+'.');
 }
 if(level===1&&set===3){
  const m=c,intercept=b;
  q[4]=add(5,bookB,'basic','Linear graphs',
   'A straight line has equation y = '+m+'x + '+intercept+'. (a) Find y when x = 2. (b) Find its y-intercept.',
   2*m+intercept,intercept,
   'Substitute x = 2: y = '+m+' × 2 + '+intercept+' = '+(2*m+intercept)+'.',
   'At x = 0, y = '+intercept+'; this is the y-intercept.');
  q[4].diagram={kind:'linear-graph',slope:m,intercept,points:[[0,intercept],[1,m+intercept]]};
 }

 // More distinct Paper 2 word problems while preserving the chapter and marks blueprint.
 if(paper===2&&level===1){
  const width=b+4,original=a+12,extended=original+c,perimeter=2*(extended+width);
  q[1]=add(2,bookA,'basic','Linear equations',
   'A rectangular display has width '+width+' cm. Its length was increased by '+c+' cm, and the new perimeter is '+perimeter+' cm. (a) Find its new length. (b) Find the original length before the increase.',
   extended,original,
   'New length = (perimeter ÷ 2) − width = '+perimeter+' ÷ 2 − '+width+' = '+extended+' cm.',
   'Original length = '+extended+' − '+c+' = '+original+' cm.');
  q[1].explanation='Halve the entire perimeter first; the given increase applies only to the length.';
 }
 if(paper===2&&level===2){
  const radius=c+3,height=a+5,pi=3.142,wrap=Math.round(2*pi*radius*height*100)/100,base=Math.round(pi*radius*radius*100)/100;
  q[6]=add(7,bookB,'moderate','Surface area',
   'A cylindrical display has radius '+radius+' cm and height '+height+' cm. The curved side is wrapped in material, while one circular end receives a label. Use pi = 3.142. (a) Find the label area to 2 decimal places. (b) Find the wrapping area to 2 decimal places.',
   base,wrap,
   'Circular label area = 3.142 × '+radius+'² = '+base+' cm².',
   'Curved wrapping area = 2 × 3.142 × '+radius+' × '+height+' = '+wrap+' cm².');
  q[6].steps[0].format={decimalPlaces:2};q[6].steps[1].format={decimalPlaces:2};
 }
 // Paper 2 uses linked quantities rather than repeating Paper 1 opening drills.
 if(paper===2&&level===1){
  const cartons=a+3,perCarton=12+b,used=2*c,total=cartons*perCarton;
  q[0]=add(1,bookA,'basic','Arithmetic',
   'A library receives '+cartons+' cartons, each with '+perCarton+' bookmarks. It distributes '+used+' bookmarks to each of 3 reading clubs. (a) Find the total bookmarks received. (b) Find the number remaining after the distribution.',
   total,total-3*used,
   'Total bookmarks = '+cartons+' × '+perCarton+' = '+total+'.',
   'Distributed = 3 × '+used+' = '+(3*used)+'; remaining = '+total+' − '+(3*used)+' = '+(total-3*used)+'.');
 }
 if(paper===2&&level===2){
  const adult=a+4,student=b+5,adultPrice=12,studentPrice=7,count=adult+student,cost=adultPrice*adult+studentPrice*student;
  q[0]=add(1,bookA,'basic','Simultaneous equations',
   'At a museum there are '+count+' visitors holding either adult or student tickets. Adult tickets cost SGD 12 and student tickets cost SGD 7. Ticket revenue is SGD '+cost+'. Let x be adult tickets and y be student tickets. (a) Find x. (b) Find y. Show how two equations describe the situation.',
   adult,student,
   'x + y = '+count+' and 12x + 7y = '+cost+'. Subtract 7(x + y) from the revenue equation: 5x = '+(cost-7*count)+', hence x = '+adult+'.',
   'y = '+count+' − '+adult+' = '+student+'. Check revenue: 12('+adult+') + 7('+student+') = '+cost+'.');
 }
 // Paper 2: extended applications.
 if(paper===2&&level===1){
  const cost=a+3,qty=5*b,markup=c+2,transport=b+3;
  const revenue=(qty-5)*(cost+markup)+5*(cost-1);
  q[9]=add(10,bookB,'challenging','Financial decisions',
   'A class fundraiser buys '+qty+' reusable cups for SGD '+cost+' each. It sells '+(qty-5)+' cups at SGD '+(cost+markup)+' and five cups at SGD '+(cost-1)+'. There is an additional SGD '+transport+' delivery charge. (a) Find revenue. (b) Find net profit after all costs.',
   revenue,revenue-qty*cost-transport,
   'Revenue = '+(qty-5)+' × '+(cost+markup)+' + 5 × '+(cost-1)+' = '+revenue+'.',
   'Net profit = '+revenue+' − '+(qty*cost)+' − '+transport+' = '+(revenue-qty*cost-transport)+'.');
 }
 if(paper===2&&level===2){
  const side=a+4,small=side*side,large=4*small;
  q[3]=add(4,bookB,'basic','Similarity of areas',
   'Two similar square panels have sides '+side+' cm and '+(2*side)+' cm. (a) Find the smaller area. (b) Find how much larger the other area is.',
   small,large-small,
   'Smaller area = '+side+'² = '+small+' cm².',
   'Larger area = '+(2*side)+'² = '+large+' cm²; difference = '+(large-small)+' cm².');
 }
 if(paper===2&&level===1&&set!==3){
 const price1=a+2,qty1=b+3,price2=a+5,qty2=b+2;
 const cost1=price1*qty1,cost2=price2*qty2,total=cost1+cost2,quantity=qty1+qty2;
 q[4]=add(5,bookB,'basic','Unit rates and combined cost',
  'A supply shop sells '+qty1+' identical notebooks at SGD '+price1+' each and '+qty2+' identical notebooks at SGD '+price2+' each. (a) Find the total cost in SGD. (b) Find the average cost per notebook, to 2 decimal places.',
  total,Math.round(total/quantity*100)/100,
  'Total cost = '+qty1+' × '+price1+' + '+qty2+' × '+price2+' = SGD '+total+'.',
  'Total notebooks = '+qty1+' + '+qty2+' = '+quantity+'. Average unit cost = '+total+' ÷ '+quantity+' = SGD '+(Math.round(total/quantity*100)/100)+'.');
 q[4].steps[1].format={decimalPlaces:2};
 }

 if(paper===2&&level===2&&set===1){
 const side=c+6,baseHeight=a+3,pyramidHeight=3*(b+2);
 const cuboid=side*side*baseHeight,pyramid=side*side*pyramidHeight/3;
 q[8]=add(9,bookB,'moderate','Composite solid volume',
  'A display model consists of a square-based cuboid of base '+side+' cm by '+side+' cm and height '+baseHeight+' cm. A square pyramid of the same base is fixed on top. Its perpendicular height is '+pyramidHeight+' cm. (a) Find the volume of the pyramid. (b) Find the total volume of the display model.',
  pyramid,pyramid+cuboid,
  'Pyramid volume = (1/3) × '+side+'² × '+pyramidHeight+' = '+pyramid+' cm³.',
  'Cuboid volume = '+side+'² × '+baseHeight+' = '+cuboid+' cm³. Total = '+pyramid+' + '+cuboid+' = '+(pyramid+cuboid)+' cm³.');
 }

 // Extend terse generated working with explicit teaching explanations.
 for(const question of q){
  question.solution=question.solution.map((line,i)=>{
    const lead=i===0?'Part (a): identify the quantity or formula and calculate it. ':'Part (b): apply the appropriate relationship to the given values. ';
    return lead+line+'. Check that your answer matches the required units or accuracy.';
  });
  const specific={
   'Arithmetic':'Equal sharing uses division; to scale up, multiply one group by the required number.',
   'Linear equations':'Perimeter counts two lengths and two widths; halve before subtracting the known width.',
   'Ratio':'First identify the number of equal ratio parts represented by the known amount.',
   'Percentage':'A percentage discount is calculated from the original price, not the discounted price.',
   'Average rate':'Average rate uses total distance or quantity divided by total elapsed time.',
   'Number patterns':'The nth term uses (n−1) differences from the first term.',
   'Area':'Find the full rectangular area, then subtract the excluded region.',
   'Statistics':'Sort the values for the median; use the sum divided by the count for the mean.',
   'Volume of prisms':'Area of the triangular cross-section is half base times perpendicular height.',
   'Financial arithmetic':'Sales revenue and initial purchase cost are different quantities.',
   'Linear graphs':'Gradient is the change in y divided by the change in x; intercept is y when x=0.',
   'Pythagoras theorem':'The longest side is opposite the right angle.',
   'Similarity':'Every corresponding length changes by the same scale factor.',
   'Averages':'For an odd number of ordered values, choose the middle position.',
   'Trigonometry':'Choose a trigonometric ratio based on the named sides.',
   'Surface area':'Distinguish one face, curved surface and total surface where appropriate.',
   'Probability':'Count favourable outcomes and compare them with all equally likely outcomes.',
   'Combined probability':'List or count ordered outcomes systematically.',
   'Probability of single events':'When counting an OR event, list each successful outcome once even if it belongs to both groups.',
   'Volume of cones':'A cone occupies one third of a cylinder with matching base and height.',
   'Surface area of cones':'Total cone area includes the circular base plus the curved side.',
   'Speed and distance':'For the full journey, divide total distance by total duration.',
   'Composite area':'A composite region can be found by subtracting the cutout from an outer shape.',
   'Simple inequalities':'Use the same operations as equations, but preserve the inequality direction when dividing by a positive number.',
   'Statistical diagrams':'Histogram bar heights represent frequency density, not raw frequency when class widths differ.',
   'Financial decisions':'Revenue is not profit: deduct purchases and all additional expenses.',
   'Similarity of areas':'A linear scale factor of two gives an area factor of four.',
   'Unit rates and combined cost':'A combined unit price is total cost divided by total quantity, not the mean of the two prices.',
   'Composite solid volume':'Compute the pyramid and cuboid volumes separately, then add; the common joining face does not affect volume.'
  };
  question.explanation=specific[question.topic]||'Check the calculation against the given relationship and verify its units.';
 }
 for(const question of q){if(level===1&&question.topic==='Average rate')question.steps[1].format={decimalPlaces:2};if(level===1&&question.topic==='Percentage'){question.steps[0].format={decimalPlaces:2};question.steps[1].format={decimalPlaces:2};}if((level===1&&question.topic==='Statistics')||(level===2&&['Averages','Surface area'].includes(question.topic)))question.steps[1].format={decimalPlaces:2};if(level===2&&['Probability','Combined probability','Probability of single events'].includes(question.topic))question.steps[1].format={decimalPlaces:3};if(level===2&&question.topic==='Volume of cones')question.steps[1].format={significantFigures:3};}
 return {status:'DRAFT generated content — accuracy, difficulty and exam similarity pending review',title:'Secondary '+level+' Paper '+paper+' Set '+set,questions:q};
}
window.HASetGenerator={make};
})();
