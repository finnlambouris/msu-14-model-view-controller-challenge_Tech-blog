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

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  } else {
    return res.render("login");
  }
});

router.post('/login', async (req, res) => {
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

router.post("/signup", async (req, res) => {
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

router.get("/dashboard", async (req, res) => {  
  if(req.session.logged_in) {
    const userBlogposts = await Blogpost.findAll({ 
      where: { user_id: req.session.user_id }, include: [{ model: User }], 
    });
    const userBlog = userBlogposts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      logged_in: req.session.logged_in,
      userBlog: userBlog,
    });
  } else {
    res.redirect('/login');
  }
});

router.post("/dashboard", async (req, res) => {
  try {
    const blogpostData = await Blogpost.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    });
    return res.status(200).json(blogpostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard/post", (req, res) => {  
  console.log("hi");
  return res.render("createPost");
});

module.exports = router;