const nodemailer = require("nodemailer")
const path = require('path');



const sendMail = async ( email, imagePath) =>{
    try {
        const transporter = nodemailer.createTransport({
    port: 465, 
    host: "smtp.gmail.com",
    auth: {
      user: "nasirullayevo7@gmail.com",
      pass: "smenmggcgonbqmwl",
    },
    secure: true,
  });

  const mailData = {
    from: "nasirullayevo7@gmail.com", 
    to: `${email}`, 
    subject: "Sending Email using Node.js",
    text: "sizning maxsus QrCode",
    attachments: [
        {
          filename: `${imagePath}`, // Tasvir nomi
          path:  path.join(__dirname, `../../uploads/${imagePath}`),// Tasvirning joylashuvi
        },
      ],

  };
      await transporter.sendMail(mailData);
      
    } catch (error) {
        res.status(200).json({message: '${error.message}'})
    }
}



  
  module.exports= sendMail