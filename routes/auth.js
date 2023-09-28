import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/users.js'

import verifyAuth from "../middlewares/veryAuth.js";

const SECRET_KEY = process.env.SECRET_KEY

function getExpiration() {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 60)
  return d.getTime()
}

const router = Router()

router.get('/isTokenValid', verifyAuth, async (req, res) => {
  try {
    if (req.id) {
      res.status(200).json({
        valid: true,
        status: 200,
        message: "Token is valid"
      })
    }
  } catch (error) {
    res.status(400).json({
      valid: false,
      status: 400,
      error: `Token is invalid`,
      database_message: error.message,
    })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      hash,
      handle: username,
    })
    const data = {
      id: user._id,
      handle: user.handle,
      exp: getExpiration(),
    }
    const token = jwt.sign(data, SECRET_KEY)

    return res.status(200).json({
      status: 200,
      message: `Successfully created user: ${user.handle}`,
    }) 
  } catch (error) {
    res.status(400).json({
      status: 400,
      error: `Unable to create user`,
      database_message: error.message,
    })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ handle: username })

    if (!user) {
      throw new Error("User not found");
    }

    const hash = user.hash
    const result = await bcrypt.compare(password, hash)

    if (!result) {
      throw new Error("Incorrect password")
    }

    const data = {
      id: user._id,
      handle: user.handle,
      exp: getExpiration(),
    }
// SEND USER ID TO FRONT END TO STORE IN LOCAL STORAGE

    const token = jwt.sign(data, SECRET_KEY)

    return res.status(200).json({
      status: 200,
      message: `Successfully signed in @${user.handle}`,
      token: token,
      userId: user._id
    })
  
  } catch (error) {
    if (error.status === 401) {
      res.status(401).json({
        message: error.message
      })
    }
    res.status(404).json({
      status: 404,
      error: `User not found`,
      database_message: error.message,
    })
  }
})

export default router