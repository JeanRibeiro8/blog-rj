
/* ============================================================
   CONFIGURAÇÃO — edite aqui para personalizar o site
   ============================================================ */

   // Music
   (function musicPlayer(){
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  let playing = false;
  btn.addEventListener('click', ()=>{
    if(playing){
      audio.pause();
      btn.textContent = '🎵';
      btn.classList.remove('playing');
    } else {
      audio.play().catch(()=>{});
      btn.textContent = '⏸';
      btn.classList.add('playing');
    }
    playing = !playing;
  });
})();

// Data de início do relacionamento (ajuste o ANO correto)
const START_DATE = new Date(2026, 1, 14); // mês 1 = fevereiro (0-indexado)

// Fotos do álbum. Troque `src: null` por uma URL ou base64 da foto real.
const TIMELINE = [
  { date: "26 de Outubro 2025", caption: "O dia em que tudo começou.", src: "./images/1.jpg" },
  { date: "Janeiro 2026", caption: "Primeira vez que voce veio em casa 🥰", src: "./images/2.jpg" },
  { date: "Caminhada no Parque", caption: "😎🏞", src: "./images/3.jpg" },
  { date: "Hoje", caption: "E a história continua.", src: "./images/4.jpg" },
];

// Capítulos do conto ilustrado — "A Guardiã do Vale de Cinza"
const STORY = [
  { title: "A fuga", text: "Rebeca nasceu para ser rainha de Álvora, mas cresceu ouvindo que seu lugar era ao lado de um trono, nunca sobre ele. Rebelde desde cedo, aprendeu escondida a manejar a espada com um velho guarda que jurou nunca contar ao rei. Prometida a um duque que nunca vira seu rosto, recusou-se a aceitar um destino escolhido por outros: na noite antes do casamento, vestiu as roupas de treino e partiu do castelo sem olhar para trás.", img: "images/ch0.png" },
  { title: "O Vale de Cinza", text: "Levou meses até encontrar um lugar que os mapas do reino sequer ousavam desenhar direito, escondido por uma névoa que confundia quem se aproximava com más intenções. Ali, entre ruínas de um templo antigo, restavam os vestígios de uma ordem que séculos atrás jurara proteger aquelas terras. Não havia mais ninguém para cumprir aquele juramento — então a rebelde Rebeca o fez seu.", img: "images/ch-1.png" },
  { title: "Tornando-se guardiã", text: "Ela aprendeu a ler os ventos do vale e as trilhas que os cervos deixavam entre as árvores. E aprendeu, com o tempo, a odiar tudo que vinha de fora — porque tudo que viera de fora até então só tentara decidir por ela. Pretendentes, soldados enviados para \"resgatá-la\": todos encontraram a mesma resposta rebelde, na ponta de uma lâmina.", img: "images/ch-2.png" },
  { title: "Passos na névoa", text: "Foi assim, depois de estações inteiras sozinha, que Rebeca ouviu cascos de cavalo atravessando a bruma — e não pensou duas vezes antes de pegar a espada.", img: "images/ch-3.png" },
  { title: "O encontro nas brumas", text: "Rebeca não perguntou o nome dele. Atacou primeiro. Sua fúria não vinha de treino, mas de tudo que ela jurara proteger sozinha — e Jean, o guerreiro mais forte de sua Ordem, só se defendia, absorvendo cada golpe, sem nunca revidar para ferir.", img: "images/ch1-luta.jpg" },
  { title: "O desarme", text: "\"Você luta como quem odeia guerra\", ela disse, ofegante, quando a espada dele prendeu a dela contra uma raiz. \"E você luta como quem só conhece guerra\", ele respondeu — soltando a lâmina no chão, sem se aproximar mais do que o necessário.", img: "images/ch2-desarme.jpg" },
  { title: "A confiança que cresce", text: "Jean não tentou mudá-la, nem convencê-la a voltar. Sentava-se longe, deixava que ela se aproximasse em seu próprio tempo. Aos poucos, Rebeca começou a mostrar-lhe o vale — não como quem guia um visitante, mas como quem finalmente confia em alguém.", img: "images/ch3-vale.jpg" },
  { title: "O retorno sem armadura", text: "Voltou meses depois, sem armadura e sem espada — só para ver se a névoa ainda estava lá. Estava. E Rebeca, ao vê-lo atravessar a bruma desarmado, entendeu: ele não tinha voltado para vigiá-la. Tinha voltado porque escolhera ficar.", img: "images/ch4-retorno.jpg" },
];

