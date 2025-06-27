import express from 'express';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    console.log(data);
    if (!data.success) {
        res.status(400).json({ message: "Incorrect input" });
        return;
       
    }
    const { name, email, password } = data.data;

    try {
        const existingUser = await prismaClient.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }

        const user = await prismaClient.user.create({
            data: { name, email, password },
        });

        res.json({message:"User Created Seccusfully ", userId: user.id });
        return ;


    } catch (e) {
         console.error(e);
         res.status(500).json({ message: "Server error" });
         return;

    }

});


app.post('/signin',async (req, res) => {

    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "incorrect input"
        })
        return;
    }
    const {email,password} = data.data;

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    if (user.password !== password) {
        res.status(400).json({ message: "Incorrect password" });
        return;
    }

    const userId = user.id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message:"User Signed in" ,token });

});

app.post('/room', middleware, (req, res) => {

    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "incorrect input"
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