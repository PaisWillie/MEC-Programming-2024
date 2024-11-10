import { addUser, addUserLogin, getUserLogins } from "../controllers/firebaseController.js";
import express from 'express';

const firebaseRouter = express.Router();

firebaseRouter.post('/login', addUserLogin);
firebaseRouter.post('/', addUser);
firebaseRouter.get('/', getUserLogins);

export default firebaseRouter;
