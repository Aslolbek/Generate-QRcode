const {Router} = require("express")
const { Register, Login } = require("../controllers/auth.controller")


const router = Router()

router.post("/register", Register)
router.post("/login", Login)


module.exports=router