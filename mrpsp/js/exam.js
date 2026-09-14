import{db}from"./firebase-config.js";import{ref,get,set}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
const candidate=sessionStorage.getItem("mrpspCandidate");if(!candidate)location.href="login.html";
const fallback=[
{q:"A train covers 120 km in 2 hours. What is its average speed?",o:["40 km/h","50 km/h","60 km/h","80 km/h"],a:2},
{q:"Which protocol is connection-oriented?",o:["UDP","IP","TCP","ICMP"],a:2},
{q:"If 20% of a number is 40, the number is:",o:["100","150","200","250"],a:2},
{q:"Which device primarily forwards packets between networks?",o:["Switch","Router","Hub","Repeater"],a:1},
{q:"The SI unit of electrical resistance is:",o:["Volt","Ampere","Ohm","Watt"],a:2},
{q:"What is the next number: 2, 4, 8, 16, ?",o:["20","24","30","32"],a:3},
{q:"Which layer provides process-to-process delivery in the OSI model?",o:["Network","Transport","Session","Data Link"],a:1},
{q:"A 10% discount on ₹500 gives a selling price of:",o:["₹450","₹460","₹480","₹490"],a:0},
{q:"Which memory is volatile?",o:["ROM","SSD","RAM","Flash"],a:2},
{q:"In a railway signalling system, interlocking primarily prevents:",o:["Ticket sales","Conflicting routes","Train announcements","Passenger counting"],a:1}
];
let questions=fallback,answers=Array(questions.length).fill(null),review=Array(questions.length).fill(false),current=0,time=1800,warningCount=0,started=false;
document.querySelector("#candidate").textContent=candidate;
function render(){const x=questions[current];document.querySelector("#qno").textContent=`Question ${current+1} of ${questions.length}`;document.querySelector("#question").textContent=x.q;document.querySelector("#options").innerHTML=x.o.map((v,i)=>`<label class="option"><input type="radio" name="answer" value="${i}" ${answers[current]===i?"checked":""}><span>${String.fromCharCode(65+i)}. ${v}</span></label>`).join("");document.querySelectorAll('input[name="answer"]').forEach(r=>r.onchange=()=>{answers[current]=+r.value;palette()});palette()}
function palette(){document.querySelector("#paletteGrid").innerHTML=questions.map((_,i)=>`<button class="${answers[i]!==null?"answered":""} ${review[i]?"review":""}" data-i="${i}">${i+1}</button>`).join("");document.querySelectorAll("#paletteGrid button").forEach(b=>b.onclick=()=>{current=+b.dataset.i;render()})}
function tick(){if(!started)return;time--;const m=String(Math.floor(time/60)).padStart(2,"0"),s=String(time%60).padStart(2,"0");document.querySelector("#timer").textContent=`${m}:${s}`;if(time<=0)submitExam()}
function submitExam(){if(!started)return;started=false;clearInterval(window.clock);const score=answers.reduce((n,a,i)=>n+(a===questions[i].a?1:0),0);set(ref(db,"results/"+candidate),{score,total:questions.length,eligible:score>=Math.ceil(questions.length*.6),submittedAt:new Date().toISOString(),answers}).catch(console.error);alert(`Examination submitted. Score: ${score}/${questions.length}`);location.href="result.html"}
document.querySelector("#next").onclick=()=>{if(current<questions.length-1){current++;render()}};document.querySelector("#prev").onclick=()=>{if(current>0){current--;render()}};document.querySelector("#mark").onclick=()=>{review[current]=!review[current];palette()};
document.querySelector("#submitExam").onclick=()=>{if(confirm("Are you sure you want to submit the examination?"))submitExam()};
document.querySelector("#start").onclick=async()=>{try{const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false});document.querySelector("#video").srcObject=stream}catch(e){alert("Camera permission was not granted. You may not be allowed to continue in a production secure exam.");return}document.querySelector("#permission").style.display="none";started=true;window.clock=setInterval(tick,1000);render();try{await document.documentElement.requestFullscreen()}catch(e){}};
document.addEventListener("visibilitychange",()=>{if(started&&document.hidden){warningCount++;const w=document.querySelector("#warning");w.style.display="block";w.textContent=`Warning ${warningCount}/3: Tab switching is not permitted.`;set(ref(db,`examEvents/${candidate}/${Date.now()}`),{type:"tab_switch",timestamp:new Date().toISOString()});if(warningCount>=3)submitExam()}});
document.addEventListener("fullscreenchange",()=>{if(started&&!document.fullscreenElement){warningCount++;const w=document.querySelector("#warning");w.style.display="block";w.textContent=`Warning ${warningCount}/3: Full screen mode is required.`;if(warningCount>=3)submitExam()}});
render();