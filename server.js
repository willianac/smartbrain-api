import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleGetProfile from "./controllers/getProfile.js";
import handleRanking from "./controllers/ranking.js";
import { handleImage, handleClarifaiCall } from "./controllers/image.js";

const app = express()
app.use(express.json())
app.use(cors())

const db = knex({
  client: 'pg',
  connection : {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'your_database'
  }
})

app.get('/', (req, res) => { res.send('Everything is right!') })
app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => handleGetProfile(req, res, db))
app.put('/image', (req, res) => handleImage(req, res, db))
app.post('/imageUrl', (req, res) => handleClarifaiCall(req, res))
app.get('/ranking', (req, res) => handleRanking(req, res, db))

const port = process.env.PORT || 3000
app.listen(port, ()=> {
  console.log(`app is running on port ${port}`)
})
