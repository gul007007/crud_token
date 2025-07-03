import {login, refreshToken} from '../controller/loginController.js';
import  express from 'express';

const router = express.Router();

router.post('/', login);
router.post('/token', refreshToken);

export default router;