
// const forgotPassword = (req, res) => {
//     // check Email
//     const email1 = req.body.email;
//     // const Otp1 = Math.floor(Math.random() * 9000 + 1000).toString(36);

//     const generateToken = () => {
//         return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
//     };
//     const Otp1 = generateToken();
//     // console.log(Otp1)

//     let config = {
//         service: "gmail",
//         auth: {
//             user: EMAIL,
//             pass: PASSWORD
//         }

//     }

    // let transporter = nodemailer.createTransport(config);

    // check for email
    // db.query("SELECT * FROM users WHERE email = ?", [email1], (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal server error' });
    //     } else if (results.length === 0) {
    //         res.status(404).json({ message: 'User not found' });
    //     } else {
    //         const token = generateToken();
    //         const resetLink = `http://localhost:3000/reset-password/${token}`;

    //         db.query("UPDATE users SET token = ? WHERE email = ?", [token, email1], (err) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.status(501).json({ message: 'Internal server error' });
    //             } else {
    //                 const mailOptions = {
    //                     from:EMAIL,
    //                     to: email1,
    //                     subject: 'Reset Password',
    //                     html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
    //                 };

    //                 transporter.sendMail(mailOptions, (error) => {
    //                     if (error) {
    //                         console.log(error);
    //                         res.status(500).json({ message: 'Internal server error' });
    //                     } else {
    //                         res.json({ message: 'Email sent successfully' });
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // });





    // check email
    // const q = "SELECT * FROM users WHERE email = ?"
    // db.query(q, [email1], (err, data) => {
    //     if (err) res.status(500).json({ message: 'Internal server error' });
    //     if (data.length === 0) return res.status(404).json('email not registered!');





        // const resetLink = `http://localhost:3000/reset-password/${Otp1}`;

        // let MailGenerator = new Mailgen(
        //     {
        //        theme:"default",
        //        product:{
        //         name:"Mailgen",
        //         link:'https://mailgen.js'
        //        }
        //     }
        // )

        // let response ={
        //     body:{
        //         name:"Daily Coupon",
        //         intro:"Your bill has arrived",
        //         table:{
        //             data:[{
        //                 item:"Nodemailer Stack Book",
        //                 description:"A backend Application",
        //                 price:"200"
        //             }
        //             ]
        //         },
        //         outro:"looking forward to do more business"
        //     }
        // }

        // let mail = MailGenerator.generate(response);
        // db.query('UPDATE users SET token = ? WHERE email = ?', [`${Otp1}`, email1], (err) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(501).json({ message: 'Internal server error' });
        //     } else {


//         let message = {
//             from: EMAIL,
//             to: email1,
//             subject: "Password Reset OTP",
//             // html:mail
//             // html:`<h1>Your OTP for password reset is: ${Otp1} </h1>`
//             html: `Click the following link to reset your password: <a href="${resetLink}"  target="_blank" rel="noopener noreferrer">${resetLink}</a>`,
//         }

//         transporter.sendMail(message).then(() => {
//             return res.status(201).json({
//                 msg: `We have sent a code to your Email at: ${email1}`
//             })
//         }).catch(err => {
//             return res.status(501).json({
//                 msg: "internal server error"
//             })


//         })
//     }
//         });

//     })


// }