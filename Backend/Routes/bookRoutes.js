const express = require('express');
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBookHistory,
  getLatestBooks
} = require('../Controllers/bookControllers');
const { protect, librarian,authorize } = require('../Middlewares/authMiddleware');


const router = express.Router();


// Crud operations  on books by librarian and fetching books data by students.
router.route('/')
  .post(protect, librarian, addBook)
  .get(protect, getBooks);


router.route('/:id')
  .get(protect, getBook)
  .put(protect, librarian, updateBook)
  .delete(protect, librarian, deleteBook);



router.get('/history/:bookId', protect, authorize('admin', 'librarian'), getBookHistory);


module.exports = router;
