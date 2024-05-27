import express from 'express';
import {User} from '../models/paperModel.js';

const router = express.Router();


//create a new user
router.post('/register', async (request, response) =>{
    try{
        if(
            !request.body.email ||
            !request.body.password1 ||
            !request.body.password2
        ) {
            return response.status(400).send({
                message: 'Send all required fields: email, password',
            });
        }

        User.findOne({email: request.body.email}).
        then(user => {
            if(user){
                return response.status(200).json('User existed');
            }

            else if(
                request.body.password1 !== request.body.password2
            ) {
                return response.status(200).json('wrong passwords');
            }

            else{
                const newUser = {
                    email: request.body.email,
                    password: request.body.password1,
                };
                User.create(newUser).
                then(user => response.status(201).send(user))
            }
        })

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

})

//login for a user
router.post('/login', async (request, response) => {
    try{
        if(
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: email, password',
            });
        }

        const user = await User.findOne({email: request.body.email});

        if (user.password === request.body.password){
            return response.status(200).json('success')
        }

        else{
            return response.status(200).json('wrong password')
        }
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



export default router;