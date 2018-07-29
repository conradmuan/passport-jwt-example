import * as process from 'process';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import passport from 'passport';


import getUser from './usermodel';
import configPassport from './passport';


dotenv.config();
const app = express();

configPassport();

app.use(bodyParser.json());

app.get('/', (req, res) => res.json({msg: 'hello world'}));

app.post('/auth', async (req, res) => {
  try {
    const potentialUser = await getUser(req.body.user, req.body.password);

    const token = jwt.sign(potentialUser, process.env.PASSPORT_SECRET);
    return res.json({ potentialUser, token });
  } catch (error) {
    return res.status(400).json({
      message: 'Cannot auth'
    });
  }
});

app.get('/user', passport.authenticate('jwt', {session: false}), async (req, res) => {
  return res.json({
    message: 'user resource'
  });
});


app.listen(process.env.PORT || 3000, () => console.log(`app started`));