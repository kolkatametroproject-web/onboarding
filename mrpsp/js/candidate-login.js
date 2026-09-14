import { db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
document.querySelector("#loginForm").addEventListener("submit",async e=>{
 e.preventDefault(); const n=document.querySelector("#enrollment").value.trim().toUpperCase(); const msg=document.querySelector("#msg");
 try{const s=await get(ref(db,"candidates/"+n)); if(!s.exists()){msg.className="error";msg.textContent="Registration not found.";return} sessionStorage.setItem("mrpspCandidate",n);location.href="dashboard.html"}catch(x){msg.className="error";msg.textContent="Unable to connect to database."}
});