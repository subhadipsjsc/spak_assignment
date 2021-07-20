const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const CONFIG = require('./config')

mongoose
  .connect(CONFIG.MONGO_URL,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true })
  .then(() => console.log('---- MongoDB Connected'))
  .catch(err => {
    // console.log(err)
    console.log("---- mongodb connection error")
  });

const {verifyToken} = require('./helper/jwt')
const app = express();


/*===================================================================
                    Middleware initilization         
==================================================================== */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


/*===========================================================================
---------------------------------  routes - -----------------------------
=============================================================================*/
app.get('/',function (req, res) {
  ping = {status : 'live' , time :new Date().getTime() }
  res.status(200).send(ping);
})


app.use('/user', require('./modules/user/routes'));
app.use('/list', verifyToken , require('./modules/list/routes'));

/*===========================================================================
---------------------------------  Run Server - -----------------------------
=============================================================================*/

const PORT = 8000
app.listen( PORT  , ()=>{
    console.log('---- Server started , Listing on PORT : ',PORT)
});