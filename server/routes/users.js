const router = require('express').Router();
let User = require('../models/User');

router.route('/register').post((req, res) => {
  const { phoneNumber, email } = req.body;

  const newUser = new User({
    phoneNumber,
    email,
  });

  newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
