const router = require('express').Router();
const { Blogpost, Comment, User } = require('../models/index.js');

router.get('/:id', async (req, res) => {
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
    return res.redirect("/login");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      blogpost_id: req.params.id,
    });
    return res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;