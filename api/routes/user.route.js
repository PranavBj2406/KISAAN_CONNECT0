import express from 'express';
import {getUserByAadharCard,test} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/',test)

router.get('/:id',getUserByAadharCard)

export default router;
