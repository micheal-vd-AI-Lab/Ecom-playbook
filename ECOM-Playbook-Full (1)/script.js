const modules = [
  {title:"Product Research", desc:"Find products worth testing by starting with problems, customers and evidence.", lessons:[
    ["The product rule","What makes an e-commerce product interesting: problem, audience, margin and demonstrability.","Write down 3 customer problems you understand personally."],
    ["Where ideas come from","Use marketplaces, social platforms, communities, reviews and competitor stores as research sources.","Collect 10 ideas without deciding which one is the winner."],
    ["Demand signals","Separate attention from buying intent and learn what evidence is actually useful.","For your top 3 ideas, record 3 demand signals each."],
    ["Competition research","Competitors can validate demand while revealing gaps you can improve.","Create a one-page competitor comparison."],
  ]},
  {title:"Validation", desc:"Test the idea before committing serious time or money.", lessons:[
    ["The validation loop","Form a hypothesis, run a small test, measure and update your decision.","Write one sentence: 'I believe X because Y, and I'll test it by Z.'"],
    ["Offer-market fit","A strong product can still fail if the offer is unclear or aimed at the wrong person.","Describe your ideal customer and desired outcome in one paragraph."],
    ["Test budget & risk","Set a maximum test budget and define what result would make you continue or stop.","Choose a budget you can genuinely afford to lose."],
    ["Kill, improve or continue","Learn to treat weak results as information instead of forcing an idea.","Define your continue/stop criteria before your next test."],
  ]},
  {title:"Store Building", desc:"Build a storefront that answers questions and removes friction.", lessons:[
    ["Store structure","Home, product, trust, shipping, returns and contact information all have jobs.","Sketch your store's navigation on paper."],
    ["Product page anatomy","Headline, visual proof, benefits, details, objections, social proof and CTA.","Rewrite your product page into a clear section-by-section outline."],
    ["Trust & friction","Make buying feel safe: transparent policies, clear delivery expectations and useful support.","List the 5 questions a nervous buyer would ask."],
    ["Mobile-first QA","Most store experiences need to be checked on a phone, not just a laptop.","Test every major page at mobile width and note 5 fixes."],
  ]},
  {title:"Offers & Copy", desc:"Make the value obvious and give customers a reason to act.", lessons:[
    ["Sell the outcome","Features describe the product. Benefits explain why the customer should care.","Turn 5 features into customer outcomes."],
    ["Positioning","Choose who the product is for and what makes your version meaningfully different.","Write: 'For [customer], who wants [outcome], we provide [difference].'"],
    ["Pricing & bundles","Price around value and economics, then use bundles carefully to increase AOV.","Create a core offer and one sensible bundle."],
    ["Objections & proof","Answer the reasons someone might hesitate before asking them to buy.","Write 7 objections and a concise response to each."],
  ]},
  {title:"Traffic", desc:"Bring qualified attention through organic content and paid acquisition.", lessons:[
    ["Creative angles","One product can have many stories: problem, demo, transformation, comparison and proof.","Write 10 different angles for one product."],
    ["Organic content","Short-form content works best when the first seconds earn attention and the rest delivers value.","Draft 5 hooks and 5 video concepts."],
    ["Paid traffic basics","Understand campaign objective, creative, audience, budget and measurement.","Build a simple test matrix with 3 creatives and 2 angles."],
    ["Creator & UGC strategy","Authentic demonstrations can make unfamiliar products easier to understand.","Write a 20-second creator brief."],
  ]},
  {title:"Conversion", desc:"Turn visits into customers by fixing the biggest points of friction.", lessons:[
    ["Conversion rate","Conversion is a system: traffic quality, offer, page, trust, price and checkout all matter.","Calculate CVR from a sample set of sessions and orders."],
    ["Diagnosing a funnel","Use drop-offs to decide where to investigate instead of changing everything at once.","Map your funnel from click to purchase."],
    ["Checkout friction","Extra uncertainty and unnecessary steps can cost sales.","List every point where a buyer could hesitate."],
    ["Retention","The first sale can be the beginning of the relationship, not the end.","Plan one post-purchase message and one repeat-purchase offer."],
  ]},
  {title:"Numbers", desc:"Know the metrics that tell you whether the business is healthy.", lessons:[
    ["AOV & CVR","Average order value and conversion rate help explain revenue performance.","Calculate AOV for your last 10 hypothetical orders."],
    ["CAC & contribution","Customer acquisition cost only makes sense alongside your contribution margin.","Build a simple per-order economics table."],
    ["Break-even thinking","Know the maximum you can spend to acquire a customer without losing money.","Calculate your break-even CAC from your own assumptions."],
    ["Dashboard basics","A small set of consistent KPIs beats a giant dashboard nobody checks.","Choose 6 weekly metrics and define each one."],
  ]},
  {title:"Scaling", desc:"Turn a working system into repeatable growth while protecting cash and quality.", lessons:[
    ["When to scale","Scale from repeatable evidence, not one lucky day.","Write 3 conditions that must be true before increasing spend."],
    ["Creative iteration","Keep the winning concept and iterate the hook, proof, format or opening.","Create 5 variations of your best concept."],
    ["Operations & cash flow","Inventory, suppliers, fulfillment, refunds and payment timing become more important as volume rises.","Map the cash cycle from customer payment to supplier payment."],
    ["Build the machine","Document processes so someone else could follow them.","Create your first SOP for a recurring task."],
  ]}
];

