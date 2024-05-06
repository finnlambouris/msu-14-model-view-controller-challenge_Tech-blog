const router = require('express').Router();

router.use("/", (req, res) => {
  res.send("<h1>Test</h1>")
});

module.exports = router;