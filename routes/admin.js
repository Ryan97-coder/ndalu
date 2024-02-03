const express = require('express');
const router = express.Router();

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  if (req.session.user && req.session.user.usertype === 'a') {
    res.render('admin/dashboard', { user: req.session.user });
  } else {
    res.redirect('/login'); // Redirect to login if not authenticated
  }
});

// Other admin routes...

module.exports = router;
