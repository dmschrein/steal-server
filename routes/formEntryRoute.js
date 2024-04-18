import express from 'express';

import router from express.Router()
import formEntryController from "../controllers/formEntryController"
import verifyJWT from '../middleware/verifyJWT'

route.use(verifyJWT)

router.route('/')
  .post(formEntryController.createNewFormEntry)

module.exports = router