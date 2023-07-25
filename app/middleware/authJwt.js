const jwt = require('jsonwebtoken');

function verifyToken(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(403).send({
      message: 'No token provided!',
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SESSION_SECRET, (err) => {
    if (err) {
      return response.status(401).send({
        message: 'Unauthorized!',
      });
    }
    next();
  });
}

module.exports = verifyToken;
