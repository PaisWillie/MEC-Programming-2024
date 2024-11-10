import { addUser, addUserLogin, getUserLogins, deleteLogin } from "../controllers/firebaseController.js";
import express from 'express';

const firebaseRouter = express.Router();

firebaseRouter.delete('/', deleteLogin);
firebaseRouter.post('/login', addUserLogin);
firebaseRouter.post('/', addUser);
firebaseRouter.get('/', getUserLogins);

export default firebaseRouter;
