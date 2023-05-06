const jwt = require('jsonwebtoken');

function getIdFromToken(req){
  const decoded = jwt.verify(req.cookies['jwtToken'], process.env.JWT_SECRET);
  return decoded._id;
}

module.exports = getIdFromToken;