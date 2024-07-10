const express = require("express")
const router = express.Router()

const {
    adminRegister , approveRequest
} = require("../controllers/Admin")

router.post("/adminRegister" , adminRegister);
router.post("/approveRequest" , approveRequest);

module.exports = router;