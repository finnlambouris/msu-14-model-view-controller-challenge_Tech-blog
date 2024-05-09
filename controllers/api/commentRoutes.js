const router = require('express').Router();
const { Comment } = require('../../models');

router.get("/", async (req, res) => {
  const commentData = await Comment.findAll();
  res.json(commentData);
});

module.exports = router;