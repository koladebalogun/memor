import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post('/signin', signin);

router.post('/signup', signup);

// //These are post routes because we have to send all the details from the form in the front end into the backend

export default router;
