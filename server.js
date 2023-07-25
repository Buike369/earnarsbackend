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
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy


function generateReferralCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
}

const referralCode = generateReferralCode(8);
const port = process.env.PORT || 8080
app.use(express.json())
app.use(session({
  secret:"your-secret-key", resave:true, saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID:"451426581815-ms0de6c6i4mk58d9k5d3e44q9ipqufq7.apps.googleusercontent.com",
  clientSecret:"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",
  callbackUrl:"https://tea.earnars.com/auth/google/callback"
},
async (accessToken,refreshToken,Profile,done)=>{
  try{
const user ={
 id:Profile.id,
 name:Profile.displayName,
 email:Profile.emails[0].value,
 password:Profile.password
};
    const pr = "SELECT * FROM users WHERE email = ?"
    db.query(pr, [user.email], (err, data) => {
      if (err) {
      console.log(err)
      }
      if (data.length > 0) {
        return res.json('User already exist')
      } else {
        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        const qa = "INSERT INTO users(`username`,`email`,`password`,`referral_code`) VALUES (?)"

        const values = [user.name, user.email, hash, referralCode]
        db.query(qa, [values], (err, data) => {
          if (err) {
          console.log(err)
          } else {
            res.json("user has been created")
          }

        })
      }


    })
    return done(null,user)
    
  }catch(error){
     return done(error)
  }
}))

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

app.get('https://tea.earnars.com/auth/google',passport.authenticate('google',{ scope: ['profile', 'email']}))

app.get("https://tea.earnars.com/auth/google/callback",passport.authenticate('google',{
  successRedirect: '/',
  failureRedirect: '/',
}))


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
 
    runJob
})