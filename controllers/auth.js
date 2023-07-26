const { db } = require('../db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require("../env.js")
const Mailgen = require('mailgen')
var validator = require("email-validator");
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy


// const generateToken = () => {
//     return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
// };

function generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

function generateReferralCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}

const register1 =(req, res) => {

    const checkV = req.body[1].code;
    // CHECK EXISTING USER
    const email = req.body[0].email;
    const p2 = validator.validate(`${email}`)
    const name = req.body[0].username;
    const referralCode = generateReferralCode(8);

    if (p2 === true) {
        const q = "SELECT * FROM users WHERE email = ?"
        db.query(q, [email],(err, data) => {
            if (err) {
               console.error(err)
            }
            if (data.length > 0) return res.status(409).json({message:'User already exist'})
        })

        // Hash the password and create a user
        const salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(req.body[0].password, salt);

        const qa = "INSERT INTO users(`username`,`email`,`password`,`referral_code`) VALUES (?)"

        const values = [req.body[0].username, req.body[0].email, hash, referralCode]
        db.query(qa, [values], (err, data) => {
            if (err) {
                console.log(err)
            } else {

                const fara = `SELECT  id AS id_referral FROM users WHERE referral_code = '${checkV}'`
                db.query(fara, (err, data) => {
                    if (err) {
                        console.error(err)
                    } else {
                        const {tap} = data[0].id_referral;
                        const fara1 = `SELECT  id AS id_referred FROM users WHERE email = '${req.body[0].email}'`
                        db.query(fara1, (err, data) => {
                            if (err) {
                                console.log(err)
                            } else {
                                //  tap = res.send(data)
                                const {tap1} = data[0].id_referred;
                                const fara2 = `INSERT INTO referrals(referral_user_id,referred_user_id) VALUES ('${tap}', '${tap1}')`

                                db.query(fara2, (err, data) => {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        res.send("data inserted")
                                    }
                                })
                            }
                        })
                    }
                })

            }
        })


    } else {
        res.status(401).json({
            msg: "email is not valid"
        })
    }

}

const register =  (req, res) => {
    // CHECK EXISTING USER
    const email = req.body.email;
    const p1 = validator.validate(`${email}`)
    const referralCode = generateReferralCode(8);
    if (p1 === true) {
        const q = "SELECT * FROM users WHERE email = ?"
        db.query(q, [email],(err,data) => {
            if (err) {
                res.status(501).json({
                    msg: "internal server error"
                })
            }
            if (data.length > 0){
                return res.json('User already exist')
            }else{
                // Hash the password and create a user
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                const qa = "INSERT INTO users(`username`,`email`,`password`,`referral_code`) VALUES (?)"

                const values = [req.body.username, req.body.email, hash, referralCode]
                db.query(qa, [values], (err, data) => {
                    if (err) {
                        res.status(500).json({
                            msg: "internal server error"
                        })
                    } else {
                        res.json("user has been created")
                    }

                })
            }
            
                // Hash the password and create a user
                // const salt = bcrypt.genSaltSync(10);
                // const hash = bcrypt.hashSync(req.body.password, salt);
                // const qa = "INSERT INTO users(`username`,`email`,`password`,`referral_code`) VALUES (?)"
                

                // const values = [req.body.username, req.body.email, hash, referralCode]
                // db.query(qa, [values], (err, data) => {
                //     if (err) {
                //         res.status(500).json({
                //             msg: "internal server error"
                //         })
                //     } else {
                //         res.json("user has been created")
                //     }

                // })
            
        })
        

    } else {
        res.status(402).json({
            msg: "email is not valid"
        })
    }
}

const adminRegister = (req, res) => {


}

const login = (req, res) => {
    // CHECK USER
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [req.body.email],(err, data) => {
        if (err) {
            console.log(err)
        }
        if (data.length === 0) return res.status(404).json({ msg: "user not found" });

        //CHECK FOR PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json({ msg: "Wrong email or Password!" })
        const token = jwt.sign({ id: data[0].id }, "jwtkey")
        const { password, ...other } = data[0];
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(other)

    })

}

const forgotPassword = (req, res) => {

    const email1 = req.body.email;

    const p = validator.validate(`${email1}`)

    // const generateToken = () => {
    //    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
    // };
    let config = {
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }

    }
    let transporter = nodemailer.createTransport(config);
    // check for email
    if (p === true) {
        db.query("SELECT * FROM users WHERE email = ?", [email1], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json({ msg: 'Internal server error' });
            } else if (results.length === 0) {
                res.status(404).json({ msg: 'User not found' });
            } else {
                const token1 = generateReferralCode(8);
                const accessTOKEN =results[0].referral_code
                console.log(accessTOKEN)
                const mailOptions = {
                    from: EMAIL,
                    to: email1,
                    subject: 'Reset Password',
                    // html: `Click the following link to reset your password: <a href="#">${resetLink}</a>`,
                    html: `<!DOCTYPE html>
                    < html >
<head>
<title>Page Title</title>
</head>
<body>

<h1 style={{marginBottom:"10px"}}>Reset password</h1>
<p style={{marginBottom:"20px"}}>A password change has been requested for your account. If this was you, please use the link below to reset your password.</p>

<a href ="https://earnars.com/resetpassword#@7890abch!uitrm$y/${accessTOKEN}" style={{padding:"8px 5px",background:"green",color:"#000"}}>Reset password</a>
</body>
</ > `
                };

                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(502).json({ msg: 'Internal server error' });
                    } else {
                        res.json({ msg: email1 });

                        // console.log("Email was sent Successfully")
                    }
                    // });
                    // }
                });
            }
        });

    } else {
        res.status(401).json({ msg: "email is not valid" })
    }



}


const resetPassword =  (req, res) => {

    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(req.body.password, salt);
    const pal = req.params.id

    // console.log(req.body)

    const peo = `UPDATE users SET  password = "${hash}" WHERE referral ="${pal}"`
    db.query(peo,(err, result) => {
        if (err){
            console.log(err)
        } else {
            console.log("success")
            res.status(201).json({ msg: "Password Updated Successfully" })
        }
    })
}


const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,

    }).status(200).json("User has been logged out")

}

module.exports = { register, adminRegister, resetPassword, register1, login, logout, forgotPassword }