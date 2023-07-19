const mysql = require('mysql')

 const db = mysql.createPool({
    connectionLimit:90,
    host:"localhost",
    user:"betproject",
    password:"Kingsley369",
    // database:"betproject" 

})
module.exports = {db}