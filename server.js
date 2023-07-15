require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth.js')
const postRoutes = require('./routes/posts.js')
const userRoutes = require('./routes/users.js')
const paymentRoutes = require('./routes/flutterwaves.js')
const { runJob } = require('./controllers/user.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const {db} = require('./db.js')


const port = process.env.PORT || 8080
app.use(express.json())

var allowedOrigins = [
  "http://localhost:3000",
  "https://www.earnars.com",
  "https://earnars.com"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin." +
          origin;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// app.use(cors({
//     origin:"http://localhost:3000",

// }))
app.use(cookieParser())
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)
app.use("/api/flutterwave", paymentRoutes)


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
 
    runJob
})