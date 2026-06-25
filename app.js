/* ░░░░░░░░ ELUCITHERIX — store engine ░░░░░░░░ */
const PRODUCTS = [
  { id:'puffer-jacket', name:'WAX Puffer Jacket', cat:'outerwear', price:2840,
    img:'assets/cutouts/puffer-jacket.png?v=2',
    sizes:['XS','S','M','L','XL'],
    desc:'Oversized WAX puffer. Detachable hood, massive collar, high-gloss leather-like shell. Architectural volume, drawn from NLE Choppa’s concept sketches.' },
  { id:'boot-pants', name:'WAX Ruched Boot-Pants', cat:'bottoms', price:1715,
    img:'assets/cutouts/boot-pants.png?v=2',
    sizes:['28','30','32','34','36'],
    desc:'Pant-boot hybrid in proprietary WAX. Gathered ruched detailing down the leg into an integrated boot. A silhouette no one else can build.' },
  { id:'flare-pants', name:'WAX Flare Pants', cat:'bottoms', price:1290,
    img:'assets/cutouts/flare-pants.png?v=2',
    sizes:['28','30','32','34','36'],
    desc:'Signature bootcut silhouette. High-gloss WAX with a clean five-pocket construction and precision double-needle stitching.' },
  { id:'wide-leg-shorts', name:'WAX Wide-Leg Shorts', cat:'bottoms', price:985,
    img:'assets/cutouts/wide-leg-shorts.png?v=2',
    sizes:['28','30','32','34','36'],
    desc:'Relaxed architectural fit. Pressed-crease WAX shorts with a dropped, sculptural break. Brutalist tailoring, head-to-toe ready.' },
  { id:'tank-top', name:'WAX Tank Top', cat:'tops', price:745,
    img:'assets/cutouts/tank-top.png?v=3',
    sizes:['XS','S','M','L','XL'],
    desc:'High-gloss leather-like WAX tank with subtle debossed LOVE branding and precision double-needle stitching. Rick Owens avant-garde line.' },
  { id:'gloves', name:'WAX Gloves', cat:'accessories', price:690,
    img:'assets/cutouts/gloves.png?v=2',
    sizes:['S','M','L'],
    desc:'Full-length WAX gloves with debossed LOVE. The finishing gesture of the head-to-toe WAX lifestyle.' },
  { id:'cap', name:'WAX Cap', cat:'accessories', price:615,
    img:'assets/cutouts/cap.png?v=2',
    sizes:['OS'],
    desc:'Structured WAX cap with debossed LOVE on the front panel. High-gloss, fully branded into the material.' },
  { id:'beanie', name:'WAX Beanie', cat:'accessories', price:560,
    img:'assets/cutouts/beanie.png?v=2',
    sizes:['OS'],
    desc:'Cuffed WAX beanie with debossed LOVE. Signature leather-like sheen, exclusive to ELUCITHERIX.' },
  { id:'socks', name:'WAX Socks', cat:'accessories', price:535,
    img:'assets/cutouts/socks.png?v=2',
    sizes:['OS'],
    desc:'WAX crew socks with debossed LOVE. The foundation of a complete head-to-toe WAX look.' },
  { id:'durag', name:'WAX Durag', cat:'accessories', price:565,
    img:'assets/cutouts/durag.png?v=1',
    sizes:['OS'],
    desc:'High-gloss WAX durag with debossed LOVE band and long tails. Silky-lined, brutalist finish — head-to-toe WAX, crown to wave.' },
  { id:'glasses', name:'WAX Oval Sunglasses', cat:'accessories', price:640,
    img:'assets/cutouts/glasses.png?v=1',
    sizes:['OS'],
    desc:'Slim oval frame with blacked-out lenses. The finishing accessory of the WAX lifestyle.' },
  { id:'boots', name:'WAX LOVE Boots', cat:'footwear', price:1180,
    img:'assets/cutouts/boots.png?v=1',
    sizes:['39','40','41','42','43','44','45'],
    desc:'Padded high-gloss WAX boots with debossed LOVE cuff and a heavy lugged sole. Sculptural rounded toe — the foundation of the head-to-toe WAX walk.' },
  { id:'hoodie', name:'WAX Zip Hoodie', cat:'outerwear', price:1340,
    img:'assets/cutouts/hoodie.png?v=1',
    sizes:['XS','S','M','L','XL'],
    desc:'Oversized full-zip hoodie in high-gloss WAX. Lined hood, kangaroo pockets, ribbed cuffs and hem. Heavyweight brutalist drape — everyday armour for the house.' },
  { id:'scarf', name:'WAX Heart Headscarf', cat:'accessories', price:720,
    img:'assets/cutouts/scarf.png?v=1',
    sizes:['OS'],
    desc:'Triangular WAX headscarf with an all-over tonal embossed heart motif and knotted tails. Tied babushka-style — the softest expression of the chrome-heart DNA.' },
];

