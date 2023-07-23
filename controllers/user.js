const express = require("express");
const { db } = require("../db.js")

const getActiveUser = (req, res) => {
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const pad = "SELECT COUNT(*) AS activeUserCount FROM users WHERE created_at > ? and last_visit > ?"

    db.query(pad, [oneMonthAgo, currentDate], (err, data) => {
        if (err) return console.log(err)

        return res.json(data)
    })
}

const withdrawalFromMainWallet = (req, res) => {
    const feed = [parseInt(req.body[1].main), parseInt(req.body[0].withdrawalAmount), req.body[0].accountName, req.body[0].accountNo, req.body[1].id]

    const amountP = "INSERT INTO withdrawal(main_amount,withdrawal_amount,account_name,account_no,withdrawal_user_id) VALUES (?)"
    db.query(amountP,[feed],(err,data)=>{
        if(err){
            console.error(err)
        }else{

            res.status(200).json({msg:"The successful withdrawal request will be processed within 24 hours of upload."})
        }
    })
}

const TransferToMainWallet = (req, res) => {

    const main = req.body.main;
    const affiliate = req.body.affliateAmount;
    const pu = parseInt(main) + parseInt(req.body.amountTransferred);
    const p1 = parseInt(affiliate) - parseInt(req.body.amountTransferred);
    const feed = [req.body.amountTransferred, req.body.id]
    const amountP = "INSERT INTO transfer(transfer_amount,user_transfer_id) VALUES (?)"
    db.query(amountP, [feed], (err, data) => {
        if (err) {
          console.error(err)
        } else {
            const pa = `UPDATE main_wallet SET amount = "${pu}" WHERE main_wallet_id = "${req.body.id}"`
            db.query(pa, (err, result) => {
                if (err) {
                   console.log(err)
                } else {
                    const pas = `UPDATE affiliate_wallet SET amount = "${p1}" WHERE affiliate_id = "${req.body.id}"`
                    db.query(pas, (err, result) => {
                        if (err) {
                           console.error(err)
                        } else {

                            const yon = [`transfer`, `${req.body.amountTransferred}`, `${req.body.id}`, `success`]
                            const you = `INSERT INTO transactions(type,amount,transaction_id,status) VALUES (?)`
                            db.query(you, [yon], (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.status(201).json({ msg: "Successful Transfer" })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

}

const getMainWallet = (req, res) => {
    const pa = req.params.id

    const pad = `SELECT * FROM main_wallet WHERE main_wallet_id ="${pa}"`
    db.query(pad, (err, result) => {
        if (err) {
           console.error(err)
        } else {
            res.send(result)
            // console.log(result[0].amount)
        }
    })
}

const getAffiliateWallet = (req, res) => {
    const pa = req.params.id

    const pad = `SELECT * FROM affiliate_wallet WHERE affiliate_id ="${pa}"`
    db.query(pad, (err, result) => {
        if (err) {
        console.error(err)
        } else {
            res.send(result)
            
        }
    })
}


const subscription = (req,res) => {

    const wa = "INSERT INTO subscription(user_id,subscribe_amount,status,subscription_pay) VALUES (?)"
    const wa1 = [req.body.id, req.body.amount, "active",1]
    db.query(wa, [wa1], (err, result) => {
        if (err) {
            console.error(err)
        }
        if (result) {
            const pa = `SELECT * FROM referrals WHERE referred_user_id ="${req.body.id}"`
            db.query(pa, (err, data) => {
                if (err) {
                 console.log(err)
                }
                if(data.length === 0){
                    const mainWa = req.body.mainWallet;
                    const amount = req.body.amount;
                    const bal = parseInt(mainWa) - parseInt(amount)
                    const bal1 = `UPDATE main_wallet SET amount = "${bal}" WHERE main_wallet_id = "${req.body.id}"`
                    db.query(bal1, (err, result) => {
                        if (err) {
                           console.error(err)
                        } else {

                            const pad = [`subscription`, `${req.body.amount}`, `${req.body.id}`, `success`]
                            const trans1 = "INSERT INTO transactions(type,amount,transaction_id,status) VALUES (?)"
                            db.query(trans1, [pad], (err, result) => {
                                if (err) {
                                   console.log(err)
                                } else {
                                    res.status(200).json({msg:"subscription was successfully"})
                                }
                            })

                        }
                    })
                } else {
                    const mainWa = req.body.mainWallet;
                    const amount = req.body.amount;
                    const bal = parseInt(mainWa) - parseInt(amount)
                    const cad = amount * 0.5
                    const bal2 = `UPDATE main_Wallet SET amount = "${bal}" WHERE main_Wallet_id = "${req.body.id}"`
                    db.query(bal2, (err, result) => {
                        if (err) {
                           console.log(err)
                        } else {
                            const tire = `UPDATE affiliate_wallet SET amount = amount + "${cad}" WHERE affiliate_id ="${data[0].referral_user_id}"`
                            db.query(tire, (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    const pad = [`subscription`, `${req.body.amount}`, `${req.body.id}`, `success`]
                                    const trans1 = "INSERT INTO transactions(type,amount,transaction_id,status) VALUES (?)"
                                    db.query(trans1, [pad], (err, result) => {
                                        if (err) {
                                          console.log(err)
                                        } else {
                                            console.log("subscription was successfully")
                                        }
                                    })
                                }
                            })

                        }
                    })
                }

            })
        }
    })
}


const subStatus =(req,res)=>{
    const po = req.params.id
    const to = `SELECT status FROM subscription WHERE user_id = "${po}"`
    db.query(to,(err,result)=>{
        if(err){
           console.error(err)
        }else{
            res.status(200).send(result)
        }
    })
}

const getReferral = (req, res) => {
    const bas = req.params.id
    const ba = `SELECT * FROM referrals WHERE referral_user_id ="${bas}"`
    db.query(ba, (err, result) => {
        if (err) {
          console.error(err)
        } else {
            res.send(result)
        }
    })
}


const walletOverview = (req, res) => {
    const pars = req.params.id
const tin = `SELECT * FROM transactions WHERE transaction_id = "${pars}"`
    // const tim = `SELECT t1.d_amount,t1.created_at,t1.user_deposit_id, t2.transfer_amount,t2.created_at AS pep,t2.user_transfer_id, t3.withdrawal_amount,t3.withdrawal_date,t3.withdrawal_user_id FROM deposit AS t1 JOIN transfer AS t2 ON t1.user_deposit_id = t2.user_transfer_id JOIN withdrawal AS t3 ON t2.user_transfer_id = t3.withdrawal_user_id WHERE t1.user_deposit_id ="${para}"`;
    db.query(tin, (err, result) => {
        if (err) {
          console.error(err)
        } else {
            res.send(result)
        }
    })
}
const getUserInfo = (req, res) => {
    const pat = req.params.id;

    const go = `SELECT * FROM users WHERE id = '${pat}'`
    db.query(go, (err, data) => {
        if (err) {
            res.json({err:err})
        } else {
            res.send(data)

        }
    })
}


const checkUserActivity = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const valDo = `UPDATE users SET active = 0 WHERE last_visit < ?`

    db.query(valDo, [thirtyDaysAgo], (err, result) => {
        if (err) {
            throw err
        } else {
            console.log("updated user when last visit")
        }
    })

}
setInterval(checkUserActivity, 24 * 60 * 60 * 1000)

const checkSubscriptionActivity = () => {
    const thirtyDaysAgo1 = new Date();
    thirtyDaysAgo1.setDate(thirtyDaysAgo1.getDate() - 30);

    const valDo1 = `UPDATE subscription SET subscription_pay = 0 WHERE last_visit < ?`

    db.query(valDo1, [thirtyDaysAgo1], (err, result) => {
        if (err) {
            throw err
        } else {
            console.log("updated subscription when last visit")
        }
    })

}
setInterval(checkSubscriptionActivity, 24 * 60 * 60 * 1000)

const getSubscriptionPay = (req, res) => {
    // console.log(req.params.id)
    const bk = req.params.id
    const activeUser = `SELECT subscription_pay FROM subscription WHERE user_id = "${bk}"`
    db.query(activeUser, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            
        }

    })

}

const getActiveUser1 = (req, res) => {
    const activeUser = "SELECT COUNT(*) AS active_count FROM users WHERE active = 1"
    db.query(activeUser, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
           
        }

    })

}

const getInactiveUser1 = (req, res) => {
    const inactiveUser = "SELECT COUNT(*) AS inActive_count FROM users WHERE active = 0"
    db.query(inactiveUser, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
           
        }

    })

}

const getWithdrawal = (req, res) => {
    const amountP1 = "SELECT * FROM withdrawal"
    db.query(amountP1, (err, data) => {
        if(err){
        res.status(501).json({err:err})
        }else{
            res.send(data)
        }
    })
}

const postDeposit = (req, res) => {


     console.log(req.body.customer.name)
    const pop = [`${req.body[0].amount}`, `${req.body[1].name}`, `${req.body[0].id}`, `${req.body[1].email}`]
    const def = `INSERT INTO deposit(d_amount,d_name,user_deposit_id,email) VALUES (?)`

    db.query(def, [pop], (err, result) => {
        if (err) {
            console.error(err)
        } else {
            const bar = parseInt(req.body[0].mainA) + parseInt(req.body[0].amount)
            const bars = `UPDATE main_wallet SET amount = "${bar}" WHERE main_wallet_id = "${req.body.id}"`
            db.query(bars, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    const pad = [`deposit`, `${req.body[0].amount}`, `${req.body[0].id}`, `success`]
                    const trans = "INSERT INTO transactions(type,amount,transaction_id,status) VALUES (?)"
                    db.query(trans, [pad], (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                        res.send("Successful Deposit")
                        }
                    })

                }
            })
        }
    })
}

