const express = require('express');
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require('../Controllers/bookControllers');
const { protect, librarian } = require('../Middlewares/authMiddleware');


const router = express.Router();

// Crud operations  on books by librarian and fetching books data by students.
router.route('/')
  .post(protect, librarian, addBook)
  .get(protect, getBooks);


router.route('/:id')
  .get(protect, getBook)
  .put(protect, librarian, updateBook)
  .delete(protect, librarian, deleteBook);

module.exports = router;
