const express=require("express");
const app=express();
const path=require('path');
const  bodyParser= require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/******************   mongodb   ********************/
const db=require("./db/connect.js");

/******************   static   ********************/
app.use('/static', express.static(path.join(__dirname, 'public')))

/******************   router config   ********************/
const home=require("./home/router/home.js");
const user=require("./home/router/user.js");
app.use("/api/home",home);
app.use("/api/user",user);

app.listen(3000,(res)=>{

	console.log('server start in '+3000)
})
