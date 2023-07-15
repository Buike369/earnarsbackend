const mysql = require('mysql')

 const db = mysql.createConnection({
    host:"localhost",
    user:"betproject",
    password:"Kingsley369",
    database:"betproject"

})
module.exports = {db}