const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Update with your MySQL username
  password: '', // Update with your MySQL password
  database: 'doctors_appointments',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', connection.threadId);
});

// Middleware
const authenticateUser = (req, res, next) => {
  // Check if user is authenticated (You may use a session or token-based authentication)
  if (/* Check authentication logic */) {
    // Check if user is an admin
    if (req.user.usertype === 'a') {
      return next();
    } else {
      res.redirect('/login'); // Redirect to login if not admin
    }
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
};

app.use('/admin', authenticateUser);

// Admin dashboard
app.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

// Other admin routes...

// Routes
app.get('/', (req, res) => {
  res.redirect('/doctors');
});

app.get('/doctors', (req, res) => {
  connection.query('SELECT * FROM doctor', (err, doctors) => {
    if (err) {
      console.error(err);
    } else {
      res.render('doctors', { doctors });
    }
  });
});

app.get('/patients', (req, res) => {
  connection.query('SELECT * FROM patient', (err, patients) => {
    if (err) {
      console.error(err);
    } else {
      res.render('patients', { patients });
    }
  });
});

app.get('/appointments', (req, res) => {
  connection.query('SELECT * FROM appointment', (err, appointments) => {
    if (err) {
      console.error(err);
    } else {
      res.render('appointments', { appointments });
    }
  });
});

app.get('/schedule/:docid', (req, res) => {
  const docid = req.params.docid;
  connection.query('SELECT * FROM schedule WHERE docid = ?', [docid], (err, schedules) => {
    if (err) {
      console.error(err);
    } else {
      res.render('schedule', { docid, schedules });
    }
  });
});

app.post('/appointments', (req, res) => {
  const { pid, scheduleid, appodate } = req.body;

  connection.query(
    'INSERT INTO appointment (pid, scheduleid, appodate) VALUES (?, ?, ?)',
    [pid, scheduleid, appodate],
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/appointments');
      }
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
