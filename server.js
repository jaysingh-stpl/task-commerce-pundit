const express     = require('express');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const passport    = require('passport');
const users       = require('./server/routes/api/users');
const path        = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./server/config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./server/config/passport')(passport);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Use Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
