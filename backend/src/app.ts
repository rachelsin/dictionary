import express from 'express';
import cors from 'cors';
import routerDictionary from './dictionary/router';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
const app = express();
const port = 9000; 

app.use(cors());
app.use(
    express.json({
        type: ['application/json', 'application/ld+json'],
    })
);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/dictionary', routerDictionary) 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
