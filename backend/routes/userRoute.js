import { Router } from 'express';
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from '../controllers/userController.js';
import protect from '../middleware/auth/protect.js';
import upload from '../utils/upload.js';
import { validate } from '../middleware/validate.js';
import {
  registerSchema,
  loginSchema,
  profileSchema,
} from '../validation/userValidation.js';

const router = Router();

router.post(
  '/register',
  upload.single('image'),
  validate(registerSchema),
  registerUser
);
router.post('/login', validate(loginSchema), loginUser);
router.post('/logout', logoutUser);

router.get('/profile', protect, getProfile);
router.put(
  '/profile',
  protect,
  upload.single('image'),
  validate(profileSchema),
  updateProfile
);

export default router;
