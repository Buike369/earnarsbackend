const mysql = require('mysql')

 const db = mysql.createPool({
    connectionLimit:90,
    host:"127.0.0.1",
    user: "betproject",
     password: "Kingsley369",
     database: "betproject"
   
})
module.exports = {db}

