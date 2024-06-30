const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
const app= express();
const PORT = process.env.PORT||3000;
const connectDB= require('./DB/db');
const userRoutes =require('./Routes/userRoutes');
const bookRoutes =require('./Routes/bookRoutes');

connectDB();


app.use(express.json());


// Routes
app.use('/api/auth',userRoutes);
app.use('/api/books',bookRoutes);


app.listen(PORT,()=>{
    console.log("Server is running on PORT :",PORT);
})