const money = n => '$' + n.toLocaleString('en-US');
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ░ state ░ */
let cart = JSON.parse(localStorage.getItem('elx_cart') || '[]');
const save = () => localStorage.setItem('elx_cart', JSON.stringify(cart));

/* ░ render grid ░ */
const grid = $('#grid');
function renderGrid(cat='all'){
  const list = cat==='all' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===cat);
  grid.innerHTML = list.map((p,i)=>`
    <article class="card" data-id="${p.id}">
      <span class="card__no">${String(PRODUCTS.indexOf(p)+1).padStart(2,'0')}</span>
      <div class="card__media"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <button class="card__add" data-add="${p.id}">QUICK ADD +</button>
      <div class="card__foot">
        <div><div class="card__name">${p.name}</div><div class="card__cat">${p.cat.toUpperCase()}</div></div>
        <div class="card__price">${money(p.price)}</div>
      </div>
    </article>`).join('');
}
renderGrid();

/* ░ filters (optional — only if present) ░ */
const _filter=$('#filter');
if(_filter) _filter.addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  $$('#filter button').forEach(x=>x.classList.remove('is-on'));
  b.classList.add('is-on'); renderGrid(b.dataset.cat);
});

/* ░ grid clicks ░ */
grid.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){ e.stopPropagation();
    const p=PRODUCTS.find(x=>x.id===add.dataset.add);
    addToCart(p, p.sizes[Math.floor(p.sizes.length/2)]); pulseAdd(add); return; }
  const card=e.target.closest('.card'); if(card) openPDP(card.dataset.id);
});
function pulseAdd(btn){ const t=btn.textContent; btn.textContent='ADDED ✓';
  setTimeout(()=>btn.textContent=t,1100); openCart(); }

/* ░ PDP ░ */
let pdpProduct=null, pdpSize=null;
function openPDP(id){
  const p=PRODUCTS.find(x=>x.id===id); if(!p)return; pdpProduct=p; pdpSize=null;
  $('#pdpImg').src=p.img; $('#pdpImg').alt=p.name;
  $('#pdpCat').textContent=p.cat.toUpperCase();
  $('#pdpName').textContent=p.name;
  $('#pdpPrice').textContent=money(p.price);
  $('#pdpDesc').textContent=p.desc;
  $('#pdpSizes').innerHTML=p.sizes.map(s=>`<button data-size="${s}">${s}</button>`).join('');
  $('#pdpAdd').textContent='ADD TO CART';
  show('#pdp');
}
$('#pdpSizes').addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b)return;
  $$('#pdpSizes button').forEach(x=>x.classList.remove('is-on'));
  b.classList.add('is-on'); pdpSize=b.dataset.size;
});
$('#pdpAdd').addEventListener('click',()=>{
  if(!pdpSize){ const f=$('#pdpSizes button'); $('#pdpSizes').animate(
     [{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'none'}],{duration:240}); return; }
  addToCart(pdpProduct,pdpSize);
  const a=$('#pdpAdd'); a.textContent='ADDED ✓'; a.classList.add('flash');
  setTimeout(()=>{a.classList.remove('flash'); hide('#pdp'); openCart();},650);
});

/* ░ cart ops ░ */
function addToCart(p,size){
  const key=p.id+'|'+size;
  const ex=cart.find(i=>i.key===key);
  if(ex) ex.qty++; else cart.push({key,id:p.id,name:p.name,price:p.price,img:p.img,size,qty:1});
  save(); renderCart();
}
function changeQty(key,d){
  const it=cart.find(i=>i.key===key); if(!it)return;
  it.qty+=d; if(it.qty<=0) cart=cart.filter(i=>i.key!==key);
  save(); renderCart();
}
function removeItem(key){ cart=cart.filter(i=>i.key!==key); save(); renderCart(); }
const subtotal = () => cart.reduce((s,i)=>s+i.price*i.qty,0);
const count = () => cart.reduce((s,i)=>s+i.qty,0);

