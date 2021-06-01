import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://Brandon:stephanie12@cluster0.gx035.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.get('/', (req,res) => {
    res.send("Server is ready");
});


// eslint-disable-next-line no-unused-vars
app.use((err,req,res,next) => {
    res.status(500).send({message: err.message})
});


// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`)
});