const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../config')

const User = require('../users/users-model')


const restricted = (req, res, next) => {
  const token = req.headers.authorization

  if(token){
      return jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          next({status: 401 , message: 'token invalid'}) 
          console.log(token)
        } else {
          req.decodedJwt = decoded
          console.log( req.decodedJwt)
          next()
        }
        })
      } else {
          next({status:401, message: "token required"})  
      }
      
      
     /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};

const checkUsernameExists = async (req, res, next) => {
  try{
    const [user] = await User.findBy({ username : req.body.username })
    if(user){
      return res.status(400).json({message: 'username already taken'})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  restricted,
  checkUsernameExists
}