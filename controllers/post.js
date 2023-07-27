  const express = require("express");
const bcrypt = require('bcrypt')
const {db} = require("../db.js")
const jwt = require('jsonwebtoken') 
  
  const getPosts = (req,res)=>{
    const q =  "SELECT * FROM users";
    db.query(q,(err,data)=>{
      if (err){return res.status(501).json(err)
      }else{
        return (res.send(data))
      }
    })
}

const getPost=(req,res)=>{
  const q =  "SELECT * FROM sportsTable";
  db.query(q,(err,data)=>{
    if (err) {return res.send(err)
    }else{
      return (res.send(data))
    } 
  })
 }

  const getTipFprex =(req,res)=>{
    const forexT = "SELECT * FROM post_tip_for"
    db.query(forexT,(err,data)=>{
      if(err){
        return res.json({
          err:err
        })
      }else{
        return res.send(data)
      }
    })
  }


const getTipCrypto = (req, res) => {
  const cryptoT = `SELECT * FROM post_tip_crypto WHERE c_trade_type = "hourly"`
  db.query(cryptoT, (err, data) => {
    if (err) {
      return res.json({
        err: err
      })
    } else {
      return res.send(data)
    }
  })
}
const getTipCryptoD = (req, res) => {
  const cryptoT = `SELECT * FROM post_tip_crypto WHERE c_trade_type = "daily"`
  db.query(cryptoT, (err, data) => {
    if (err) {
      return res.json({
        err: err
      })
    } else {
      return res.send(data)
    }
  })
}

const getTipCryptoM = (req, res) => {
  const cryptoT = `SELECT * FROM post_tip_crypto WHERE c_trade_type = "weekly"`
  db.query(cryptoT, (err, data) => {
    if (err) {
      return res.json({
        err: err
      })
    } else {
      return res.send(data)
    }
  })
}

 const getNum=()=>{
   const q ="SELECT COUNT(id) FROM user";
   db.query(q,(err,data)=>{
     if(err) {return console.log(err)
    }else{
      return res.send(data)
    }
   })
 }

 const getPost2=(req,res)=>{
  const q =  `SELECT * FROM post_tip_sport WHERE game_type = "daily" `;
  db.query(q,(err,data)=>{
    if (err) return res.status(401).json({
      err:err
    })
    return (
      res.send(data))
  })
 }

const getPostMid = (req, res) => {
  const q = `SELECT * FROM post_tip_sport WHERE game_type = "midweek" `;
  db.query(q, (err, data) => {
    if (err) return res.status(401).json({
      err: err
    })
    return (
      res.send(data))
  })
}

 const getPost3=(req,res)=>{
  const q =  `SELECT * FROM post_result_sport `;
  
  db.query(q,(err,data)=>{
    if (err){
      console.error(err)}
    return (
      // res.status(200).json(data);
      res.send(data))
  })
 }



 const addPost1=(req,res)=>{
   const spots = "INSERT INTO post_tip_for(pair,condition,entry,take_profit,stop_loss,take_profit_no,stop_loss_no,trade_type) VALUES ?"

  const vale = req.body[0].map((app)=>([`${app.todo.pair}`,`${app.todo.condition}`,`${app.todo.entry}`,`${app.todo.takeProfit}`,`${app.todo.stopLoss}`,`${app.todo.TP_no_Of_Pips}`,`${app.todo.SL_no_Of_Pips}`,`${req.body[1].tradeType}`]))

  db.query(spots,[vale],(err,data)=>{
    if (err) return console.log(err)

    return console.log('prediction tips was uploaded Successful')

  })
 }

 const getSportTipBy =(req,res)=>{
    const gameNo = "SELECT "


 }


