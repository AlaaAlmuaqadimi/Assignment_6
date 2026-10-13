const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/collectionController');

router.post('/collection/books', ctrl.createExplicitCollection);
router.post('/collection/authors', ctrl.createImplicitCollection);
router.post('/collection/logs/capped', ctrl.createCappedCollection);
router.post('/collection/books/index', ctrl.createIndex);

module.exports = router;
