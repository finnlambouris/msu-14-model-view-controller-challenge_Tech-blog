const router = require('express').Router();

router.use("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;