
(function(){
  const cfg = window.GAME_CONFIG;
  const titleEl = document.getElementById('gameTitle');
  titleEl.textContent = cfg.title;
  const openSeaBtn = document.getElementById('openseaBtn');
  openSeaBtn.href = cfg.openseaCollectionUrl;
  openSeaBtn.textContent = "View on OpenSea";

  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const playBtn = document.getElementById('playBtn');
  const itemsPanel = document.getElementById('itemsPanel');

  // Simple game state
  let running = false;
  let score = 0;
  let stars = [];
  let lastSpawn = 0;
  let skin = { hat:false, glasses:false, wand:false };

  // Load item images
  const images = {};
  function loadImage(src){
    return new Promise((resolve)=>{
      const img = new Image();
      img.onload = ()=>resolve(img);
      img.src = src;
    });
  }

  Promise.all(cfg.items.map(i=>loadImage(i.image))).then(imgs=>{
    cfg.items.forEach((it, idx)=> images[it.id] = imgs[idx]);
    renderItemsPanel();
    draw();
  });

  function renderItemsPanel(){
    itemsPanel.innerHTML = "";
    cfg.items.forEach((it)=>{
      const card = document.createElement('div');
      card.className = 'card';
      const img = document.createElement('img');
      img.src = it.image;
      const box = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = it.name;
      const desc = document.createElement('div');
      desc.className = 'small';
      desc.textContent = it.description;

      const actions = document.createElement('div');
      actions.style.marginLeft = 'auto';
      const equip = document.createElement('button');
      equip.className = 'btn primary';
      equip.textContent = 'Equip';
      equip.onclick = ()=> {
        skin[it.id] = !skin[it.id];
        equip.textContent = skin[it.id] ? 'Unequip' : 'Equip';
      };
      const buy = document.createElement('a');
      buy.className = 'btn secondary';
      buy.textContent = 'Buy NFT';
      buy.target = '_blank';
      buy.rel = 'noopener';
      // If you mint each as separate item in your collection, use a search link or item slug:
      buy.href = cfg.openseaCollectionUrl ? cfg.openseaCollectionUrl : 'https://opensea.io';
      actions.appendChild(equip);
      actions.appendChild(buy);

      card.appendChild(img);
      box.appendChild(name);
      box.appendChild(desc);
      card.appendChild(box);
      card.appendChild(actions);
      itemsPanel.appendChild(card);
    });
  }

  // Game loop
  function spawnStar(){
    const x = Math.random() * (canvas.width-40) + 20;
    const y = Math.random() * (canvas.height-200) + 60;
    const speed = 0.4 + Math.random()*0.8;
    stars.push({x,y,r:18,vy:speed,hit:false});
  }

  function drawBackground(){
    // sky
    ctx.fillStyle = '#e6f0ff';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    // ground
    ctx.fillStyle = '#fff6cc';
    ctx.fillRect(0,canvas.height-80,canvas.width,80);
    // friendly hero
    const cx = canvas.width/2;
    const cy = canvas.height-100;
    ctx.fillStyle = '#ffd966';
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI*2);
    ctx.fill();
    // eyes
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(cx-10, cy-5, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+10, cy-5, 4, 0, Math.PI*2); ctx.fill();
    // smile
    ctx.beginPath(); ctx.arc(cx, cy+5, 12, 0, Math.PI); ctx.stroke();

    // draw equipped items
    if(skin.hat && images.hat){
      ctx.drawImage(images.hat, cx-35, cy-70, 70, 50);
    }
    if(skin.glasses && images.glasses){
      ctx.drawImage(images.glasses, cx-35, cy-25, 70, 35);
    }
    if(skin.wand && images.wand){
      ctx.drawImage(images.wand, cx+25, cy-10, 40, 60);
    }

    // score
    ctx.fillStyle = '#333';
    ctx.font = '20px system-ui';
    ctx.fillText('Score: ' + score, 20, 30);
  }

  function drawStars(){
    ctx.fillStyle = '#ffcc00';
    stars.forEach(s=>{
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    });
  }

  function update(dt){
    if(!running) return;
    lastSpawn += dt;
    if(lastSpawn > 700){
      spawnStar();
      lastSpawn = 0;
    }
    stars.forEach(s=> s.y += s.vy * (dt/16));
    stars = stars.filter(s => s.y < canvas.height-80);
  }

  let last = performance.now();
  function loop(now){
    const dt = now - last; last = now;
    update(dt);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBackground();
    drawStars();
    requestAnimationFrame(loop);
  }

  function draw(){
    requestAnimationFrame(loop);
  }

  canvas.addEventListener('click', (e)=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for(let i=stars.length-1;i>=0;i--){
      const s = stars[i];
      const dx = x - s.x, dy = y - s.y;
      if(Math.sqrt(dx*dx+dy*dy) <= s.r){
        stars.splice(i,1);
        score += 1;
        break;
      }
    }
  });

  playBtn.addEventListener('click', ()=>{
    running = !running;
    playBtn.textContent = running ? 'Pause' : 'Play';
  });
})();
