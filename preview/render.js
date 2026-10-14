// Renders the Course tab for the scenes in preview/scenes.json and writes PNGs to preview/out/
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{
  const scenes=JSON.parse(fs.readFileSync('preview/scenes.json','utf8')); fs.mkdirSync('preview/out',{recursive:true});
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,timezoneId:'Europe/Istanbul',locale:'en-GB'});
  p.on('console',m=>{ if(m.type()==='warning'||m.type()==='error') console.log('PAGE:',m.text().slice(0,200)); });
  for(const sc of scenes){ try {
    await p.goto('http://localhost:8765/index.html');
    await p.evaluate(s=>localStorage.setItem('caddie-state', JSON.stringify(Object.assign({seven:120,level:"new",mode:"carry",overrides:{},log:[],flags:{},shots:[],osmHoles:{},api:{},round:{}}, s.state))), sc);
    await p.reload(); await p.click(`nav button[data-tab="${sc.tab||'gps'}"]`); await p.waitForTimeout(500);
    if(sc.setup){ await p.evaluate(code=>{ eval(code); }, sc.setup); await p.waitForTimeout(500); }
    if(sc.tab&&sc.tab!=='gps'){ await p.waitForTimeout(sc.wait||1000); await p.locator(sc.selector||'body').screenshot({path:`preview/out/${sc.name}.png`}); console.log('rendered', sc.name); continue; }
    if(sc.style) await p.evaluate(s=>{ state.hvStyle=s; }, sc.style);
    if(sc.at){ await p.evaluate(f=>{ const pts=apiHolePts(); const g=pts.find(p=>p.poi===1&&p.loc===2); const t=pts.find(p=>p.poi===11)||pts.find(p=>p.poi===12); onFix({coords:{latitude:t.lat+(g.lat-t.lat)*f,longitude:t.lng+(g.lng-t.lng)*f,accuracy:5}}); }, sc.at); }
    await p.evaluate(()=>renderHoleView()); await p.waitForTimeout(sc.wait||6000); // let satellite tiles load
    await p.locator(sc.full?'body':'#holeView').screenshot({path:`preview/out/${sc.name}.png`});
    console.log('rendered', sc.name, 'imagery=', await p.evaluate(()=>(state.imagery||'google')+(googleFailed?'(FAILED)':'')));
  } catch(e){ console.log('FAILED', sc.name, e.message.slice(0,200)); } }
  await b.close();
})();
