export const checking=(req,res)=>{
  let data=  req.body
  console.log("message1",data) 
let desision=data    ;
return res.status(200).json({data:data.status,
"desision":desision})
}