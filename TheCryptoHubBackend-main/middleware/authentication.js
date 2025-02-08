
const jwt = require('jsonwebtoken')
//const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // check header
  console.log("Req is .......................... ",req.headers);
  console.log("Req body is.....",req.body._id);
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(201).json({success:false, message: 'Authentication Failed' });
  }
  
  const token = authHeader.split(' ')[1]; // Split and get the token  
if (!token || token === '' || token === 'null' || token === 'undefined')
{
  return res.status(201).json({success:false,  message: 'Authentication Failed' });
}
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    
    // attach the user to the job routes
    req.body.user = { userId: payload.userId, name: payload.name , category: payload.category }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Authentication Failed' });
  }
}

module.exports = auth;
