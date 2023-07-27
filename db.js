const mysql = require('mysql')

 const db = mysql.createPool({
    connectionLimit:90,
   host: "127.0.0.1",
   user: "betproject",
     password: "Kingsley369",
     database: "betproject"
   
})

db.getConnection((err,connection)=>{
   if(err){
      console.log(err)
   }else{
      const pat = "ALTER TABLE users ADD COLUMN  account_name VARCHAR(255), ADD COLUMN account_number INT(11),ADD COLUMN bank_name VARCHAR(255)"
      db.query(pat, (err, result) => {
         if (err) {
            console.log(err)
         }else{

            return console.log("table created")
         }
      })
      connection.release();
   }
})

module.exports = {db}




