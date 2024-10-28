import express from 'express'
import { signUp, signIn } from './controller/signUpSignIn.js';

const route = express.Router();

route.post("/signUp", signUp);
route.post("/signIn", signIn);

export default route;
