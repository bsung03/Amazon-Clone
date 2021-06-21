import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';



dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    // eslint-disable-next-line no-undef
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get('/', (req, res) => {
    res.send("Server is ready");
});


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
});


// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'))
}



app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
});