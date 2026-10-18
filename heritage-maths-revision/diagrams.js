/* Deterministic, schematic SVG illustrations. Measurements are label values, not pixel scale. */
(function(){
const NS="http://www.w3.org/2000/svg";
function node(parent,tag,attrs,text){const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs||{}))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;parent.append(e);return e}
function render(root,spec){if(!root||!spec)return;const svg=node(root,"svg",{viewBox:"0 0 480 270",role:"img","aria-label":spec.kind==="linear-graph"?"Cartesian graph of a straight line with labelled plotted points":spec.kind==="cutout-rectangle"?"L-shaped region with rectangular cutout":spec.kind==="composite-rectangle"?"Schematic rectangular courtyard with an internal square flower bed":"Schematic triangular prism showing triangular base, perpendicular height and length"});svg.style.maxWidth="520px";svg.style.width="100%";
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
 const pts=spec.points||[], m=spec.slope, c=spec.intercept;
 const ox=185, xScale=24, yBottom=224, yTop=38;
 const ys=[0,...pts.map(p=>p[1])];
 const minY=Math.min(...ys)-1,maxY=Math.max(...ys)+1;
 const yScale=Math.min(23,(yBottom-yTop)/(maxY-minY));
 const oy=yBottom+minY*yScale;
 const Y=v=>oy-v*yScale, X=v=>ox+v*xScale;
 for(let x=-4;x<=4;x++)line(X(x),yTop,X(x),yBottom);
 const low=Math.ceil(minY),high=Math.floor(maxY);
 for(let y=low;y<=high;y++)line(65,Y(y),300,Y(y));
 line(X(-4),Y(m*(-4)+c),X(4),Y(m*4+c));
 pts.forEach(p=>node(svg,"circle",{cx:X(p[0]),cy:Y(p[1]),r:4,fill:"#c2483b"}));
 txt(325,83,"Plotted points:");
 pts.forEach((p,i)=>txt(325,109+i*26,"("+p[0]+", "+p[1]+")"));
 txt(140,257,"Axes schematic; plotted points to scale");
 }else if(spec.kind==="cutout-rectangle"){
 const W=spec.outer[0],H=spec.outer[1],w=spec.inner[0],h=spec.inner[1];
 node(svg,"path",{d:"M65 45 H370 V"+(45+175*h/H)+" H"+(370-305*w/W)+" V220 H65 Z",fill:"#e0f0fc",stroke:"#214a67","stroke-width":2});
 txt(182,38,W+" "+spec.unit);txt(12,125,H+" "+spec.unit);txt(330,240,w+" "+spec.unit);txt(390,130,h+" "+spec.unit);
 txt(150,255,"Diagram not to scale");
 }
 return svg}
window.HADiagrams={render};
})();
