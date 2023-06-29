const express = require("express");
const { db } = require("../db.js")

const getActiveUser = (req, res) => {


    const currentDate = new Date();
    const oneMonthAgo = new Date();


    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    const pad ="SELECT COUNT(*) AS activeUserCount FROM users WHERE created_at > ? and last_visit > ?"

    db.query(pad, [oneMonthAgo, currentDate],(err,data)=>{
        if(err) return console.log(err)

        return res.json(data)
    })
}

const withdrawalFromMainWallet =(req,res)=>{
    console.log(req.body)
    // const feed = [req.body[1].main, req.body[0].withdrawalAmount, req.body[0].accountName, req.body[0].accountNo]
    // const amountP ="INSERT INTO withdrawal(main_amount,withdrawal_amount,account_name,account_no) VALUES (?)"
    // db.query(amountP,[feed],(err,data)=>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         res.send("successful withdrawal upload")
    //     }
    // })
}

const getUserInfo=(req,res)=>{
    const pat = req.params.id;

    const go = `SELECT * FROM users WHERE id = '${pat}'`
    db.query(go,(err,data)=>{
        if(err){
            // res.json({
            //     err:err
            // })
        }else{
            res.send(data)
       
        }
    })
}


const checkUserActivity =()=>{
 const thirtyDaysAgo = new Date();
 thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

 const valDo = `UPDATE users SET active = 0 WHERE last_visit < ?`

 db.query(valDo,[thirtyDaysAgo],(err,result)=>{
    if(err){
        throw err
    }else{
        console.log("updated user when last visit")
    }
 })

}
setInterval(checkUserActivity, 24 * 60 * 60 * 1000)


const getActiveUser1 =(req,res)=>{
    const activeUser = "SELECT COUNT(*) AS active_count FROM users WHERE active = 1"
    db.query(activeUser,(err,result)=>{
     if(err){
        console.log(err)
     }else{
        res.json(result[0].active_count)
         console.log(result[0].active_count)
     }

    })

}

const getInactiveUser1 = (req, res) => {
    const inactiveUser = "SELECT COUNT(*) AS active_count FROM users WHERE active = 0"
    db.query(inactiveUser, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result[0].active_count)
            console.log(result[0].active_count)
        }

    })

}

const getWithdrawal = (req, res) => {
   
    
    const amountP1 = "SELECT * FROM withdrawal"
    db.query(amountP1,(err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
}

const postDeposit=(req,res)=>{
    console.log(req.body)

}

const getGameNo =(req,res)=>{
    const gameNo = "SELECT game_no FROM post_result_sport"

    db.query(gameNo,(err,result)=>{
        if(err){
            console.log(err)
        }else{
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

const DeleteGame =(req,res)=>{
    const gameId = req.params.id

    console.log(gameId)

     const bod = "DELETE FROM post_tip_sport WHERE id = ?"
     db.query(bod,[gameId],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("data deleted successfuly")
        }
     })
}


const DeleteGame1 = (req, res) => {
    const gameId = req.params.id

    console.log(gameId)

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

    console.log(gameId)

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

    console.log(gameId)

    const bod = "DELETE FROM post_tip_binary WHERE id = ?"
    db.query(bod, [gameId], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data deleted successfuly")
        }
    })
}

const updateInactiveUser =()=>{
    // const currentDate = new Date();
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const info = "UPDATE users SET active = 0 WHERE last_visit < ?"
    db.query(info,[oneMonthAgo],(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Successful Upload")
        }
    })
}

const runJob =()=>{
    const now = new Date();
     const millisUntilMidnight = newDate(now.getFullYear(), now.getMonth() + 1);

     setTimeout(()=>{
         updateInactiveUser();
         runJob();

     }, millisUntilMidnight)
}

// runJob();

module.exports ={
    getActiveUser, DeleteGame, DeleteGame3, DeleteGame2, DeleteGame1, getGameNo3, getGameNo2, getGameNo1, getGameNo, getActiveUser1, getInactiveUser1, postDeposit, getUserInfo, runJob, withdrawalFromMainWallet, getWithdrawal
}

// runJob();