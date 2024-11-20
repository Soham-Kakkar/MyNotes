import { Router } from 'express';
import { register, login, logout, deleteUser, isLoggedIn  } from '../controllers/userController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/isLoggedIn', isLoggedIn);
router.post('/logout', logout);
router.delete('/delete-account', deleteUser );

export default router;