let state = JSON.parse(localStorage.getItem("ecomPlaybookProgress") || '{"done":[]}');
let currentModule = 0, currentLesson = 0;

function save(){localStorage.setItem("ecomPlaybookProgress",JSON.stringify(state)); updateProgress();}
function key(m,l){return `${m}-${l}`;}
function isDone(m,l){return state.done.includes(key(m,l));}
function totalLessons(){return modules.reduce((n,m)=>n+m.lessons.length,0);}
function doneCount(){return state.done.length;}
function updateProgress(){
  const pct=Math.round(doneCount()/totalLessons()*100);
  document.getElementById("topProgress").style.width=pct+"%";
  document.getElementById("progressText").textContent=pct+"% complete";
  document.getElementById("sidePercent").textContent=pct+"%";
  document.getElementById("sideBar").style.width=pct+"%";
}
function renderNav(){
  const el=document.getElementById("moduleNav");
  el.innerHTML=modules.map((m,i)=>`<div class="module-link ${i===currentModule?"active":""}" data-module="${i}"><b>${String(i+1).padStart(2,"0")}</b><span>${m.title}</span></div>`).join("");
  el.querySelectorAll(".module-link").forEach(x=>x.onclick=()=>{currentModule=+x.dataset.module;currentLesson=0;render();});
}
function render(){
  renderNav();
  const m=modules[currentModule];
  const view=document.getElementById("lessonView");
  view.innerHTML=`<div class="lesson-card">
    <div class="lesson-top"><div><div class="eyebrow">MODULE ${String(currentModule+1).padStart(2,"0")}</div><h3>${m.title}</h3><p>${m.desc}</p></div><div class="lesson-count">${m.lessons.length} LESSONS</div></div>
    <div class="lesson-body"><div class="lesson-list">${m.lessons.map((l,i)=>`
      <div class="lesson ${i===currentLesson?"selected":""} ${isDone(currentModule,i)?"done":""}" data-lesson="${i}">
        <span class="lesson-num">${String(i+1).padStart(2,"0")}</span>
        <div><h4>${l[0]}</h4><p>${l[1]}</p></div>
        <span class="lesson-status ${isDone(currentModule,i)?"done":""}">${isDone(currentModule,i)?"✓ DONE":"OPEN →"}</span>
      </div>`).join("")}</div>
      <div class="lesson-content open"><h4>${m.lessons[currentLesson][0]}</h4><p>${m.lessons[currentLesson][1]}</p><div class="action"><b>Your action:</b> ${m.lessons[currentLesson][2]}</div>
      <button class="pill ${isDone(currentModule,currentLesson)?"outline":"dark"} complete-btn" id="completeBtn">${isDone(currentModule,currentLesson)?"✓ Completed":"Mark lesson complete →"}</button></div>
    </div></div>`;
  view.querySelectorAll(".lesson").forEach(x=>x.onclick=()=>{currentLesson=+x.dataset.lesson;render();});
  document.getElementById("completeBtn").onclick=()=>{
    const k=key(currentModule,currentLesson);
    if(!state.done.includes(k)) state.done.push(k); else state.done=state.done.filter(x=>x!==k);
    save(); render();
  };
  updateProgress();
}
document.querySelector("#mobileToggle").onclick=()=>document.querySelector("#mainNav").classList.toggle("open");
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>document.querySelector("#mainNav").classList.remove("open"));
document.getElementById("resetProgress").onclick=()=>{if(confirm("Reset all course progress?")){state={done:[]};save();render();}};