// Motivos que aparecem no botão "outro motivo"
const REASONS = [
  "Porque seu sorriso consegue mudar meu humor e o meu dia inteiro.",
  "Porque você gosta de mim sabendo exatamente quem eu sou — e fica mesmo assim.",
  "Porque com você, até o silêncio é bom.",
  "Porque você é o meu lugar favorito.",
  "Porque seu jeitinho baixinha do meu lado é exatamente do tamanho que eu mais gosto de abraçar.",
  "Porque cada dia ao seu lado parece o primeiro.",
];

// Cartas por humor/momento
const LETTERS = [
  { icon:"🌧️", label:"quando estiver triste", text:"Se você está lendo isso, é porque o dia não está fácil. Respira. Eu estou com você, mesmo de longe. Você é mais forte do que imagina.", img:"images/tri.jpg" },
  { icon:"💭", label:"quando sentir saudade", text:"A saudade só existe porque o que a gente vive é bom demais para caber só na memória. Já estou pensando em você.", img:"images/sdd.jpg" },
  { icon:"🏆", label:"quando estiver orgulhosa de si", text:"Guarda esse orgulho, ele é bem merecido. Eu vejo o quanto você se esforça, e tenho um orgulho enorme de você.", img:"images/or.jpg" },
  { icon:"😴", label:"antes de dormir", text:"Durma bem Amor. Amanhã a gente continua essa história. Te amo, fica com Deus 😘.", img:"images/dom.jpg" },
];

// Datas especiais
const DATES = [
  { d: "14 FEV", t: "Aniversário de namoro" },
];

/* ============================================================
   FIM DA CONFIGURAÇÃO
   ============================================================ */

// ---------- storage helper (fallback seguro caso indisponível) ----------
async function storageGet(key){
  try{ const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; }
  catch(e){ return null; }
}
async function storageSet(key, value){
  try{ await window.storage.set(key, JSON.stringify(value)); }catch(e){}
}

// ---------- floating hearts background ----------
(function heartsBg(){
  const wrap = document.getElementById('heartsBg');
  const glyphs = ['♥','❤','💗'];
  for(let i=0;i<14;i++){
    const el = document.createElement('div');
    el.className='heart';
    el.textContent = glyphs[i % glyphs.length];
    el.style.left = Math.random()*100+'vw';
    el.style.fontSize = (12+Math.random()*22)+'px';
    el.style.animationDuration = (10+Math.random()*14)+'s';
    el.style.animationDelay = (Math.random()*10)+'s';
    wrap.appendChild(el);
  }
})();