const getGameNo = (req, res) => {
    const gameNo = "SELECT game_no FROM post_result_sport"

    db.query(gameNo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })
}


const getGameNo1 = (req, res) => {
    const gameNo = "SELECT r_trade_no FROM post_result_for"

    db.query(gameNo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })
}

const getGameNo2 = (req, res) => {
    const gameNo = "SELECT c_trade_no FROM post_result_crypto"

    db.query(gameNo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })
}

const getGameNo3 = (req, res) => {
    const gameNo = "SELECT b_trade_no FROM post_result_binary"

    db.query(gameNo, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }

    })
}

const DeleteGame = (req, res) => {
    const gameId = req.params.id

    const bod = "DELETE FROM post_tip_sport WHERE id = ?"
    db.query(bod, [gameId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data deleted successfuly")
        }
    })
}


const DeleteGame1 = (req, res) => {
    const gameId = req.params.id

    const bod = "DELETE FROM post_tip_for WHERE id = ?"
    db.query(bod, [gameId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data deleted successfuly")
        }
    })
}



const DeleteGame2 = (req, res) => {
    const gameId = req.params.id

    const bod = "DELETE FROM post_tip_crypto WHERE id = ?"
    db.query(bod, [gameId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data deleted successfuly")
        }
    })
}

const DeleteGame3 = (req, res) => {
    const gameId = req.params.id

 

    const bod = "DELETE FROM post_tip_binary WHERE id = ?"
    db.query(bod, [gameId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data deleted successfuly")
        }
    })
}

const updateInactiveUser = () => {
    // const currentDate = new Date();
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const info = "UPDATE users SET active = 0 WHERE last_visit < ?"
    db.query(info, [oneMonthAgo], (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Successful Upload")
        }
    })
}

const runJob = () => {
    const now = new Date();
    const millisUntilMidnight = newDate(now.getFullYear(), now.getMonth() + 1);

    setTimeout(() => {
        updateInactiveUser();
        runJob();

    }, millisUntilMidnight)
}

// runJob();

module.exports = {
    getActiveUser, getSubscriptionPay, subStatus, getReferral, walletOverview, getAffiliateWallet, getMainWallet, subscription, DeleteGame, TransferToMainWallet, DeleteGame3, DeleteGame2, DeleteGame1, getGameNo3, getGameNo2, getGameNo1, getGameNo, getActiveUser1, getInactiveUser1, postDeposit, getUserInfo, runJob, withdrawalFromMainWallet, getWithdrawal
}

// runJob();