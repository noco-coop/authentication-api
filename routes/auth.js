const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const {
  verify,
  code
} = require('../controllers/auth');

router.post('/auth', verify)
router.get('/code', code)
router.get('/healthz', (req, res) => res.json({ success: true }))

module.exports = router;
