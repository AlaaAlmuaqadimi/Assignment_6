const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookController');

router.post('/books', ctrl.insertBook);
router.post('/books/batch', ctrl.insertBatch);
router.post('/logs', ctrl.insertLog);
router.patch('/books/:title', ctrl.updateBookYear);
router.get('/books/title', ctrl.findByTitle);
router.get('/books/year', ctrl.findByYearRange);
router.get('/books/genre', ctrl.findByGenre);
router.get('/books/skip-limit', ctrl.skipLimitSort);

module.exports = router;
