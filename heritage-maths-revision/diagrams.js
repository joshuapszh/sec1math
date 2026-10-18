/* Deterministic, schematic SVG illustrations. Measurements are label values, not pixel scale. */
(function(){
const NS="http://www.w3.org/2000/svg";
function node(parent,tag,attrs,text){const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs||{}))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;parent.append(e);return e}
function render(root,spec){if(!root||!spec)return;const svg=node(root,"svg",{viewBox:"0 0 480 270",role:"img","aria-label":spec.kind==="composite-rectangle"?"Schematic rectangular courtyard with an internal square flower bed":"Schematic triangular prism showing triangular base, perpendicular height and length"});svg.style.maxWidth="520px";svg.style.width="100%";
const line=(x1,y1,x2,y2)=>node(svg,"line",{x1,y1,x2,y2,stroke:"#214a67","stroke-width":2});
const txt=(x,y,t)=>node(svg,"text",{x,y,"font-size":15,fill:"#183a50"},t);
if(spec.kind==="composite-rectangle"){
node(svg,"rect",{x:55,y:45,width:330,height:170,fill:"#ecf6ff",stroke:"#214a67","stroke-width":2});
node(svg,"rect",{x:165,y:89,width:110,height:95,fill:"#dff0da",stroke:"#214a67","stroke-width":2});
txt(201,39,spec.outer[0]+" "+spec.unit);txt(14,135,spec.outer[1]+" "+spec.unit);txt(182,81,spec.inner[0]+" "+spec.unit);txt(190,139,"Flower bed");txt(160,247,"Diagram not to scale");
}else if(spec.kind==="triangular-prism"){
const a=[82,198],b=[260,198],c=[170,55],dx=112,dy=24;
node(svg,"polygon",{points:[a,b,c].map(p=>p.join(",")).join(" "),fill:"#e8f4fc",stroke:"#214a67","stroke-width":2});
node(svg,"polygon",{points:[c,[c[0]+dx,c[1]+dy],[b[0]+dx,b[1]+dy],b].map(p=>p.join(",")).join(" "),fill:"#d5e9f6",stroke:"#214a67","stroke-width":2});
line(...a,a[0]+dx,a[1]+dy);line(...b,b[0]+dx,b[1]+dy);line(c[0],c[1],c[0]+dx,c[1]+dy);
line(c[0],c[1],170,198);svg.lastChild.setAttribute("stroke-dasharray","5 5");
txt(146,220,spec.base+" "+spec.unit);txt(178,130,spec.height+" "+spec.unit);txt(302,146,spec.length+" "+spec.unit);txt(137,253,"Diagram not to scale");
}
else if(spec.kind==="linear-graph"){
 const ox=190,oy=150,k=22;
 for(let x=-5;x<=5;x++)line(ox+x*k,35,ox+x*k,245);
 for(let y=-4;y<=4;y++)line(75,oy-y*k,310,oy-y*k);
 const pts=spec.points;
 const lo=pts[0],hi=pts[1];
 line(ox+lo[0]*k,oy-lo[1]*k,ox+hi[0]*k,oy-hi[1]*k);
 pts.forEach(p=>node(svg,"circle",{cx:ox+p[0]*k,cy:oy-p[1]*k,r:4,fill:"#c2483b"}));
 txt(330,88,"Points labelled:");pts.forEach((p,i)=>txt(330,113+i*27,"("+p[0]+", "+p[1]+")"));
 txt(130,265,"Schematic axes");
 }else if(spec.kind==="cutout-rectangle"){
 const W=spec.outer[0],H=spec.outer[1],w=spec.inner[0],h=spec.inner[1];
 node(svg,"path",{d:"M65 45 H370 V"+(45+175*h/H)+" H"+(370-305*w/W)+" V220 H65 Z",fill:"#e0f0fc",stroke:"#214a67","stroke-width":2});
 txt(182,38,W+" "+spec.unit);txt(12,125,H+" "+spec.unit);txt(330,240,w+" "+spec.unit);txt(390,130,h+" "+spec.unit);
 txt(150,255,"Diagram not to scale");
 }
 return svg}
window.HADiagrams={render};
})();
