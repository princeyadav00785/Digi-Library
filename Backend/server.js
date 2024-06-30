const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
const app= express();
const PORT = process.env.PORT||3000;
const connectDB= require('./DB/db');
const userRoutes =require('./Routes/userRoutes');

connectDB();


app.use(express.json());


// Routes
app.use('/api/auth',userRoutes);


app.listen(PORT,()=>{
    console.log("Server is running on PORT :",PORT);
})
