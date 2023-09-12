const jwt = require('jsonwebtoken')
const secret = 'chuprehna'
const fetchUser = async (req, res, next) => {
  //  get user data from the jwt web token and add id to req object
  const token = req.header('auth-token')

  if (!token) {
    res.status(401).send({ error: '' })
  } else {
    try {
      const data = await jwt.verify(token, secret)
      req.user = data
      next()
    } catch (e) {
      res.status(201).send({ error: 'Please authenticate using a valid token' })
    }
  }
}
module.exports = fetchUser