function renderCart(){
  $('#cartCt').textContent=`(${count()})`;
  const box=$('#cartItems');
  if(!cart.length){ box.innerHTML='<p class="cart__empty">YOUR BAG IS EMPTY</p>';
    $('#checkoutBtn').disabled=true; }
  else{
    box.innerHTML=cart.map(i=>`
      <div class="ci">
        <div class="ci__img"><img src="${i.img}" alt="${i.name}"></div>
        <div>
          <div class="ci__name">${i.name}</div>
          <div class="ci__size">SIZE ${i.size}</div>
          <div class="ci__qty">
            <button data-q="-" data-k="${i.key}">−</button>
            <span>${i.qty}</span>
            <button data-q="+" data-k="${i.key}">+</button>
          </div>
        </div>
        <div class="ci__r">
          <div class="ci__price">${money(i.price*i.qty)}</div>
          <button class="ci__rm" data-rm="${i.key}">REMOVE</button>
        </div>
      </div>`).join('');
    $('#checkoutBtn').disabled=false;
  }
  $('#cartTotal').textContent=money(subtotal());
}
$('#cartItems').addEventListener('click',e=>{
  const q=e.target.closest('[data-q]'); if(q){ changeQty(q.dataset.k, q.dataset.q==='+'?1:-1); return; }
  const rm=e.target.closest('[data-rm]'); if(rm) removeItem(rm.dataset.rm);
});
renderCart();

/* ░ overlay helpers ░ */
function show(sel){ $(sel).setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function hide(sel){ $(sel).setAttribute('aria-hidden','true');
  if(!$$('.pdp,.cart,.co,.done').some(o=>o.getAttribute('aria-hidden')==='false')) document.body.style.overflow=''; }
function openCart(){ show('#cart'); }
$('#cartBtn').addEventListener('click',openCart);
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>{
  const o=b.closest('.pdp,.cart,.co,.done'); hide('#'+o.id);
}));
document.addEventListener('keydown',e=>{ if(e.key==='Escape')
  $$('.pdp,.cart,.co,.done').forEach(o=>o.getAttribute('aria-hidden')==='false'&&hide('#'+o.id)); });

/* ░ checkout ░ */
$('#checkoutBtn').addEventListener('click',()=>{
  if(!cart.length)return; hide('#cart');
  const sub=subtotal(), tot=sub+45;
  $('#coItems').innerHTML=cart.map(i=>`
    <div class="coi"><img src="${i.img}" alt=""><div class="coi__n">${i.name}<small>SIZE ${i.size} · QTY ${i.qty}</small></div><div class="coi__p">${money(i.price*i.qty)}</div></div>`).join('');
  $('#coSub').textContent=money(sub);
  $('#coTot').textContent=money(tot);
  $('#coPayAmt').textContent='· '+money(tot);
  show('#co');
});
/* light input niceties */
$('[name="card"]').addEventListener('input',e=>{
  e.target.value=e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
});
$('[name="exp"]').addEventListener('input',e=>{
  let v=e.target.value.replace(/\D/g,'').slice(0,4);
  e.target.value=v.length>2?v.slice(0,2)+' / '+v.slice(2):v;
});
$('#coForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!$('#coForm').reportValidity())return;
  const pay=$('#coPay'); pay.disabled=true; pay.textContent='PROCESSING…';
  setTimeout(()=>{
    const tot=subtotal()+45;
    const order='ELX-'+Math.floor(100000+Math.random()*900000);
    $('#doneMsg').textContent=`ORDER ${order} · ${money(tot)}`;
    hide('#co'); show('#done');
    cart=[]; save(); renderCart();
    pay.disabled=false; pay.innerHTML='PAY <span id="coPayAmt"></span>';
  },1400);
});

