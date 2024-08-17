import express from 'express';
import { signUp, signIn, signInWithGoogle } from '../controller/auth.controller.js';
import { signOut } from '../controller/user.contriller.js';

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/google',signInWithGoogle);
router.get('/signout', signOut)

export default router;