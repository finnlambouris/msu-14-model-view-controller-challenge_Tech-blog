const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/api/users/login", async (req, res) => {
  const userData = await User.findAll();
  res.json(userData);
});

router.post('/api/users/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      return res.status(400).send("Login failed. Please try again.");
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    if (!validPassword) {
      return res.status(400).send("Login failed. Please try again.");
    }

    return res.json(userData);

    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;
      
    //   res.json({ user: userData, message: 'You are now logged in!' });
    // });
  } catch {
    return res.status(400).send("Login failed. Please try again.");
  }
});

router.post("/api/users", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/api/users", async (req, res) => {
  const userData = await User.findAll();
  res.json(userData);
});

module.exports = router;