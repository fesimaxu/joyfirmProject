import { Router } from 'express';
import { createUserData, loginUser } from '../controller/user'
const router = Router();

/* POST Users listing. */
router.post('/register', createUserData);
router.post('/login', loginUser);



export default router;
