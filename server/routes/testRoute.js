import { getUser, createUser } from '../controllers/testController.js';
import express from 'express';

const testRouter = express.Router();

testRouter.get('/', getUser);
testRouter.post('/', createUser);

export default testRouter;


