// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });

  // If the user doesn't exist, send an error message
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare the password with the hash stored in the database
  const match = await bcrypt.compare(password, user.password);

  // If the passwords don't match, send an error message
  if (!match) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Create a JWT token with the user's email as the payload
  const token = jwt.sign({ email }, 'secret');

  // Send the token to the client
  res.json({ token });
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy the token on the client side
  res.clearCookie('token');

  // Redirect the user to the homepage
  res.redirect('/');
});
