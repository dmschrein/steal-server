import express from 'express';
import { createNewFormEntry } from "../controllers/formEntryController.js";  // Correctly import named export
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

//router.use(verifyJWT); not needed to create a new form entry

router.post('/', createNewFormEntry);  // Use the named export directly

export default router;
