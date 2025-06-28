import { Router } from 'express';
import protect from '../middleware/auth/protect.js';
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  searchContact,
  updateContact,
} from '../controllers/contactController.js';
import upload from '../utils/upload.js';
import { validate } from '../middleware/validate.js';
import { createContactSchema, updateContactSchema, searchContactSchema, } from '../validation/contactValidation.js';

const router = Router();

//* Route middleware
router.use(protect);

//* Routes
router.get('/getContacts', getContacts);
router.get('/getContact/:id', getContact);

router.post('/createContact',
  upload.single('image'),
  validate(createContactSchema),
  createContact);

router.post('/searchContact', validate(searchContactSchema), searchContact);

router.put('/updateContact/:id',
  upload.single('image'), validate(updateContactSchema,), updateContact);

router.delete('/deleteContact/:id', deleteContact);

export default router;
