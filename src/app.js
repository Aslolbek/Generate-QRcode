const express = require("express")
const router = require("./routers")
const config = require("../config/index")
const cors = require("cors")
const file = require("express-fileupload")
const cookie = require("cookie-parser")
const bodyParser = require('body-parser');



const app = express()

app.use(express.json())
app.use(cors({
    origin:'*',
}))

app.use(bodyParser.raw({ type: 'image/*' }));
app.use(cookie())
app.use(express.urlencoded({extended: true}));
app.use(file())

app.use(express.static(process.cwd() + "/src/public"));
app.use(express.static(process.cwd() + "/uploads"));

app.use(router)


app.listen(config.PORT, ()=>{
    console.log("PORT:", `${config.PORT}`);
})