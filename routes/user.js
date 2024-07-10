const express = require("express")
const router = express.Router()

const {
    requestRegister , userSignUp , login
} = require("../controllers/User")

router.post("/requestRegister" , requestRegister);
router.post("/userSignUp" , userSignUp);
router.post("/login" , login);

module.exports = router;