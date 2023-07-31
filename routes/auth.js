const express = require('express')
const { register, adminLogin , adminRegister, register1, resetPassword, login, logout, forgotPassword } = require('../controllers/auth.js')

const router = express.Router()

router.post("/register", register)
router.post("/register1", register1)
router.post("/admin", adminRegister)
router.post("/admin-login", adminLogin)
router.put("/resetpass!45!@word/:id", resetPassword)
router.post("/login", login)
router.post("/logout", logout)
router.post("/password-reset", forgotPassword)


module.exports = router;