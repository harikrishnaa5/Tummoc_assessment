const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
require("dotenv").config()


//Connect to database
try{
    mongoose.connect(process.env.MONGOOSE, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
      console.log("Connected to mongoose");
}catch(error){
    console.log("Connection to database failed");
}

// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))

//setup server to listen on port 8080
app.listen(process.env.PORT || 8080, () => {
    console.log(`server is live on port ${process.env.PORT}`);
})
app.use("/user", userRoutes)