/* ░ nav scroll ░ */
const nav=$('#nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});

/* ░ theme toggle: white / black ░ */
(function(){
  const tog=$('#themeTog'), lbl=$('#themeLbl');
  const apply=mode=>{
    document.body.classList.toggle('light', mode==='light');
    if(lbl) lbl.textContent = mode==='light' ? 'BLACK' : 'WHITE';
  };
  apply(localStorage.getItem('elx_theme')||'light');
  tog && tog.addEventListener('click',()=>{
    const next=document.body.classList.contains('light')?'dark':'light';
    localStorage.setItem('elx_theme',next); apply(next);
  });
})();

/* ░ splash: video intro → ENTER SHOP → floating clothes ░ */
(function(){
  const splash=$('#splash'), enter=$('#enterShop'), vid=$('#splashVid');
  if(!splash) return;
  document.body.classList.add('splash-open');
  function go(){
    splash.classList.add('hide');
    document.body.classList.remove('splash-open');
    setTimeout(()=>{ splash.style.display='none'; if(vid){try{vid.pause()}catch(e){}} },820);
    const shop=$('#shop'); if(shop) shop.scrollIntoView({behavior:'smooth'});
  }
  enter && enter.addEventListener('click',go);
})();

/* ░ splash: pick portrait (mobile) vs landscape (desktop) video ░ */
(function(){
  const v=document.getElementById('splashVid'); if(!v) return;
  const pick=()=> (window.matchMedia('(min-width:768px)').matches ? v.dataset.desktop : v.dataset.mobile);
  const want=pick();
  if(want && v.getAttribute('src')!==want){ v.setAttribute('src',want); v.load();
    const p=v.play&&v.play(); if(p&&p.catch)p.catch(()=>{}); }
})();

/* ░ coming-soon waitlist capture (Formspree + safe fallback) ░ */
(function(){
  const CFG = window.ELX_CONFIG || {};
  const FORMSPREE_ID = CFG.FORMSPREE_ID || "YOUR_FORM_ID";
  const form=$('#signup'), msg=$('#signupMsg'), btn=$('#signupBtn');
  if(!form) return;
  const setMsg=(t,cls)=>{ msg.textContent=t; msg.className='signup__msg show-thanks '+(cls||''); };
  function celebrate(){
    form.classList.add('sent');
    setMsg("YOU'RE ON THE LIST 🖤  WATCH YOUR INBOX.", 'ok');
  }
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const name=$('#signupName').value.trim(), email=$('#signupEmail').value.trim(), phone=$('#signupPhone').value.trim();
    if(!email || !email.includes('@')){ setMsg('ENTER A VALID EMAIL.', 'err'); return; }
    if(!name){ setMsg('ADD YOUR NAME.', 'err'); return; }
    btn.disabled=true; const label=btn.textContent; btn.textContent='SENDING…';
    // always keep a local copy so a signup is never lost
    try{ const k='elx_waitlist'; const l=JSON.parse(localStorage.getItem(k)||'[]');
      l.push({name,email,phone,t:new Date().toISOString()}); localStorage.setItem(k,JSON.stringify(l)); }catch(_){}
    // central DB: insert into Supabase if configured
    if(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY){
      try{
        await fetch(CFG.SUPABASE_URL.replace(/\/$/,'')+'/rest/v1/waitlist',{
          method:'POST',
          headers:{'apikey':CFG.SUPABASE_ANON_KEY,'Authorization':'Bearer '+CFG.SUPABASE_ANON_KEY,
                   'Content-Type':'application/json','Prefer':'return=minimal'},
          body:JSON.stringify({name,email,phone})});
      }catch(_){}
    }
    // optional email-on-signup via Formspree
    try{
      if(FORMSPREE_ID && FORMSPREE_ID!=="YOUR_FORM_ID"){
        const r=await fetch('https://formspree.io/f/'+FORMSPREE_ID,{
          method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form)});
        if(!r.ok) throw new Error('formspree');
      }
    }catch(_){}
    celebrate();
    btn.disabled=false; btn.textContent=label;
  });
})();

/* ░ site password gate ░ */
(function(){
  const CFG=window.ELX_CONFIG||{};
  const gate=$('#sitegate'), form=$('#sitegateForm'), inp=$('#sitePass'), err=$('#siteErr');
  if(!gate||!form) return;
  // if no passcode or already unlocked → make sure gate is gone
  if(!CFG.SITE_PASSCODE || sessionStorage.getItem('elx_site')==='1'){
    document.documentElement.classList.remove('locked'); return;
  }
  setTimeout(()=>{ try{ inp.focus(); }catch(_){} },100);
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if((inp.value||'').trim().toLowerCase()===String(CFG.SITE_PASSCODE).toLowerCase()){
      sessionStorage.setItem('elx_site','1');
      gate.classList.add('out');
      document.documentElement.classList.remove('locked');
      setTimeout(()=>{ gate.style.display='none'; },720);
    }else{
      err.textContent='WRONG PASSWORD.'; err.className='signup__msg err show-thanks';
      inp.value=''; inp.focus();
    }
  });
})();
