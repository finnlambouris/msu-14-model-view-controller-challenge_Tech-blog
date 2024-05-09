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
      blogpost: blogpost,
      user_id: req.session.user_id,
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

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Blogpost.destroy({ where: { id: req.params.id } });
    return res.status(200).json(deletedPost);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.get('/:id/update', async (req, res) => {
  const blogData = await Blogpost.findByPk(req.params.id, {
    include: [{model: User}, {model: Comment, include: {model: User}}]
  });
  const blogpost = blogData.get({ plain: true });
  
  res.render("editPost", {
    blogpost: blogpost,
  });
});

router.put('/:id/update', async (req, res) => {
  const blogData = await Blogpost.update({
    title: req.body.title,
    body: req.body.body,
  },
  {
    where: { id: req.params.id }
  },
);
  return res.status(200).json(blogData);
});

module.exports = router;