// ---------- live counter ----------
function updateCounter(){
  const now = new Date();
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  if(days < 0){
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if(months < 0){ years -= 1; months += 12; }
  document.getElementById('cAnos').textContent = years;
  document.getElementById('cMeses').textContent = months;
  document.getElementById('cDias').textContent = days;
}
updateCounter();
setInterval(updateCounter, 1000*60*60);

// ---------- timeline ----------
const tlList = document.getElementById('timelineList');
TIMELINE.forEach(item=>{
  const div = document.createElement('div');
  div.className='tl-item';
  div.innerHTML = `
    <div class="tl-photo">${item.src ? `<img src="${item.src}" alt="">` : '📷'}</div>
    <div class="tl-date">${item.date}</div>
    <div class="tl-caption serif">${item.caption}</div>`;
  tlList.appendChild(div);
});

// ---------- story chapters ----------
const storyList = document.getElementById('storyList');
STORY.forEach((ch,i)=>{
  const div = document.createElement('div');
  div.className='chapter';
  div.innerHTML = `
    <div class="chapter-img">${ch.img ? `<img src="${ch.img}" alt="">` : `capítulo ${i+1}`}</div>
    <div class="chapter-body">
      <div class="ch-num">capítulo ${i+1}</div>
      <h3>${ch.title}</h3>
      <p>${ch.text}</p>
    </div>`;
  storyList.appendChild(div);
});

// ---------- reasons ----------
const reasonText = document.getElementById('reasonText');
document.getElementById('reasonBtn').addEventListener('click', ()=>{
  const r = REASONS[Math.floor(Math.random()*REASONS.length)];
  reasonText.textContent = r;
});

// ---------- letters ----------
const lettersGrid = document.getElementById('lettersGrid');
LETTERS.forEach(l=>{
  const card = document.createElement('div');
  card.className='letter-card';
  card.innerHTML = `<div class="icon">${l.icon}</div><div class="label serif">${l.label}</div>`;
card.addEventListener('click', ()=> openModal(l.img, l.text));
  lettersGrid.appendChild(card);
});

// ---------- dates ----------
const datesList = document.getElementById('datesList');
DATES.forEach(d=>{
  const div = document.createElement('div');
  div.className='date-item';
  div.innerHTML = `<div class="d">${d.d}</div><div class="t serif">${d.t}</div>`;
  datesList.appendChild(div);
});

// ---------- modal ----------
const modalOverlay = document.getElementById('modalOverlay');
const modalPhoto = document.getElementById('modalPhoto');
const modalText = document.getElementById('modalText');
function openModal(src, text){
  modalPhoto.innerHTML = src ? `<img src="${src}" alt="">` : '💗';
  modalText.textContent = text;
  modalOverlay.classList.add('open');
}
document.getElementById('modalClose').addEventListener('click', ()=> modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', (e)=>{ if(e.target===modalOverlay) modalOverlay.classList.remove('open'); });

/* ============================================================
   JOGO — 3 fases, plataforma estilo Mario, com inimigos e parkour
   ============================================================ */
const GAME_PHOTOS = [
  { caption:    "Encontrado! Rosas para uma rosa💗💗.", src: "images/c1.jpg" },
  { caption: "Encontrado! Primeira vez em casa", src: "images/c2.mp4" },
  { caption: "Encontrado! Penteando os Cachinhos 😍.", src: "images/c3.jpg" },
  { caption: "Encontrado! Você sorrindo do jeito que eu mais gosto.", src: "images/c4.jpg" },
  { caption: "Encontrado! Dirigindo o Carro 🙈", src: "images/c5.jpg" },
  { caption: "Encontrado! Primeira cartinha.", src: "images/c6.jpg" },
  { caption: "Encontrado! 😃", src: "images/c7.jpg" },
  { caption: "Encontrado! Nos meus braços fortes 🙈.", src: "images/c8.jpg" },
  { caption: "Encontrado! Andando na cidade", src: "images/c9.jpg" },
  { caption: "Encontrado! Manha no Parque.", src: "images/c10.jpg" },
  { caption: "Encontrado! A melhor foto kkkkkkk.", src: "images/c11.jpg" },
  { caption: "Encontrado! Aquele dia no parque.", src: "images/c12.jpg"},
];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const GRAVITY = 0.62;

// ---------- definição das 3 fases ----------
// pits: buracos mortais (sem chão) — cair reinicia a fase
// enemies: patrulham entre patrolMin/patrolMax; tocar tira uma vida
const LEVELS = [
  { // Fase 1 — introdução, chão quase contínuo, poucos inimigos
    name: "O Bosque de Entrada",
    intro: "Atravesse o bosque e colete os corações. Cuidado com os espinhos que patrulham o caminho.",
    groundGaps: [],
    platforms: [
      {x:150, y:270, w:120, h:18},
      {x:340, y:220, w:120, h:18},
      {x:520, y:270, w:120, h:18},
      {x:680, y:180, w:100, h:18},
      {x:60, y:180, w:100, h:18},
    ],
    coins: [
      {x:190, y:235, photoIdx:0},
      {x:390, y:185, photoIdx:1},
      {x:560, y:235, photoIdx:2},
      {x:715, y:145, photoIdx:3},
    ],
    enemies: [
      {x:260, y:H-40-22, w:22, h:22, patrolMin:230, patrolMax:420, speed:1.6, dir:1},
    ],
  },
  { // Fase 2 — parkour com buracos no chão
    name: "A Ravina de Pedra",
    intro: "O chão está quebrado. Salte com cuidado entre as plataformas — e não caia nos buracos.",
    groundGaps: [ {x:180, w:90}, {x:420, w:90}, {x:640, w:90} ],
    platforms: [
      {x:80, y:290, w:90, h:16},
      {x:220, y:240, w:90, h:16},
      {x:340, y:190, w:90, h:16},
      {x:470, y:240, w:90, h:16},
      {x:590, y:290, w:90, h:16},
      {x:700, y:200, w:90, h:16},
    ],
    coins: [
  {x:265, y:205, photoIdx:4},
  {x:385, y:155, photoIdx:5},
  {x:515, y:205, photoIdx:6},
  {x:745, y:165, photoIdx:7},
],
    enemies: [
      {x:340, y:190-22, w:22, h:22, patrolMin:340, patrolMax:420, speed:1.8, dir:1},
      {x:590, y:290-22, w:22, h:22, patrolMin:590, patrolMax:670, speed:2, dir:-1},
    ],
  },
  { // Fase 3 — mais difícil, mais inimigos e saltos longos
    name: "As Ruínas do Vale",
    intro: "A fase final. Inimigos e saltos longos — respire fundo e vá com calma.",
    groundGaps: [ {x:120, w:80}, {x:320, w:100}, {x:540, w:80}, {x:700, w:70} ],
    platforms: [
      {x:60, y:300, w:70, h:16},
      {x:230, y:260, w:80, h:16},
      {x:340, y:210, w:70, h:16},
      {x:440, y:170, w:80, h:16},
      {x:540, y:230, w:70, h:16},
      {x:630, y:180, w:80, h:16},
      {x:730, y:260, w:60, h:16},
    ],
    coins: [
  {x:265, y:225, photoIdx:8},
  {x:375, y:175, photoIdx:9},
  {x:480, y:135, photoIdx:10},
  {x:670, y:145, photoIdx:11},
],
    enemies: [
      {x:230, y:260-22, w:22, h:22, patrolMin:230, patrolMax:305, speed:2, dir:1},
      {x:440, y:170-22, w:22, h:22, patrolMin:440, patrolMax:515, speed:2.2, dir:-1},
    ],
  },
];

let levelIdx = 0;
let lives = 3;
let collectedCount = 0;
let totalThisLevel = 0;
let player, platforms, coins, enemies, groundGaps, levelRunning = false;

const STORAGE_KEY = 'rj-game-progress-v2';
async function saveProgress(){
  storageSet(STORAGE_KEY, { levelIdx, cleared: levelIdx>=LEVELS.length });
}

function setupLevel(i){
  const lvl = LEVELS[i];
  player = { x:30, y:H-90, w:26, h:34, vx:0, vy:0, onGround:false, speed:3.6, jump:-11.5, facing:1 };
  platforms = [ {x:0, y:H-40, w:W, h:40}, ...lvl.platforms ];
  groundGaps = lvl.groundGaps;
  coins = lvl.coins.map(c=>({...c, r:13, got:false}));
  enemies = lvl.enemies.map(e=>({...e, startX:e.x}));
  totalThisLevel = coins.length;
  collectedCount = 0;
  document.getElementById('hudLevel').textContent = i+1;
  document.getElementById('hudTotal').textContent = totalThisLevel;
  document.getElementById('hudCoins').textContent = 0;
  document.getElementById('hudLives').textContent = '❤'.repeat(lives);
  levelRunning = true;
}

function showOverlay(title, text, btnLabel){
  levelRunning = false;
  document.getElementById('levelOverlayTitle').textContent = title;
  document.getElementById('levelOverlayText').textContent = text;
  document.getElementById('levelOverlayBtn').textContent = btnLabel;
  document.getElementById('levelOverlay').classList.remove('hidden');
}
document.getElementById('levelOverlayBtn').addEventListener('click', ()=>{
  document.getElementById('levelOverlay').classList.add('hidden');
  levelRunning = true;
});

function loseLife(){
  lives--;
  document.getElementById('hudLives').textContent = '❤'.repeat(Math.max(lives,0));
  if(lives<=0){
    lives = 3;
    showOverlay("Amor que vale a pena também dói às vezes!", "Nem todo dia vai ser fácil, mas todo dia vale a pena tentar de novo");
    resetPlayer();
  } else {
    resetPlayer();
  }
}
function resetPlayer(){
  player.x=30; player.y=H-90; player.vx=0; player.vy=0;
}

function rectsOverlap(a,b){ return a.x < b.x+b.w && a.x+a.w > b.x && a.y < b.y+b.h && a.y+a.h > b.y; }
function inGap(x, w){
  return groundGaps.some(g => x+w > g.x && x < g.x+g.w);
}

const keys = { left:false, right:false, jump:false };
window.addEventListener('keydown', e=>{
  if(e.key==='ArrowLeft') keys.left=true;
  if(e.key==='ArrowRight') keys.right=true;
  if(e.key===' '||e.key==='ArrowUp') keys.jump=true;
});
window.addEventListener('keyup', e=>{
  if(e.key==='ArrowLeft') keys.left=false;
  if(e.key==='ArrowRight') keys.right=false;
  if(e.key===' '||e.key==='ArrowUp') keys.jump=false;
});
function bindHold(id, prop){
  const el = document.getElementById(id);
  const on = (e)=>{ e.preventDefault(); keys[prop]=true; };
  const off = (e)=>{ e.preventDefault(); keys[prop]=false; };
  el.addEventListener('touchstart', on); el.addEventListener('touchend', off);
  el.addEventListener('mousedown', on); el.addEventListener('mouseup', off);
  el.addEventListener('mouseleave', off);
}
bindHold('btnLeft','left'); bindHold('btnRight','right'); bindHold('btnJump','jump');

function update(){
  if(!levelRunning) return;

  if(keys.left){ player.vx=-player.speed; player.facing=-1; }
  else if(keys.right){ player.vx=player.speed; player.facing=1; }
  else player.vx=0;

  if(keys.jump && player.onGround){ player.vy=player.jump; player.onGround=false; }

  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  if(player.x<0) player.x=0;
  if(player.x+player.w>W) player.x=W-player.w;

  // ground / gaps: falling past H means death (fell in a gap)
  if(player.y>H+20){ loseLife(); return; }

  player.onGround=false;
  for(const p of platforms){
    // skip main ground under gaps
    if(p.y===H-40 && inGap(player.x, player.w)) continue;
    const feet = {x:player.x, y:player.y+player.h, w:player.w, h:6};
    if(player.vy>=0 && rectsOverlap(feet,p) && player.y+player.h-player.vy <= p.y+2){
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }
  }

  // enemies patrol
  for(const en of enemies){
    en.x += en.speed*en.dir;
    if(en.x < en.patrolMin){ en.x=en.patrolMin; en.dir=1; }
    if(en.x+en.w > en.patrolMax){ en.x=en.patrolMax-en.w; en.dir=-1; }
    if(rectsOverlap(player, en)){ loseLife(); return; }
  }

  // coins
  for(const c of coins){
    if(c.got) continue;
    const dx = (player.x+player.w/2) - c.x;
    const dy = (player.y+player.h/2) - c.y;
    if(Math.sqrt(dx*dx+dy*dy) < c.r+16){
      c.got = true;
      collectedCount++;
      document.getElementById('hudCoins').textContent = collectedCount;
     const photo = GAME_PHOTOS[c.photoIdx] || {caption:"Encontrado!", src:null};
      openModal(photo.src, photo.caption);
    }
  }

  if(collectedCount>=totalThisLevel){
    levelRunning=false;
    saveProgress();
    if(levelIdx < LEVELS.length-1){
      setTimeout(()=>{
        levelIdx++;
        setupLevel(levelIdx);
      }, 600);
    } else {
      setTimeout(()=>{
        showOverlay("Vale todo explorado! ✨", "Vocês encontraram todas as memórias escondidas nas 3 fases.", "Jogar novamente");
        levelIdx = 0;
      }, 600);
    }
  }
}

function draw(){
  ctx.clearRect(0,0,W,H);

  // sky/background
  ctx.fillStyle='#d7f2c5';
  ctx.beginPath();
  ctx.ellipse(120,H-30,140,60,0,0,Math.PI*2);
  ctx.ellipse(650,H-20,180,70,0,0,Math.PI*2);
  ctx.fill();

  // ground with gaps drawn as missing segments
  ctx.fillStyle='#6d2740';
  let gx=0;
  const segs=[];
  const sortedGaps=[...groundGaps].sort((a,b)=>a.x-b.x);
  sortedGaps.forEach(g=>{ segs.push({x:gx,w:g.x-gx}); gx=g.x+g.w; });
  segs.push({x:gx,w:W-gx});
  segs.forEach(s=>{ if(s.w>0) ctx.fillRect(s.x,H-40,s.w,40); });

  // platforms (excluding ground)
  ctx.fillStyle='#6d2740';
  for(const p of platforms){ if(p.y!==H-40) ctx.fillRect(p.x,p.y,p.w,p.h); }
  ctx.fillStyle='#e8607f';
  for(const p of platforms){ if(p.y!==H-40) ctx.fillRect(p.x,p.y,p.w,4); }

  // coins (hearts)
  for(const c of coins){
    if(c.got) continue;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.fillStyle = '#e8607f';
    ctx.beginPath();
    const s = c.r*0.9;
    ctx.moveTo(0, s*0.3);
    ctx.bezierCurveTo(0,-s*0.3, -s,-s*0.3, -s,s*0.1);
    ctx.bezierCurveTo(-s, s*0.6, 0, s*0.9, 0, s*1.2);
    ctx.bezierCurveTo(0, s*0.9, s, s*0.6, s, s*0.1);
    ctx.bezierCurveTo(s,-s*0.3, 0,-s*0.3, 0, s*0.3);
    ctx.fill();
    ctx.restore();
  }

  // enemies (thorn/spike look)
  ctx.fillStyle='#3a1f2b';
  for(const en of enemies){
    ctx.beginPath();
    ctx.moveTo(en.x, en.y+en.h);
    ctx.lineTo(en.x+en.w*0.2, en.y);
    ctx.lineTo(en.x+en.w*0.4, en.y+en.h);
    ctx.lineTo(en.x+en.w*0.6, en.y);
    ctx.lineTo(en.x+en.w*0.8, en.y+en.h);
    ctx.lineTo(en.x+en.w, en.y);
    ctx.lineTo(en.x+en.w, en.y+en.h);
    ctx.closePath();
    ctx.fill();
  }

  // player
  ctx.fillStyle='#c9a13b';
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle='#3a1f2b';
  const eyeX = player.facing>0 ? player.x+player.w-8 : player.x+4;
  ctx.fillRect(eyeX, player.y+8, 4,4);
}

function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}

(async function init(){
  const saved = await storageGet(STORAGE_KEY);
  if(saved && typeof saved.levelIdx === 'number' && !saved.cleared){
    levelIdx = Math.min(saved.levelIdx, LEVELS.length-1);
  }
  setupLevel(levelIdx);
  loop();
})();