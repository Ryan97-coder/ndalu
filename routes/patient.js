const express = require('express');
const router = express.Router();

// Patients list route
router.get('/', (req, res) => {
  res.render('patients', { user: req.session.user });
});

// Individual patient route
router.get('/:id', (req, res) => {
  const patientId = req.params.id;
  // Fetch and render patient details based on the ID
  res.render('patientDetails', { patientId });
});

// Other patient routes...

module.exports = router;
