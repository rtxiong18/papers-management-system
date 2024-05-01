import express from 'express';
import {Paper} from '../models/paperModel.js';

const router = express.Router();

//create a new paper
router.post('/', async (request, response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newPaper = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const paper = await Paper.create(newPaper);

        return response.status(201).send(paper);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

})

//get all papers
router.get('/', async (request, response) => {
    try{
        const papers = await Paper.find({});

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
router.get('/:id', async (request, response) => {
    try{

        const {id} = request.params;

        const paper = await Paper.findById(id);

        return response.status(200).json(paper);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//update a paper

router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const {id} = request.params;

        const result = await Paper.findByIdAndUpdate(id, request.body);
        
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

router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        
        const result = await Paper.findByIdAndDelete(id);

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

export default router;