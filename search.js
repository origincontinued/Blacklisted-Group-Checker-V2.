export default async function(req,res){
const SHEET="https://docs.google.com/spreadsheets/d/1EaZfeDPhuE48ZX8-PdE01MWW-JUZkvsqBmdICfgcdls/export?format=csv&gid=1195980622";
const csv=await (await fetch(SHEET)).text();
const rows=csv.trim().split(/\r?\n/).map(r=>r.split(","));
const q=(req.query.q||"").toLowerCase();
for(let i=1;i<rows.length;i++){
 let [user,id,reason,date,duration,appealable,status]=rows[i];
 if((user||"").toLowerCase()==q||id==q){
   if((duration||"").toLowerCase()=="expired"){return res.json({active:false,message:"Restriction expired"});}
   return res.json({active:true,division:"SOCOM",username:user,id,reason,dateIssued:date,duration,appealable:appealable?"Yes":"No",status:status||"Active"});
 }
}
res.json({active:false,message:"No active SOCOM restriction"});
}