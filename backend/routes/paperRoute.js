import express from 'express';
import {Paper} from '../models/paperModel.js';
import { uploadMiddleware } from '../middlewares/MulterMiddleware.js';
import fs from 'fs';

const router = express.Router();

//create a new paper
router.post('/:email', uploadMiddleware.single('paperImage'), async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.journal
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, journal',
            });
        }

        const {email} = request.params;

        const newPaper = {
            email: email,
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            journal: request.body.journal,
            paperImage: request.file.originalname 
        };

        const paper = await Paper.create(newPaper);

        return response.status(201).send(paper);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

})

//get all papers
router.get('/:email', async (request, response) => {
    try{
        const {email} = request.params;

        const papers = await Paper.find({email: email});

        return response.status(200).json({
            count: papers.length,
            data: papers
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//get one paper from database by id
router.get('/:email/:id', async (request, response) => {
    try{

        const {email, id} = request.params;

        //const paper = await Paper.findById(id);
        const paper = await Paper.find({email: email, _id: id});

        return response.status(200).json(paper);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//update a paper

router.put('/:email/:id', uploadMiddleware.single('paperImage'), async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.journal
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, journal',
            });
        }

        const {email, id} = request.params;

        const newPaper = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            journal: request.body.journal,
            paperImage: request.file.originalname 
        };

        const result = await Paper.findOneAndUpdate({email:email, _id: id}, newPaper);
        fs.unlinkSync(`./public/uploads/${result.paperImage}`);
        
        if(!result){
            return response.status(404).json({message: 'Paper not found'});
        }

        return response.status(200).send({message: 'Paper updated sucessfully'});

    }

    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// delete a paper

router.delete('/:email/:id', async (request, response) => {
    try{
        const {email, id} = request.params;
        
        const result = await Paper.findOneAndDelete({email: email, _id: id});

        fs.unlinkSync(`./public/uploads/${result.paperImage}`);

        if(!result){
            return response.status(404).json({message: 'Paper not found'});
        }

        return response.status(200).send({message: 'Paper deleted sucessfully'});

    }

    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//delete a all papers of a user

// router.delete('/:email', async (request, response) => {
//     try{
//         const {email} = request.params;
        

//         Paper.deleteMany({email:email})
//         .then(()=>{
//             response.status(200).json('Papers deleted')
//         })


//     }

//     catch(error){
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

export default router;