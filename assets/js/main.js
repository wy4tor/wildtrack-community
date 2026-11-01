(()=>{
const TIKTOK_LINK='https://tiktok.me/group/ZSgwroBQM/'; // jedino mesto za izmenu linka (važi za sva dugmad sa data-tiktok)
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('[data-tiktok]').forEach(a=>a.href=TIKTOK_LINK);$('#year').textContent=new Date().getFullYear();
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
// reči u naslovu (stagger)
let k=0;$$('.hero h1 .line').forEach(l=>{const t=l.textContent.trim().split(/\s+/);l.setAttribute('aria-hidden','true');l.innerHTML=t.map(w=>`<span class="wm"><span class="w" style="--k:${k++}">${w}</span></span>`).join('')});
// gooey dugmad + magnetni efekat
$$('.btn').forEach(b=>{b.innerHTML='<span class="goo"><i></i><i></i><i></i><i></i><i></i></span><span class="lbl">'+b.innerHTML+'</span>';
if(fine&&!rm){b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')}});
// svetlosni odsjaj na staklu prati miš
document.addEventListener('pointermove',e=>{const g=e.target.closest&&e.target.closest('.glass');if(g){const r=g.getBoundingClientRect();g.style.setProperty('--mx',(e.clientX-r.left)+'px');g.style.setProperty('--my',(e.clientY-r.top)+'px')}},{passive:true});
// meni
const btn=$('#menuBtn'),nav=$('#nav');
const setMenu=o=>{nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Zatvori meni':'Otvori meni')};
btn.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});$$('.reveal').forEach(el=>io.observe(el));
// accordion
$$('.acc button').forEach(b=>b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);document.getElementById(b.getAttribute('aria-controls')).classList.toggle('open',!o)}));
// skrol petlja: glatki (lerp) parallax, story, marquee, progres
const hdr=$('#header'),prog=$('#progress'),hero=$('.hero'),heroBg=$('.hero .bg'),heroIn=$('.hero-inner'),story=$('.story'),stage=$('.stage'),chs=$$('.ch'),dots=$$('.dots b'),mega=$('#mega'),fin=$('.final .bg'),finS=$('.final'),sk=$$('.skw');
let tgt=scrollY,cur=scrollY,run=false;
const frame=()=>{run=false;tgt=scrollY;cur+=(tgt-cur)*(rm?1:.09);const v=tgt-cur,vh=innerHeight;
hdr.classList.toggle('solid',tgt>40);prog.style.transform=`scaleX(${clamp(tgt/(document.documentElement.scrollHeight-vh))})`;
if(!rm){if(cur<vh*1.2){heroBg.style.transform=`translate3d(0,${cur*.32}px,0) scale(${1.04+cur/vh*.1})`;heroIn.style.transform=`translate3d(0,${cur*.18}px,0)`;heroIn.style.opacity=clamp(1-cur/vh*1.1)}
const fr=finS.getBoundingClientRect();if(fr.top<vh&&fr.bottom>0)fin.style.transform=`translate3d(0,${(fr.top-vh/2)*-.14}px,0) scale(1.08)`;
sk.forEach(s=>s.style.transform=`skewX(${clamp(v*-.05,-9,9)}deg)`)}
const sr=story.getBoundingClientRect(),p=clamp(-sr.top/(sr.height-vh));
stage.style.setProperty('--p',p.toFixed(4));stage.style.setProperty('--wipe',(clamp((p-.3)/.32)*145).toFixed(1));
const idx=Math.min(chs.length-1,Math.floor(p*chs.length));chs.forEach((c,i)=>{c.classList.toggle('on',i===idx);c.classList.toggle('past',i<idx)});dots.forEach((d,i)=>d.classList.toggle('on',i===idx));
const zr=mega.getBoundingClientRect();mega.style.setProperty('--zf',(clamp((vh*.85-zr.top)/(vh*.5))*100).toFixed(1)+'%');
if(Math.abs(tgt-cur)>.3)req()};
const req=()=>{if(!run){run=true;requestAnimationFrame(frame)}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();
})();
