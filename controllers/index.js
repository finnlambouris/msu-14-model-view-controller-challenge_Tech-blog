const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models/index.js');
const bcrypt = require('bcrypt');

router.get("/", async (req, res) => {
  const blogposts = await Blogpost.findAll({
    include: [{ model: User }],
  });
  const blog = blogposts.map((post) => post.get({ plain: true }));
  
  res.render("homepage", {
    logged_in: req.session.logged_in,
    blog: blog
  });
});

router.get('/blogpost/:id', async (req, res) => {
  const blogData = await Blogpost.findByPk(req.params.id, {
    include: [{model: User}, {model: Comment, include: {model: User}}]
  });
  const blogpost = blogData.get({ plain: true });

  if (req.session.logged_in) {
    return res.render("blogpost", {
      logged_in: req.session.logged_in,
      blogpost: blogpost
    });
  } else {
    return res.render("login");
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    logged_in: req.session.logged_in
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.render("homepage");
  } else {
    return res.render("login");
  }
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/api/users/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
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
      username: req.body.username,
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

module.exports = router;