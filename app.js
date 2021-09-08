const express = require('express');
const app = express();
require('./database/dbConnection');

const userRouter = require('./routers/userRouter');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res)=>{
    res.send("asdasd");
});

app.use('/api/users', userRouter);


app.listen(3000, ()=>{
    console.log("3000 Portu Dinlemede");
});