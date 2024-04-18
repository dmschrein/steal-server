import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { logger, logEvents } from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import mongoose from 'mongoose';
import connectDB from './config/dbConn';
const PORT = process.env.PORT || 3500

// const User = require("./models/User")
// const QuizUser = require("./models/QuizUser")
// const blogs = require('./blog/blogsData.json')

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/form', require('./routes/formEntryRoute'))

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

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})




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


