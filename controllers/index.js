const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const apiRoutes = require('./api');
const blogRoutes = require('./blogpostRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogpost', blogRoutes);

module.exports = router;