const express=require('express');
const dotenv=require('dotenv')
const colors=require('colors')
const connectDB = require('./config/db');
const morgan = require('morgan');
const app=express();
const registerRoute=require('./routes/authRouter');
const categoryRoute=require('./routes/categoryRoute');
const productRoute=require('./routes/productRouter')
const cors=require('cors');
 

dotenv.config();
connectDB();
 
const PORT=process.env.PORT || 5000;


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
 
//routers
app.use('/api/v1/auth',registerRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/products',productRoute)

app.get('/',(req,res)=>{
    res.send({name:'arjun',project:'Ecommerce'})
})


app.listen(PORT,()=>{
    console.log(`server has started on port no ${PORT}`.bgCyan.white)
})