const express = require('express');
const errorMiddleware = require('./middleware/errorMiddleware');
require('./database/dbConnection');

const app = express();
const userRouter = require('./routers/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res)=>{
    res.send("asdasd");
});

app.use('/api/users', userRouter);


app.use(errorMiddleware);

app.listen(3000, ()=>{
    console.log("3000 Portu Dinlemede");
});