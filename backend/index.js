import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import paperRoute from './routes/paperRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');

});

app.use('/', paperRoute);
app.use('/user', userRoute);

mongoose. connect(mongoDBURL)
    .then(() =>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });

    }).catch((error) => {
        console.log(error);
    });