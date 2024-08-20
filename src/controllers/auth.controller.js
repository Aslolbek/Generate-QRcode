const bcrypt = require("../libs/bcrypt")
const pg = require("../libs/pg")
const path = require('path');
const sendMail = require("../libs/email")
const {v4: uuid} = require("uuid")
const Jimp = require("jimp")

const NodeWebcam = require( "node-webcam" );
const qrCode = require('qrcode-reader');


const qr = require('qrcode'); // qrcode kutubxonani import qilamiz
const fs = require('fs'); // Fayllarni boshqarish kutubxonasini import qilamiz



const image_name = `${uuid()}.jpg`;

const fileName = 'custom_qr_code.png'; // Fayl nomi

const uploadPath = path.join(process.cwd() + "/uploads/" +image_name);


const Register = async (req, res) =>{

    try {

        const {username, password, email} = req.body
        const chekemail = (await pg(`select * from users where username=$1`, username))[0]

    if(chekemail){
        res.status(400).json("Username oldin foydalanilgan")
    }else{

        // QR kodni generatsiya qilamiz va PNG formatidagi rasm sifatida saqlaymiz

        // qrcode ga username va password yashirildi shunki login vaqtida yechib user ni tekshirish uchun

        const data = `${username, password}`

qr.toFile(uploadPath, data, {
    errorCorrectionLevel: 'H', // Xato tuzatish darajasi "H" (L, M, Q, H)
    type: 'jpg', // Rasm formati "png"
    quality: 1, // Sifat 1 (0 dan 1 gacha)
    margin: 1, // Chegara o'lchami 1
  }, (xato) => {
    if (xato) {
      console.error(xato); // Xatoga duch kelganda xatoni chiqaramiz
    } else {
      console.log('QR kod yaratildi:',uploadPath); // Muvaffaqiyatli bo'lganda manzilni chiqaramiz
    }
  });
 //users qoshish 
        const password_hesh = await bcrypt.hesh(password)
        await pg(` insert into users(username, email, password) values($1,$2,$3)`,username, email, password_hesh)
   
 //emailga habar yuborish

 await sendMail(email, image_name)
//Natija      
        res.status(200).json(`${email} ga QrCode yuborildi`) 

    }
    } catch (error) {

        console.log(error);

        res.status(403).json({message:`${error.message}`})
        
    }
}


const Login = async (req, res) => {

    try {
        
const opts = {
    width: 640,
    height: 480,
    quality: 100,
    delay: 0,
    output: 'jpeg',
    device: false,
    callbackReturn: 'location',
  };
  
  const Webcam = NodeWebcam.create(opts);
  const qr = new qrCode();
  
  function scanQRCode(imageData) {
    qr.decode(imageData, (error, result) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Decoded QR code content:', result.result);
      }
    });
  }
  
  Webcam.capture('test_picture', (error, imagePath) => {
    if (!error) {
      console.log('Image captured');
      fs.readFile(imagePath, (err, image) => {
        if (err) {
          console.error('Error reading image:', err);
        } else {
          scanQRCode(image);
        }
      });
    } else {
      console.error('Error capturing image:', error);
    }
  });

    } catch (error) {
        
    }
  };
  

module.exports={
    Register,
    Login
}