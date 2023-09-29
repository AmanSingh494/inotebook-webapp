const express = require('express')
const router = express.Router()
const userCollection = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middlewares/fetchUser')

const secret = 'chuprehna'
// Route 1: creating a user
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name').notEmpty(),
    body('password', 'Password should at least be 8 characters').isLength({
      min: 8
    })
  ],
  async (req, res) => {
    const result = validationResult(req)
    let success = false
    if (result.isEmpty()) {
      console.log(req.body)
      // checking whether a person with the same email exists.
      const userCheck = await userCollection.find({ email: req.body.email })
      console.log(userCheck)
      try {
        // securing the password using bcrypt by making hash and salt
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        const user = await userCollection.create({
          name: req.body.name,
          email: req.body.email,
          password: hashPass
        })
        success = true
        const authToken = jwt.sign({ id: user._id }, secret)
        res.json({ success, authToken })
      } catch (e) {
        console.error(e)
        res.status(500).send(success, 'Some internal error occurred')
      }
      // .then(() => {
      //   res.send(`Hello ${req.body.name}`)
      // })
      // .catch((err) => {
      //   res.send(err.message)
      // })
    } else {
      res.send({ success, errors: result.array() })
    }
  }
)
// Route 2 :authenticating a user
router.post(
  '/login',
  [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    let success = false
    //  checking for validation errors
    const result = validationResult(req)
    if (!result.isEmpty()) {
      // res.send({ errors: result.array() })
      return res.status(400).json({ success, errors: result.array() })
    } else {
      const { email, password } = req.body
      try {
        let userCheck =
          (await userCollection.find({ email: email }).count()) > 0
        let user = await userCollection.find({ email: email })
        //  for comparing the password we have to use user[0].password as .find returns an array of objects found.
        if (!userCheck) {
          res.status(400).json({
            success,
            errors: 'Please try again with the correct credentials'
          })
        } else {
          // comparing password with bcrypt
          const passCompare = await bcrypt.compare(password, user[0].password)
          if (!passCompare) {
            res.json({
              success,
              errors: 'Please try again with the correct credentials'
            })
          } else {
            success = true
            const authToken = jwt.sign({ id: user[0].id }, secret)
            res.json({ success, authToken })
          }
        }
      } catch (e) {
        console.error(e.message)
        res.status(500).send('Some internal error occurred')
      }
    }
  }
)
//  route 3 : get details of logged in user
router.post('/getuser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userCollection.findById(userId).select('-password')
    res.send(user)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Some internal error occurred')
  }
})
module.exports = router
