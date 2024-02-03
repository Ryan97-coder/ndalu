const express = require('express');
const router = express.Router();

// Doctors list route
router.get('/', (req, res) => {
  res.render('doctors', { user: req.session.user });
});

// Individual doctor route
router.get('/:id', (req, res) => {
  const doctorId = req.params.id;
  // Fetch and render doctor details based on the ID
  res.render('doctorDetails', { doctorId });
});

// Other doctor routes...

module.exports = router;
