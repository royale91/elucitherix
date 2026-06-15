/* ░░░░░░░░ ELUCITHERIX — store engine ░░░░░░░░ */
const PRODUCTS = [
  { id:'puffer-jacket', name:'WAX Puffer Jacket', cat:'outerwear', price:2840,
    img:'assets/cutouts/puffer-jacket.png',
    sizes:['XS','S','M','L','XL'],
    desc:'Oversized WAX puffer. Detachable hood, massive collar, high-gloss leather-like shell. Architectural volume, drawn from NLE Choppa’s concept sketches.' },
  { id:'boot-pants', name:'WAX Ruched Boot-Pants', cat:'bottoms', price:1715,
    img:'assets/cutouts/boot-pants.png',
    sizes:['28','30','32','34','36'],
    desc:'Pant-boot hybrid in proprietary WAX. Gathered ruched detailing down the leg into an integrated boot. A silhouette no one else can build.' },
  { id:'flare-pants', name:'WAX Flare Pants', cat:'bottoms', price:1290,
    img:'assets/cutouts/flare-pants.png',
    sizes:['28','30','32','34','36'],
    desc:'Signature bootcut silhouette. High-gloss WAX with a clean five-pocket construction and precision double-needle stitching.' },
  { id:'wide-leg-shorts', name:'WAX Wide-Leg Shorts', cat:'bottoms', price:985,
    img:'assets/cutouts/wide-leg-shorts.png',
    sizes:['28','30','32','34','36'],
    desc:'Relaxed architectural fit. Pressed-crease WAX shorts with a dropped, sculptural break. Brutalist tailoring, head-to-toe ready.' },
  { id:'tank-top', name:'WAX Tank Top', cat:'tops', price:745,
    img:'assets/cutouts/tank-top.png',
    sizes:['XS','S','M','L','XL'],
    desc:'High-gloss leather-like WAX tank with subtle debossed LOVE branding and precision double-needle stitching. Rick Owens avant-garde line.' },
  { id:'gloves', name:'WAX Gloves', cat:'accessories', price:690,
    img:'assets/cutouts/gloves.png',
    sizes:['S','M','L'],
    desc:'Full-length WAX gloves with debossed LOVE. The finishing gesture of the head-to-toe WAX lifestyle.' },
  { id:'cap', name:'WAX Cap', cat:'accessories', price:615,
    img:'assets/cutouts/cap.png',
    sizes:['OS'],
    desc:'Structured WAX cap with debossed LOVE on the front panel. High-gloss, fully branded into the material.' },
  { id:'beanie', name:'WAX Beanie', cat:'accessories', price:560,
    img:'assets/cutouts/beanie.png',
    sizes:['OS'],
    desc:'Cuffed WAX beanie with debossed LOVE. Signature leather-like sheen, exclusive to ELUCITHERIX.' },
  { id:'socks', name:'WAX Socks', cat:'accessories', price:535,
    img:'assets/cutouts/socks.png',
    sizes:['OS'],
    desc:'WAX crew socks with debossed LOVE. The foundation of a complete head-to-toe WAX look.' },
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
  apply(localStorage.getItem('elx_theme')||'dark');
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