const addCrypto = (req, res) => {
 console.log(req.body[0])
  const spot = "INSERT INTO post_tip_crypto (c_pair,c_condition,c_entry,c_take_profit,c_stop_loss,c_take_profit_no,c_stop_loss_no,c_trade_type) VALUES ?"

  const val = req.body[0].map((app) => ([
    `${app.todo.pair}`, `${app.todo.condition}`, `${app.todo.entry}`, `${app.todo.takeProfit}`, `${app.todo.stopLoss}`, `${app.todo.Tp_No_Of_Pips}`, `${app.todo.Sl_No_Of_Pips}`,`${req.body[1].tradeType}`
  ]))
  db.query(spot, [val], (err, data) => {
    if (err) return console.log(err)

    return console.log('prediction tips was uploaded Successful')

  })
}

const addBinary = (req, res) => {
  console.log(req.body)
  // const spot = "INSERT INTO post_tip_binary (b_pair,b_condition,b_expired_time,b_trade_type) VALUES ?"

  // const values = req.body[0].map((app) => ([
  //   `${app.todo.pair}`, `${app.todo.condition}`, `${app.todo.expireTime}`, `${req.body[1].tradeType}`
  // ]))
  // console.log(values)

  // db.query(spot, [values], (err, data) => {
  //   if (err) return console.log(err)

  //   return res.send('prediction tips was uploaded Successful')

  // })
}

 const addPost2=(req,res)=>{
  const mike = "INSERT INTO post_result_sport(game_no,daily_profit,odd,action) VALUES (?)"
   const pips = req.body[1].earned ||req.body[2].loss
   const values1 = [req.body[0].gameNo,req.body[0].dailyProfit,req.body[0].odd,pips]

  db.query(mike,[values1],(err,data)=>{
    if (err){  return console.log(err)
  }else{
    return console.log('user has been created')

  }


  })
 }


 const updatePost = (req,res)=>{
  const regId = req.params.id;
   const accNum = req.body.accountNumber.toString()
  console.log(req.body)
   const pa = `UPDATE users SET  phone_number = '${req.body.phoneNumber}',country = '${req.body.country}',account_name = '${req.body.accountName}',account_number = '${accNum}',bank_name = '${req.body.bankName}' WHERE id = '${regId}'`

  db.query(pa,(err,data)=>{
    if(err){
      res.json(err)
        console.log(err)
    }else{
     res.send(data)
    console.log("update successful")}

  })
 }





 const getById =(req,res)=>{

  const regId = req.params.id;
  const pa = "SELECT *  FROM users (`username` = ?,`email` = ?, `password` = ?, `country` = ?,`phoneNumber` = ?) WHERE id = ? "

  // const valem = [
  //   req.body.username,
  //   req.body.email,
  //   req.body.password,
  //   req.body.country,
  //   req.body.phoneNumber
  // ]


  db.query(pa,(err,data)=>{

    if(err) return console.log(err)
    // res.json(err)
    // return res.json('Books has been Update successFully')
    return res.send(data)

  })

 }

 const addPost3=(req,res)=>{

  const tire = "INSERT INTO postForex (tradeNo,pair,condition,entryPoint,exitPoint,takeProfit) VALUES (?)"
  const tirem= [req.body.tradeNo,req.body.pair,req.body.condition,req.body.entryPoint,req.body.exitPoint,req.body.takeProfit]
  console.log(tirem)

  db.query(tire,[tirem],(err,data)=>{
    if(err) return console.log(err)

    return res.status(200).json('user has been created')

  })
 }

 const postResultForexPost =(req,res)=>{

  const forexResult = "INSERT INTO post_result_for(r_trade_no,r_pair,r_condition,r_entry_point,r_exit_point,r_take_profit,r_check) VALUES (?)"

  const check =req.body[1].earned || req.body[2].loss
  const results = [req.body[0].tradeNo,req.body[0].pair,req.body[0].condition,req.body[0].entryPoint,req.body[0].exitPoint,req.body[0].takeProfit,check]
    // console.log(check)
  db.query(forexResult,[results],(err,data)=>{
    if (err) return res.status(400).json({
      msg:err
    })

     return res.send('successful upload')
  })

 }


  const getResultForex =(req,res)=>{
              
    const files = "SELECT * FROM post_result_for"

    db.query(files,(err,data)=>{
      if(err){
        return res.status(401).json({
          err:err
        })
      }else{
        res.send(data)
      }
    })
  }

 const postResultCryptoPost =(req,res)=>{

  const forexResult1 = "INSERT INTO post_result_crypto(c_trade_no,c_pair,c_condition,c_entry_point,c_exit_point,c_take_profit,c_check) VALUES (?)"
   const pos = req.body[1].earned || req.body[2].loss
  const results = [req.body[0].tradeNo,req.body[0].pair,req.body[0].condition,req.body[0].entryPoint,req.body[0].exitPoint,req.body[0].takeProfit,pos]
  
  db.query(forexResult1,[results],(err,data)=>{
    if (err) return res.status(401).json({
      msg:err
    })

     return res.send('successful upload')
  })

 }


