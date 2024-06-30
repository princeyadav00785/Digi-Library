const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../Middlewares/authMiddleware');
const UserController = require('../Controllers/userController');
const bookControllers = require('../Controllers/bookControllers');
const RequestController=require('../Controllers/bookRequestControllers')
const DashboardController = require('../Controllers/dashboard.controllers');


// Admin-only routes FOR User Management
router.get('/users', protect, authorize('admin', 'librarian'), UserController.getAllUsers);
router.get('/users/:userId', protect, authorize('admin', 'librarian'), UserController.getUserById);
router.patch('/users/:userId', protect, authorize('admin'), UserController.updateUser);
router.delete('/users/:userId', protect, authorize('admin'), UserController.deleteUser);

// Admin-only routes For Books Management
router.get('/books', protect, authorize('admin'), bookControllers.getBooks);
router.post('/books', protect, authorize('admin'), bookControllers.addBook);
router.get('/books/:bookId', protect, authorize('admin'), bookControllers.getBook);
router.patch('/books/:bookId', protect, authorize('admin'), bookControllers.updateBook);
router.delete('/books/:bookId', protect, authorize('admin'), bookControllers.deleteBook);

// Admin-only routes FOR Request Management 
router.get('/requests', protect, authorize('admin', 'librarian'), RequestController.getAllRequests);
router.patch('/requests/:requestId', protect, authorize('admin', 'librarian'), RequestController.respondToRequest);

// DashBoard Routes...
router.get('/dashboard/stats', protect, authorize('admin', 'librarian'), DashboardController.getDashboardStats);


module.exports = router;
