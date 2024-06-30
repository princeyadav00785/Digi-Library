const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middlewares/authMiddleware');
const UserController = require('../Controllers/userController');
const {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
  } = require('../Controllers/bookControllers');


// Admin-only routes FOR User Management
router.get('/users', protect, authorize('admin', 'librarian'), UserController.getAllUsers);
router.get('/users/:userId', protect, authorize('admin', 'librarian'), UserController.getUserById);
router.patch('/users/:userId', protect, authorize('admin'), UserController.updateUser);
router.delete('/users/:userId', protect, authorize('admin'), UserController.deleteUser);

// Admin-only routes For Books Management
router.get('/books', protect, authorize('admin'), getBooks);
router.post('/books', protect, authorize('admin'), addBook);
router.get('/books/:bookId', protect, authorize('admin'), getBook);
router.patch('/books/:bookId', protect, authorize('admin'), updateBook);
router.delete('/books/:bookId', protect, authorize('admin'), deleteBook);

// Admin-only routes FOR Request Management 
router.get('/requests', protect, authorize('admin', 'librarian'), RequestController.getAllRequests);
router.patch('/requests/:requestId', protect, authorize('admin', 'librarian'), RequestController.respondToRequest);

// 

module.exports = router;
