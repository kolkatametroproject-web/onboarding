import { db } from "./firebase-config.js";
import { ref, get, set } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";
import { getStorage, ref as sref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const form=document.querySelector("#registerForm"), msg=document.querySelector("#msg");
form.addEventListener("submit", async e=>{
 e.preventDefault(); msg.textContent="Checking enrollment number...";
 const enrollment=document.querySelector("#enrollment").value.trim().toUpperCase();
 try{
  const existing=await get(ref(db,"candidates/"+enrollment));
  if(existing.exists()){msg.className="error";msg.textContent="This enrollment number is already registered.";return;}
  const data={enrollmentNumber:enrollment,name:document.querySelector("#name").value.trim(),email:document.querySelector("#email").value.trim(),phone:document.querySelector("#phone").value.trim(),dob:document.querySelector("#dob").value,college:document.querySelector("#college").value.trim(),status:"Registered",createdAt:new Date().toISOString()};
  const file=document.querySelector("#photo").files[0];
  if(file){
   const storage=getStorage(); const r=sref(storage,`candidate-photos/${enrollment}`);
   await uploadBytes(r,file); data.photoUrl=await getDownloadURL(r);
  }
  await set(ref(db,"candidates/"+enrollment),data);
  msg.className="success"; msg.innerHTML=`Registration successful. Your Registration Number is <b>${enrollment}</b>. Please save it.`;
  form.reset();
 }catch(err){console.error(err);msg.className="error";msg.textContent="Registration failed. Check Firebase configuration and security rules."}
});