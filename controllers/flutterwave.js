const { db } = require('../db.js')
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

function generateReferralCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    return result;
}

const createBillAirtime = async (req,res) => {

    try {
        const payload = {
            "country": "NG",
            "customer": "+2349060243960",
            "amount": parseInt(req.body[0].amount),
            "recurrence": "ONCE",
            "type": "AIRTIME",
            "reference": generateReferralCode(8)
        }

        const response = await flw.Bills.create_bill(payload)
        console.log(response);
        if(response){
            const see ="INSERT INTO airtime_purchase(amount,airtime_user_id) VALUES (?)"
            const val =[`${req.body[0].amount}`,`${req.body[1].id}`]
            db.query(see,[val],(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    const bal = parseInt(req.body[1].main) - parseInt(req.body[0].amount)
                    const pp =`UPDATE main_wallet SET amount = "${bal}" WHERE main_wallet_id = "${req.body[1].id}"`
                    db.query(pp,(err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            // const po =`INSERT INTO transactions(type,amount,transaction_id,status)`
                            console.log("success")
                        }
                    })
                }
            }
            )
        }
    } catch (error) {
        console.log(error)
    }

}

const createBillData = async (req, res) => {

    try {
        const payload = {
            "country": "NG",
            "customer": "+2349060243960",
            "amount": parseInt(req.body[0].amount),
            "type": "MTN 50 MB",
            "reference": generateReferralCode(8)
        }

        const response = await flw.Bills.create_bill(payload)
        console.log(response);
        if (response) {
            const see = "INSERT INTO airtime_purchase(amount,airtime_user_id) VALUES (?)"
            const val = [`${req.body[0].amount}`, `${req.body[1].id}`]
            db.query(see, [val], (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const bal = parseInt(req.body[1].main) - parseInt(req.body[0].amount)
                    const pp = `UPDATE main_wallet SET amount = "${bal}" WHERE main_wallet_id = "${req.body[1].id}"`
                    db.query(pp, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            // const po =`INSERT INTO transactions(type,amount,transaction_id,status)`
                            console.log("success")
                        }
                    })
                }
            }
            )
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = { createBillAirtime,createBillData }