const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/contact-us', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the contact us form data
const contactUsSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model for the contact us form data
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// Serve static files from the public folder
app.use(express.static('public'));

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submissions
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  
  // Create a new document using the ContactUs model
  const contactUs = new ContactUs({ name, email, message });
  
  // Save the document to the database
  contactUs.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving to database');
    } else {
      res.redirect('/thank-you.html');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
