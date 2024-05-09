const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const blogpostRoutes = require('./blogpostRoutes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;