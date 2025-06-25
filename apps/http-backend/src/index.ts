import express  from 'express';
import { middleware } from './middleware';
import { JWT_SECRET } from './config';
import jwt from 'jsonwebtoken';

const app = express();
interface User {
    userId: number;
};

app.post('/signup', (req, res) => {

    //db call to create user
    res.json({
        userId: 1,
    });
 
});


app.post('/signin', (req, res) => {
   const userId = 1;
   const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({token});

    
    
});

app.post('/room',middleware,(req,res)=>{
//db call to create room
res.json({
    roomId: 673444,
})
});

const port = 3001;
app.listen(port, () => {
  console.log(`HTTP backend is running on port ${port}`);
});