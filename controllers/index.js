const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  } else {
    return res.render("login");
  }
});

router.post('/api/users/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).json(userData);
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    if (!validPassword) {
      return res.status(400).json(userData);
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.status(200).json(userData);
    });

  } catch (err) {
    return res.status(400).json(err);
  }
});

router.post("/api/users", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/api/users", async (req, res) => {
  const userData = await User.findAll();
  res.json(userData);
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;