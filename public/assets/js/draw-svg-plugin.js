/*!
 * DrawSVGPlugin 3.10.4
 * https://greensock.com
 * 
 * @license Copyright 2022, GreenSock. All rights reserved.
 * *** DO NOT DEPLOY THIS FILE ***
 * This is a trial version that only works locally and on domains like codepen.io and codesandbox.io.
 * Loading it on an unauthorized domain violates the license and will cause a redirect.
 * Get the unrestricted file by joining Club GreenSock at https://greensock.com/club
 * @author: Jack Doyle, jack@greensock.com
 */

let e,t,n,i,r,s,o=()=>"undefined"!=typeof window,a=()=>e||o()&&(e=window.gsap)&&e.registerPlugin&&e,d=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,l={rect:["width","height"],circle:["r","r"],ellipse:["rx","ry"],line:["x2","y2"]},h=e=>Math.round(1e4*e)/1e4,f=e=>parseFloat(e)||0,g=(e,t)=>{let n=f(e);return~e.indexOf("%")?n/100*t:n},u=(e,t)=>f(e.getAttribute(t)),c=Math.sqrt,p=(e,t,n,i,r,s)=>c(((f(n)-f(e))*r)**2+((f(i)-f(t))*s)**2),w=e=>console.warn(e),_=e=>"non-scaling-stroke"===e.getAttribute("vector-effect"),y=function(){return String.fromCharCode.apply(null,arguments)},x='codemonk.digital',m=function(e){var t="undefined"!=typeof window,n=0===(t?window.location.href:"").indexOf(y(102,105,108,101,58,47,47))||-1!==e.indexOf(y(108,111,99,97,108,104,111,115,116))||-1!==e.indexOf(y(49,50,55,46,48,32,48,46,49)),i=[x,y(99,111,100,101,112,101,110,46,105,111),y(99,111,100,101,112,101,110,46,112,108,117,109,98,105,110,103),y(99,111,100,101,112,101,110,46,100,101,118),y(99,111,100,101,112,101,110,46,97,112,112),y(99,111,100,101,112,101,110,46,119,101,98,115,105,116,101),y(112,101,110,115,46,99,108,111,117,100),y(99,115,115,45,116,114,105,99,107,115,46,99,111,109),y(99,100,112,110,46,105,111),y(112,101,110,115,46,105,111),y(103,97,110,110,111,110,46,116,118),y(99,111,100,101,99,97,110,121,111,110,46,110,101,116),y(116,104,101,109,101,102,111,114,101,115,116,46,110,101,116),y(99,101,114,101,98,114,97,120,46,99,111,46,117,107),y(116,121,109,112,97,110,117,115,46,110,101,116),y(116,119,101,101,110,109,97,120,46,99,111,109),y(116,119,101,101,110,108,105,116,101,46,99,111,109),y(112,108,110,107,114,46,99,111),y(104,111,116,106,97,114,46,99,111,109),y(119,101,98,112,97,99,107,98,105,110,46,99,111,109),y(97,114,99,104,105,118,101,46,111,114,103),y(99,111,100,101,115,97,110,100,98,111,120,46,105,111),y(99,115,98,46,97,112,112),y(115,116,97,99,107,98,108,105,116,122,46,99,111,109),y(115,116,97,99,107,98,108,105,116,122,46,105,111),y(99,111,100,105,101,114,46,105,111),y(109,111,116,105,111,110,116,114,105,99,107,115,46,99,111,109),y(115,116,97,99,107,111,118,101,114,102,108,111,119,46,99,111,109),y(115,116,97,99,107,101,120,99,104,97,110,103,101,46,99,111,109),y(106,115,102,105,100,100,108,101,46,110,101,116)],r=function(){t&&("loading"===document.readyState||"interactive"===document.readyState?document.addEventListener("readystatechange",r):(document.removeEventListener("readystatechange",r),t&&window.console&&!window._gsapWarned&&"object"==typeof window.gsap&&!1!==window.gsap.config().trialWarn&&(console.log(y(37,99,87,97,114,110,105,110,103),y(102,111,110,116,45,115,105,122,101,58,51,48,112,120,59,99,111,108,111,114,58,114,101,100,59)),console.log(y(65,32,116,114,105,97,108,32,118,101,114,115,105,111,110,32,111,102,32)+"DrawSVGPlugin"+y(32,105,115,32,108,111,97,100,101,100,32,116,104,97,116,32,111,110,108,121,32,119,111,114,107,115,32,108,111,99,97,108,108,121,32,97,110,100,32,111,110,32,100,111,109,97,105,110,115,32,108,105,107,101,32,99,111,100,101,112,101,110,46,105,111,32,97,110,100,32,99,111,100,101,115,97,110,100,98,111,120,46,105,111,46,32,42,42,42,32,68,79,32,78,79,84,32,68,69,80,76,79,89,32,84,72,73,83,32,70,73,76,69,32,42,42,42,32,76,111,97,100,105,110,103,32,105,116,32,111,110,32,97,110,32,117,110,97,117,116,104,111,114,105,122,101,100,32,115,105,116,101,32,118,105,111,108,97,116,101,115,32,116,104,101,32,108,105,99,101,110,115,101,32,97,110,100,32,119,105,108,108,32,99,97,117,115,101,32,97,32,114,101,100,105,114,101,99,116,46,32,80,108,101,97,115,101,32,106,111,105,110,32,67,108,117,98,32,71,114,101,101,110,83,111,99,107,32,116,111,32,103,101,116,32,102,117,108,108,32,97,99,99,101,115,115,32,116,111,32,116,104,101,32,98,111,110,117,115,32,112,108,117,103,105,110,115,32,116,104,97,116,32,98,111,111,115,116,32,121,111,117,114,32,97,110,105,109,97,116,105,111,110,32,115,117,112,101,114,112,111,119,101,114,115,46,32,68,105,115,97,98,108,101,32,116,104,105,115,32,119,97,114,110,105,110,103,32,119,105,116,104,32,103,115,97,112,46,99,111,110,102,105,103,40,123,116,114,105,97,108,87,97,114,110,58,32,102,97,108,115,101,125,41,59)),console.log(y(37,99,71,101,116,32,117,110,114,101,115,116,114,105,99,116,101,100,32,102,105,108,101,115,32,97,116,32,104,116,116,112,115,58,47,47,103,114,101,101,110,115,111,99,107,46,99,111,109,47,99,108,117,98),y(102,111,110,116,45,115,105,122,101,58,49,54,112,120,59,99,111,108,111,114,58,35,52,101,57,56,49,53)),window._gsapWarned=1)))},s=i.length;for(setTimeout(r,50);--s>-1;)if(-1!==e.indexOf(i[s]))return!0;return n||!setTimeout((function(){t&&(window.location.href=y(104,116,116,112,115,58,47,47)+x+y(47,114,101,113,117,105,114,101,115,45,109,101,109,98,101,114,115,104,105,112,47)+"?plugin=DrawSVGPlugin&source=trial")}),3e3)}("undefined"!=typeof window?window.location.host:""),b=e=>{if(!(e=t(e)[0]))return 0;let n,i,r,o,a,f,g,y=e.tagName.toLowerCase(),x=e.style,m=1,b=1;_(e)&&(b=e.getScreenCTM(),m=c(b.a*b.a+b.b*b.b),b=c(b.d*b.d+b.c*b.c));try{i=e.getBBox()}catch(e){w("Some browsers won't measure invisible elements (like display:none or masks inside defs).")}let{x:k,y:v,width:P,height:O}=i||{x:0,y:0,width:0,height:0};if(i&&(P||O)||!l[y]||(P=u(e,l[y][0]),O=u(e,l[y][1]),"rect"!==y&&"line"!==y&&(P*=2,O*=2),"line"===y&&(k=u(e,"x1"),v=u(e,"y1"),P=Math.abs(P-k),O=Math.abs(O-v))),"path"===y)o=x.strokeDasharray,x.strokeDasharray="none",n=e.getTotalLength()||0,h(m)!==h(b)&&!s&&(s=1)&&w("Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."),n*=(m+b)/2,x.strokeDasharray=o;else if("rect"===y)n=2*P*m+2*O*b;else if("line"===y)n=p(k,v,k+P,v+O,m,b);else if("polyline"===y||"polygon"===y)for(r=e.getAttribute("points").match(d)||[],"polygon"===y&&r.push(r[0],r[1]),n=0,a=2;a<r.length;a+=2)n+=p(r[a-2],r[a-1],r[a],r[a+1],m,b)||0;else"circle"!==y&&"ellipse"!==y||(f=P/2*m,g=O/2*b,n=Math.PI*(3*(f+g)-c((3*f+g)*(f+3*g))));return n||0},k=(e,i)=>{if(!(e=t(e)[0]))return[0,0];i||(i=b(e)+1);let r=n.getComputedStyle(e),s=r.strokeDasharray||"",o=f(r.strokeDashoffset),a=s.indexOf(",");return a<0&&(a=s.indexOf(" ")),s=a<0?i:f(s.substr(0,a)),s>i&&(s=i),[-o||0,s-o||0]},v=()=>{o()&&(n=window,r=e=a(),t=e.utils.toArray,i=-1!==((n.navigator||{}).userAgent||"").indexOf("Edge"))};const P={version:"3.10.4",name:"drawSVG",register(t){e=t,v()},init(e,t,s,o,a){if(!e.getBBox)return!1;r||v();let d,l,u,c=b(e);return this._style=e.style,this._target=e,t+""=="true"?t="0 100%":t?-1===(t+"").indexOf(" ")&&(t="0 "+t):t="0 0",d=k(e,c),l=((e,t,n)=>{let i,r,s=e.indexOf(" ");return s<0?(i=void 0!==n?n+"":e,r=e):(i=e.substr(0,s),r=e.substr(s+1)),i=g(i,t),r=g(r,t),i>r?[r,i]:[i,r]})(t,c,d[0]),this._length=h(c),this._dash=h(d[1]-d[0]),this._offset=h(-d[0]),this._dashPT=this.add(this,"_dash",this._dash,h(l[1]-l[0])),this._offsetPT=this.add(this,"_offset",this._offset,h(-l[0])),i&&(u=n.getComputedStyle(e),u.strokeLinecap!==u.strokeLinejoin&&(l=f(u.strokeMiterlimit),this.add(e.style,"strokeMiterlimit",l,l+.01))),this._live=_(e)||~(t+"").indexOf("live"),this._nowrap=~(t+"").indexOf("nowrap"),this._props.push("drawSVG"),m},render(e,t){let n,i,r,s,o=t._pt,a=t._style;if(o){for(t._live&&(n=b(t._target),n!==t._length&&(i=n/t._length,t._length=n,t._offsetPT&&(t._offsetPT.s*=i,t._offsetPT.c*=i),t._dashPT?(t._dashPT.s*=i,t._dashPT.c*=i):t._dash*=i));o;)o.r(e,o.d),o=o._next;r=t._dash||(e&&1!==e?1e-4:0),n=t._length-r+.1,s=t._offset,r&&s&&r+Math.abs(s%t._length)>t._length-.2&&(s+=s<0?.1:-.1)&&(n+=.1),a.strokeDashoffset=r?s:s+.001,a.strokeDasharray=n<.2?"none":r?r+"px,"+(t._nowrap?999999:n)+"px":"0px, 999999px"}},getLength:b,getPosition:k};a()&&e.registerPlugin(P);export default P;export{P as DrawSVGPlugin};