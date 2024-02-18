import express from 'express';
import mongoose from 'mongoose';
import User from './Models/User.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import formRouter from './routes/form.js'
import jwt from 'jsonwebtoken'

const app = express();

const main = async () => {
    try {
        await mongoose.connect("mongodb+srv://teamwon69:Bacteria12.@cluster0.sd0hbvs.mongodb.net/?retryWrites=true&w=majority")
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
await main();


// for parsing post request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req,res)=>{
    res.send('hello world');
})

app.use('/auth', authRouter)

app.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
    }
})

app.use('/user', userRouter)
app.use('/form', formRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: 'URL Not Found' });
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});