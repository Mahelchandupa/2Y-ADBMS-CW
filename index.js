const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const customerRoute = require("./routes/customer")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONOGO_URL,{
    
}).then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/api/customer",customerRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen("5000", ()=>{
    console.log("backend is running")
});


// Password: GnVyBPTDGSKU48A1 
