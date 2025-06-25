import express  from 'express';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';
import { CreateUserSchema,SigninSchema,CreateRoomSchema } from '@repo/common/types';

const app = express();


app.post('/signup', (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"incorrect input"
        })
        return;
    }

    res.json({
        userId: 1,
    });
 
});


app.post('/signin', (req, res) => {

    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"incorrect input"
        })
        return;
    }

   const userId = 1;
   const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({token});

    
    
});

app.post('/room',middleware,(req,res)=>{

    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"incorrect input"
        })
        return;
    }

res.json({
    roomId: 673444,
})
});

const port = 3001;
app.listen(port, () => {
  console.log(`HTTP backend is running on port ${port}`);
});