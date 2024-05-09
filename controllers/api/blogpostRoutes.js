const router = require('express').Router();
const { Blogpost } = require('../../models');

router.get("/", async (req, res) => {
  const blogData = await Blogpost.findAll();
  res.json(blogData);
});

module.exports = router;