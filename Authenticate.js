// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  // If the token doesn't exist, send an error message
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    // Verify the token and extract the payload
    const payload = jwt.verify(token, 'secret');

    // Attach the payload to the request object
    req.payload = payload;

    // Call the next middleware function
    next();
  } catch (err) {
    // If the token is invalid, send an error message
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});
