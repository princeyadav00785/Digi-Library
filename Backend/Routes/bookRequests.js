const express = require('express');
const BookRequestContoller = require('../Controllers/bookRequestControllers');
const { protect, librarian ,authorize } = require('../Middlewares/authMiddleware');
const router = express.Router();


  // Student creates a book request
  router.post('/request', protect, BookRequestContoller.createBookRequest);

  // Librarian responds to a book request
  router.patch('/request/:id/respond', protect, authorize('librarian'), BookRequestContoller.respondToRequest);
  
  // Librarian handles the return of a book
  router.patch('/return/:id', protect, authorize('librarian'), BookRequestContoller.respondToRequest);
  
  // Listing Requests
  router.get('/',protect,authorize('librarian'),BookRequestContoller.getAllRequests);
  

  module.exports = router;