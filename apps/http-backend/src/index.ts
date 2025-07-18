import express from 'express';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import jwt from 'jsonwebtoken';
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import cors from 'cors';
const app = express();

app.use(cors());


app.use(express.json());

app.post('/signup', async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    console.log(parsedData);
    if (!parsedData.success) {
        res.status(400).json({ message: "Incorrect input" });
        return;

    }
    const { name, email, password } = parsedData.data;

    try {
        const existingUser = await prismaClient.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }

        const user = await prismaClient.user.create({
            data: { name, email, password },
        });

        res.json({ message: "User Created Seccusfully ", userId: user.id });
        return;


    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server error" });
        return;

    }

});


app.post('/signin', async (req, res) => {

    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "incorrect input"
        })
        return;
    }
    const { email, password } = parsedData.data;

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
        res.status(403).json({ message: "Not authorized" });
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
        message: "User Signed in", token
    });

});

app.post('/room', middleware, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "incorrect input"
        })
        return;
    }

    const { slug } = parsedData.data;
    const userId = req.userId;
    try {


        const room = await prismaClient.room.create({
            data: {
                slug,
                AdminId: userId,
            }
        })

        res.json({
            roomId: room.id,
        })
    } catch (e) {
        res.status(411).json({ message: "Room already exist" });
        return;
    }
});

app.get("/chat/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);   
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy:{
            id:'asc'
        },
        take: 50,
    }); 
    res.json({
        messages
    })

})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;   
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        },
    }); 
    res.json({
       room
    })

})

const port = 3001;
app.listen(port, () => {
    console.log(`HTTP backend is running on port ${port}`);
});