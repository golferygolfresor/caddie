// Runs trace.html for every bundled course on the GitHub runner (real internet, Google tiles) and saves raw JSON to preview/out/
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{
  const ids=Object.keys(JSON.parse(fs.readFileSync('courses.js','utf8').replace(/^[^{]*/,'').replace(/;\s*$/,'')));
  fs.mkdirSync('preview/out',{recursive:true});
  const src=process.env.TRACE_SRC||'google', z=process.env.TRACE_Z||'19';
  const b=await chromium.launch({args:['--disable-web-security']});
  for(const id of ids){
    const p=await b.newPage(); const t0=Date.now();
    p.on('console',m=>{ if(m.type()==='error') console.log('PAGE:',m.text().slice(0,160)); });
    try{
      await p.goto(`http://localhost:8765/trace.html?course=${id}&src=${src}&z=${z}`);
      await p.waitForFunction(()=>window.DONE===true,null,{timeout:900000,polling:2000});
      const r=await p.evaluate(()=>window.RESULT);
      fs.writeFileSync(`preview/out/traced-${id}.json`, JSON.stringify(r));
      await p.evaluate(()=>{ const c=document.getElementById('c'); c.style.width='900px'; c.style.height='900px'; }); await p.locator('#c').screenshot({path:`preview/out/canvas-${id}.png`});
      const hs=Object.values(r.holes); console.log('traced',id,r.src,'holes',hs.length,'f',hs.reduce((a,h)=>a+(h.f||[]).length,0),'b',hs.reduce((a,h)=>a+(h.b||[]).length,0),'w',hs.reduce((a,h)=>a+(h.w||[]).length,0),'g',hs.filter(h=>(h.g||[]).length).length, Math.round((Date.now()-t0)/1000)+'s');
    }catch(e){ console.log('FAILED',id,e.message.slice(0,200)); const r=await p.evaluate(()=>window.RESULT).catch(()=>null); if(r) fs.writeFileSync(`preview/out/traced-${id}.json`, JSON.stringify(r)); }
    await p.close();
  }
  await b.close();
})();