//  const postResultBinaryPost =(req,res)=>{

  // const forexResult2 = "INSERT INTO post_result_binary(b_trade_no,b_pair,b_condition,b_expire_time,b_profit) VALUES (?)"
  // const bins = req.body[1].earned || req.body[2].loss
  // const resulss = [req.body[0].tradeNo,req.body[0].pair,req.body[0].condition,req.body[0].expireTime,req.body[0].profit,bins]
  
  //  console.log(resulss)

  // db.query(forexResult2,[resulss],(err,data)=>{
  //   if (err) return console.log(err)

  //    return console.log('successful upload')
  // })

//  }

 const addPost=(req,res)=>{

  console.log(req.body[0])
  const rap = req.body[1].gameType
  const sportInfo = "INSERT INTO post_tip_sport(time,league,team_a,team_b,tip,odd,game_type) VALUES ?"
  const val = req.body[0].map((app)=>([
    `${app.todo.time}`,`${app.todo.league}`,`${app.todo.teamA}`,`${app.todo.teamB}`,`${app.todo.tip}`,`${app.todo.odd}`
  ,`${req.body[1].gameType}`]))

 console.log(val)

  db.query(sportInfo,[val],(err,data)=>{
    // if(err) return res.json(err)
    if (err) return console.log(err)

    // return console.log("user has been created")
    return console.log('sport detail inserted')
  
  })
 }

   const addCopon =(req,res)=>{

    const codes = "INSERT INTO coupon(betName,couponCode) VALUES (?)"

    const valin =[req.body.betName,req.body.couponCode]

    db.query(codes,[valin],(err,data)=>{
      if(err) return console.log(err)

      return console.log("post has been inserted")
    })

   }

   const getResultCrypto =(req,res)=>{

    const fip = "SELECT * FROM post_result_crypto"
       db.query(fip,(err,data)=>{
           if(err){
           console.error(err)
           }else{
            res.send(data)
           }
       })
   }

   const getResultBinary =(req,res)=>{

     const fip1= "SELECT * FROM post_result_binary"
     db.query(fip1, (err, data) => {
       if (err) {
        console.error(err)
       } else{
         res.send(data)
       }
     })

   }


   const getCopon =(req,res)=>{

    const codes = "SELECT * FROM coupon"

    db.query(codes,(err,data)=>{
      if (err) return res.send(err)
  
      return (
        // res.status(200).json(data);
        res.send(data))
      
    })

   }

   const getCount =(req,res)=>{
     const countNumId ="SELECT COUNT(id) AS id_count FROM users"

     db.query(countNumId,(err,data)=>{
       if(err) return res.json(err)

       return res.send(data)
     })

   }

 const deletePost=(req,res)=>{
  res.send("MR Kingsley is back")
 }





module.exports = { addPost, getTipCryptoM, getTipCryptoD, getPostMid, getTipFprex,getTipCrypto, getResultBinary, getResultForex, getResultCrypto, addBinary, getPosts,addCrypto,getPost,updatePost,deletePost,addPost1,getPost2,addPost2,getPost3,addPost3,addCopon,getCopon,postResultForexPost,postResultCryptoPost,getNum,getById,getCount}

