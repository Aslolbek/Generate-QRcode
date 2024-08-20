const bcrypt = require("bcrypt")

const hesh = async (malumot) =>{
   return await bcrypt.hash(malumot, 10)
}
const passcompare = async (password, hechpassword) =>
{
        return  await bcrypt.compare(password, hechpassword)
      
} 

module.exports={
    hesh,
    passcompare
}