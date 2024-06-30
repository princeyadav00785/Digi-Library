const express = require('express');
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require('../Controllers/bookControllers');
const { createBookRequest, respondToBookRequest ,getAllRequests } = require('../Controllers/bookRequestControllers');
const { protect, librarian ,authorize } = require('../Middlewares/authMiddleware');


const router = express.Router();

// Crud operations  on books by librarian and fetching books data by students.
router.route('/')
  .post(protect, librarian, addBook)
  .get(protect, getBooks);

router.route('/:id')
  .get(protect, getBook)
  .put(protect, librarian, updateBook)
  .delete(protect, librarian, deleteBook);


  // Student creates a book request
router.post('/request', protect, createBookRequest);

// Librarian responds to a book request
router.patch('/request/:id', protect, authorize('librarian'), respondToBookRequest);

// Librarian handles the return of a book
router.patch('/return/:id', protect, authorize('librarian'), respondToBookRequest);

router.get('/requests',protect,authorize('libraian'),getAllRequests);

module.exports = router;
