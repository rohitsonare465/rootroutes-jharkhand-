    const express = require('express');
const router = express.Router();
const {
    getAllCulture,
    getCultureById,
    createCulture,
    seedCulture
} = require('../controllers/cultureController');
// const { protect, authorize } = require('../middleware/auth'); // Uncomment if auth is needed

router.route('/')
    .get(getAllCulture)
    .post(createCulture); // Add protect/authorize if needed

router.route('/seed')
    .post(seedCulture);

router.route('/:id')
    .get(getCultureById);

module.exports = router;
