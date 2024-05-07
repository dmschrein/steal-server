import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';
import rootRouter from './routes/root.js'; // Importing root router
import formEntryRoute from './routes/formEntryRoute.js'; // Importing form entry router
import authRouter from './routes/authRoutes.js';  
import { logEvents } from './middleware/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter); // Using imported root router
app.use('/form', formEntryRoute); // Using imported form entry router
app.use('/auth', authRouter);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});




// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN || "http://localhost:5173"
//   })
// )

// app.get('/test', (req, res) => {
//   res.json('Test Works')
// })

// // Register Route
// app.post("/register", async(req, res) => {
//   const {username, email, password, firstName, lastName, company, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy} = req.body
//   try {
//     const userInfo = await User.create({
//       username,
//       email,
//       password,
//       firstName,
//       lastName,
//       company,
//       marketingGoals,
//       marketingPlatforms,
//       marketingPainpoints,
//       marketingPainpointsWhy
//     })
//     res.json(userInfo)
//   } catch (error) {
//     res.status(422).json(error)
//   }
// })

// // Submit Route
// app.post("/submit", async(req, res) => {
//   const {industryCategories, companyValues, marketingGoals, marketingPlatforms, marketingPainpoints, marketingPainpointsWhy, brandPersonality, firstName, lastName, company, email, username, password} = req.body
//   try {
//     const quizUserInfo = await QuizUser.create({
//       industryCategories,
//       companyValues,
//       marketingGoals,
//       marketingPlatforms,
//       marketingPainpoints,
//       marketingPainpointsWhy,
//       brandPersonality,
//       firstName,
//       lastName,
//       company,
//       email,
//       username,
//       password
//     })
//     res.json(quizUserInfo)
//   } catch (error) {
//     res.status(422).json(error)
//   }
// })

// app.get('/blogs', (req, res) => {
//   res.send(blogs)
// })
// app.get('/blogs/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   // console.log(id)
//   const blog = blogs.filter(b => b.id === id);
//   // console.log(blog)
//   res.send(blog)
// })

// // subscribe route
// app.post('/subscribe', async (req, res) => {
//   const {email} = req.body;
//   if (!email) {
//     return res.status(400).send('Email is required.')
//   }
//   try {
//     const newEmail = new EmailInfo({ email })
//     await newEmail.save()
//     res.status(201).send('Subscription successful.')
//   } catch (error) {
//     if (error.code === 11000) {
//       req.status(409).send('Email already subscribed.')
//     } else {
//       res.status(500).send('Error subscribing email.')
//     }
//   }
// })


