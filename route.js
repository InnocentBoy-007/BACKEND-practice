import express from 'express'
import { signUp, signIn } from './controller/signUpSignIn.js';
import { getUserprofile, patchUsers, deleteUsers, updatePassword } from './controller/editProfile.js';

const route = express.Router();

route.post("/signUp", signUp);
route.post("/signIn", signIn);

route.get("/getUsers/:id", getUserprofile);
route.patch("/editUsers/:id", patchUsers);
route.delete("/deleteUsers/:id", deleteUsers);
route.patch("/updatePassword/:id", updatePassword);

export default route;
