const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
const app= express();
const PORT = process.env.PORT||3000;
const connectDB= require('./DB/db');

const userRoutes =require('./Routes/userRoutes');
const bookRoutes =require('./Routes/bookRoutes');
const bookFilterRoutes=require('./Routes/booksFilterRoutes');
const bookRequestRoutes =require('./Routes/bookRequests');
const adminRoutes=require('./Routes/adminRoutes');
const feedbackRoutes=require('./Routes/feedbackRoutes');
const userHistoryRoutes=require('./Routes/userHistoryRoutes');
const cors = require('cors');

connectDB();


app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',userRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/filter/books',bookFilterRoutes)
app.use('/api/book-requests', bookRequestRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/feedback',feedbackRoutes);
app.use('/api/user-history',userHistoryRoutes);




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  });
  

app.listen(PORT,()=>{
    console.log("Server is running on PORT :",PORT);
})
