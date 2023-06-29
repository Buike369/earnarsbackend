const mysql = require('mysql')

 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kingsley369",
    database:"betproject"

})
module.exports = {db}