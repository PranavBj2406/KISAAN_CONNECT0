import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';
import { updateProfilePicture, verifyToken } from '../controllers/profile.controller.js';

// Add with other routes

const router = express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.patch("/profile-picture", verifyToken, updateProfilePicture);

export default router;