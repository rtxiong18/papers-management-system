import express from 'express';
import {User, Paper} from '../models/paperModel.js';

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

//change a password
router.post('/:email/change', async (request, response) =>{
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
        
        else if(
            request.body.password1 !== request.body.password2
        ) {
            return response.status(200).json('wrong passwords');
        }

        const {email} = request.params;

        const newUser = {
            email: email,
            password: request.body.password1
        };

        const result = await User.findOneAndUpdate({email:email}, newUser);
        

        return response.status(200).send({message: 'User updated sucessfully'});

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

//delete a user

router.delete('/:email/delete', async (request, response) => {
    try{
        const {email} = request.params;
        

        const result = await User.deleteMany({email:email})
        if(result){
            Paper.deleteMany({email:email})
            .then(()=>{
                response.status(200).json('Users deleted')
            })
        }



    }

    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});



export default router;