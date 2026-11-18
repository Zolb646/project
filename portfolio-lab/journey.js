// Reuse the exhibit imagery for the illuminated panels along the camera route.
let textures;
function getTextures() {
  if (!textures) {
    textures = ['exit-room.webp','motion-studio.webp','galexora.webp','atrium.webp'].map(name => {
      const image = new Image();
      image.src = new URL('media/' + name,document.baseURI).href;
      return image;
    });
  }
  return textures;
}

// Draw the factory and city in one coordinate system so the camera can fly between them.
export function drawJourney(canvas, progress) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = canvas.clientWidth, height = canvas.clientHeight;
  const dpr = Math.min(devicePixelRatio, 1.5);
  const pixelWidth = Math.round(width*dpr), pixelHeight = Math.round(height*dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const clamp = x => Math.max(0,Math.min(1,x));
  const bend = clamp((progress-.35)/.45);
  const zEye = -5 + progress*104;
  const xEye = Math.sin(progress*Math.PI*2) * 1.2;
  const eyeHeight = 3.4 + 5.8*Math.sin(bend*Math.PI);
  const focal = Math.min(width*1.1,height*.92);
  const roll = Math.sin(bend*Math.PI)*.58;
  const sky = ctx.createLinearGradient(0,0,0,height);
  sky.addColorStop(0,'#0c1320'); sky.addColorStop(.55,'#647d92'); sky.addColorStop(1,'#171b22');
  ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
  ctx.save();
  ctx.translate(width*.56, height*(.41+.09*bend));
  ctx.rotate(roll);

  function point(x,y,z) {
    const scale = focal / Math.max(.18,z-zEye);
    return [(x-xEye)*scale,(eyeHeight-y)*scale];
  }
  function face(color, corners) {
    if (corners.every(c => c[2] < zEye+.18)) return;
    ctx.fillStyle=color;
    ctx.beginPath();
    corners.forEach(([x,y,z],i)=>{
      const [px,py]=point(x,y,z);
      if (i) ctx.lineTo(px,py); else ctx.moveTo(px,py);
    });
    ctx.closePath();ctx.fill();
  }
  function block(x,y,z,w,h,d,front,side,top) {
    const a=x-w/2,b=x+w/2,c=z+d;
    if(c<=zEye+.18)return;
    if(xEye<a)face(side,[[a,y,z],[a,y,c],[a,y+h,c],[a,y+h,z]]);
    if(xEye>b)face(side,[[b,y,z],[b,y,c],[b,y+h,c],[b,y+h,z]]);
    if(eyeHeight>y+h)face(top,[[a,y+h,z],[b,y+h,z],[b,y+h,c],[a,y+h,c]]);
    if(z>zEye+.18)face(front,[[a,y,z],[b,y,z],[b,y+h,z],[a,y+h,z]]);
  }
  function pipe(a,b,r,color) {
    if (Math.min(a[2],b[2])<=zEye+.18) return;
    const start=point(...a),end=point(...b);
    ctx.lineWidth=Math.min(width/2,Math.max(.5,r*focal/((a[2]+b[2])/2-zEye)));
    ctx.strokeStyle=color;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(...start);ctx.lineTo(...end);ctx.stroke();
  }
  function poster(image,x,y,z,w,h) {
    if(z<=zEye+.4 || !image.complete || !image.naturalWidth)return;
    const [left,top]=point(x,y+h,z);
    ctx.drawImage(image,left,top,w*focal/(z-zEye),h*focal/(z-zEye));
  }
  const art=getTextures();
  const floorZ=Math.max(-5,zEye+.19);
  face('#20242b',[[-65,-.2,floorZ],[65,-.2,floorZ],[65,-.2,119],[-65,-.2,119]]);
  // The red doorway sits at the end of the blue service alley.
  block(0,-2,104,18,14,2,'#271b20','#24151c','#5f2923');
  block(0,-.2,103.9,7,8,.1,'#ed481d','#ac2e18','#ffc475');
  block(0,0,103.8,5.8,7.2,.1,'#6d130e','#58201a','#ff7140');
  poster(art[0],-2.9,0,103.75,5.8,7.2);
  for(let n=18;n>=0;n--) {
    const z=40+n*3.35;
    if(z+3.2<=zEye+.18)continue;
    for(const dir of [-1,1]){
      const h=9+((n*13+(dir+1)*5)%9)*1.55;
      const x=dir*(6.8+(n%3)*.7);
      block(x,0,z,4,h,3.1,'#263948','#172935','#557385');
      const wall=x-dir*2.02;
      for(let col=0;col<3;col++) {
        const pz=z+.2+col*.9;
        pipe([wall,0,pz],[wall,h,pz],.045,'#5d7481');
      }
      for(let row=1;row<h;row+=1.65){
        const light=(n+Math.round(row))%5===0?'#f8bb7b':'#87b3ca';
        for(let col=0;col<3;col++){
          const pz=z+.25+col*.9;
          face((col+n)%4===0?'#364a56':light,[[wall,row,pz],[wall,row,pz+.6],[wall,row+.37,pz+.6],[wall,row+.37,pz]]);
        }
        block(x,row-.18,z-.08,3.95,.11,.2,'#536575','#3c4e59','#72828b');
      }
      if(n%3===1){
        const sx=dir*4.15;
        block(sx,3.5,z-.1,2.0,2.9,.22,'#bacddd','#5b6c77','#bec7cd');
        poster(art[1+n%3],sx-.92,3.6,z-.12,1.84,2.7);
      }
      block(dir*4.8,1.2,z+.3,.16,.22,2.4,'#e1ac80','#76b3d1','#c2e1ed');
    }
  }
  // A bright lintel separates the assembly rails from the street.
  for(const dir of [-1,1])block(dir*4.4,0,37.5,.35,8,2,'#cbdde5','#5f8098','#fff6de');
  block(0,7.8,37.5,9.1,.3,2,'#d9eff5','#7ca7bc','#fff');
  for(let n=12;n>=0;n--){
    const z=n*3;
    if(z+3<=zEye+.18)continue;
    block(0,0,z,3.2,.55,2.86,'#45525a','#242d34','#727b7f');
    for(let m=0;m<6;m++){
      const pz=z+m*.49;
      pipe([-1.55,.58,pz],[1.55,.58,pz],.075,'#889195');
    }
    for(const dir of [-1,1]){
      for(let m=0;m<3;m++){
        const px=dir*(4.1+m*.24);
        pipe([px,4.7,z],[px,4.7,z+3],.095,m===0?'#de8c4e':'#adb8bb');
      }
      if(n%2===0){
        pipe([dir*5.5,5.9,z],[0,7.5,z],.16,'#818d95');
        pipe([dir*5.5,5.4,z],[0,7.1,z],.12,'#535f68');
      }
      block(dir*1.66,0,z,.14,.72,3,'#c8ceca','#b7b7a2','#fff3c8');
      block(dir*2.4,0,z,.16,.18,3,'#fb632d','#a7371e','#ffac72');
      block(dir*3.4,0,z+.4,1.15,.9,1.5,'#292f33','#21272d','#667057');
      const sway=Math.sin(n*.9+progress*8)*.35;
      const joints=[[dir*3.4,.88,z+1.1],[dir*3.72,2.2,z+1.1],[dir*(2.6+sway),3.42,z+.8],[dir*2.07,2.6+sway,z+.6]];
      for(let j=0;j<3;j++){
        pipe(joints[j],joints[j+1],.43-j*.065,'#46515c');
        pipe(joints[j],joints[j+1],.26-j*.045,'#d3d9dc');
        pipe(joints[j],joints[j+1],.07,'#f6f5ec');
        const [jx,jy,jz]=joints[j];
        pipe([jx,jy,jz-.08],[jx+.02,jy,jz+.1],.44-j*.04,'#697680');
        pipe([jx,jy,jz-.09],[jx+.015,jy,jz-.07],.20,'#303940');
      }
      block(dir*5.6,0,z,1,6,1,'#465461','#2b343a','#88979b');
      block(dir*5.14,2,z,.12,2.8,1.1,'#b4e7f0','#a8e5e5','#e3ffff');
    }
    block(0,.56,z+.7,1.45,.28,1.0,'#36444a','#25323a',n%3===0?'#8bbd76':'#719397');
  }
  ctx.restore();
  const vignette=ctx.createRadialGradient(width*.55,height*.46,0,width*.5,height*.5,Math.max(width,height)*.76);
  vignette.addColorStop(.3,'transparent');vignette.addColorStop(1,'rgba(4,7,10,.74)');
  ctx.fillStyle=vignette;ctx.fillRect(0,0,width,height);
}

// Warp the portrait's scan lines with its own luminance, keeping the face recognizable.
export function drawScan(canvas, photo) {
  const ctx=canvas.getContext('2d');
  if(!ctx || !photo.naturalWidth)return;
  const w=320,h=400;
  canvas.width=w; canvas.height=h;
  ctx.drawImage(photo,0,0,w,h);
  const pixels=ctx.getImageData(0,0,w,h).data;
  ctx.clearRect(0,0,w,h);
  ctx.lineWidth=.72;
  for(let y=2;y<h;y+=4){
    ctx.beginPath();
    for(let x=0;x<w;x+=2){
      const i=(y*w+x)*4;
      const value=(pixels[i]*.21+pixels[i+1]*.72+pixels[i+2]*.07)/255;
      const py=y-8*value;
      if(!x)ctx.moveTo(x,py);else ctx.lineTo(x,py);
    }
    ctx.strokeStyle='rgba(173,231,218,.83)';ctx.stroke();
  }
}