document.querySelectorAll(".tool-tab").forEach(tab=>tab.onclick=()=>{
  document.querySelectorAll(".tool-tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".tool-panel").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");document.getElementById(tab.dataset.tool).classList.add("active");
});

function calcScore(){
  const vals=[...document.querySelectorAll("[data-score]")].map(x=>+x.value);
  const total=vals.reduce((a,b)=>a+b,0);
  document.getElementById("scoreValue").textContent=total+"/60";
  document.getElementById("scoreLabel").textContent=total>=48?"Strong candidate — validate it.":total>=36?"Promising — validate it.":"Needs work — find a better angle.";
}
document.querySelectorAll("[data-score]").forEach(x=>x.oninput=calcScore);

function calcProfit(){
  const p=+document.getElementById("price").value||0,c=+document.getElementById("cost").value||0,s=+document.getElementById("shipping").value||0,f=+document.getElementById("fees").value||0,a=+document.getElementById("adCost").value||0;
  const contribution=p-c-s-(p*f/100)-a, margin=p?contribution/p*100:0;
  document.getElementById("contribution").textContent="R"+contribution.toFixed(2);
  document.getElementById("margin").textContent=margin.toFixed(1)+"%";
}
["price","cost","shipping","fees","adCost"].forEach(id=>document.getElementById(id).oninput=calcProfit);

const hookTemplates={
  "Pain point":n=>[`Still struggling with [problem]? Meet the ${n}.`,`If [problem] is driving you crazy, try this ${n}.`,`You don't need to live with [problem] — here's the ${n} we use.`],
  "Curiosity":n=>[`Why is everyone suddenly talking about this ${n}?`,`I didn't expect this ${n} to make such a difference…`,`There is a reason this ${n} keeps showing up on my feed.`],
  "Transformation":n=>[`From [before] to [after] with one simple ${n}.`,`This ${n} changed the way I handle [problem].`,`Watch what happens when you swap [old way] for this ${n}.`],
  "Social proof":n=>[`People keep asking why this ${n} is selling so fast.`,`The ${n} customers keep coming back for.`,`We tested the ${n} and the response surprised us.`],
  "Problem/solution":n=>[`Here's a simpler way to solve [problem]: the ${n}.`,`Problem: [pain]. Solution: this ${n}.`,`If you have [problem], this ${n} was made for you.`]
};
function generateHooks(){
  const n=document.getElementById("productName").value.trim()||"product",a=document.getElementById("angle").value;
  document.getElementById("hooksOutput").innerHTML=hookTemplates[a](n).map((h,i)=>`<div class="hook">${i+1}. ${h}</div>`).join("");
}
document.getElementById("generateHooks").onclick=generateHooks;
generateHooks();

document.querySelectorAll("#checklist input").forEach(x=>x.onchange=()=>{
  const all=[...document.querySelectorAll("#checklist input")],done=all.filter(i=>i.checked).length;
  document.getElementById("checkCount").textContent=`${done}/${all.length}`;
});

render();calcScore();calcProfit();updateProgress();
