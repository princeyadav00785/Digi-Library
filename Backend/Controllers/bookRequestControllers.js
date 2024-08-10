const BookRequest = require('../Model/BookRequestModel');
const Book = require('../Model/bookModel');
const User = require('../Model/userModel');

// Student creates a book request
exports.createBookRequest = async (req, res) => {
  console.log('I am Here');
  const userId = req.user.id;
  const { bookId, requestType } = req.body;
  console.log(requestType);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingRequest = await BookRequest.findOne({ user: userId, book: bookId, requestType });
    if (existingRequest) {
      return res.status(400).json({ message: `${requestType.charAt(0).toUpperCase() + requestType.slice(1)} request already sent to respective authority.` });
    }

    const bookRequest = new BookRequest({
      user: userId,
      book: bookId,
      requestType
    });

    const savedRequest = await bookRequest.save();
    res.status(201).json(savedRequest);
    console.log('req sent!!');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Librarian approves/rejects a book request
// Respond to a request (PATCH /api/admin/requests/:requestId)
exports.respondToRequest = async (req, res) => {
  const { status } = req.body;
  // console.log("Requested.")
  try {
    
    const requestInDb = await BookRequest.find({ _id:req.params.id});
    // console.log(requestInDb);
    if (!requestInDb) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the request type is 'borrow' or 'return'
    if (requestInDb.requestType === 'borrow') {
      // Handle borrowing request
      if (status === 'approved') {
        // Update book quantity and availability
        const book = await Book.findById(requestInDb.book);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        if (book.quantity <= 0) {
          return res.status(400).json({ message: 'Book out of stock' });
        }
        
        // Update book availability and quantity
        book.quantity--;
        book.availability = book.quantity > 0 ? 'available' : 'outOfStock';
        await book.save();

        // Update user's currently borrowing list
        const user = await User.findById(requestInDb.user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.booksBorrowingCurrently.push(requestInDb.book);
        await user.save();

        // Update book's history
        book.usersHistory.push({ user: requestInDb.user, borrowedAt: new Date() });
        await book.save();
      }
    } else if (requestInDb.requestType === 'return') {
      // Handle return request
      if (status === 'approved') {
        // Update book quantity and availability
        const book = await Book.findById(requestInDb.book);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        // Update book availability and quantity
        book.quantity++;
        book.availability = 'available';
        await book.save();
    
        // Remove book from user's currently borrowing list
        const user = await User.findById(requestInDb.user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const index = user.booksBorrowingCurrently.indexOf(requestInDb.book);
        if (index !== -1) {
          user.booksBorrowingCurrently.splice(index, 1);
          await user.save();
        }
    
        // Update book's history for return and impose fine if needed
        const historyItem = book.usersHistory.find(item => item.user.toString() === requestInDb.user && !item.returnedAt);
        if (historyItem) {
          const borrowDate = new Date(historyItem.borrowedAt);
          const returnDate = new Date();
          historyItem.returnedAt = returnDate;
          await book.save();
    
          const diffTime = Math.abs(returnDate - borrowDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
          if (diffDays > 7) {
            const fineAmount = (diffDays - 7) * 20;
            user.fine += fineAmount;
            await user.save();
          }
        }
      }
    }
    
    // Update request status
    requestInDb.status = status;
    requestInDb.responseDate = new Date();
    
    await BookRequest.findByIdAndUpdate(req.params.id, { status, responseDate: Date.now() }, { new: true });
    
    res.json(requestInDb);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
};

// Get all requests (GET /api/admin/requests) and librarian too.
exports.getAllRequests = async (req, res) => {
  try {
    // console.log('I am here ..')
    const requests = await BookRequest.find()
    .populate('user', 'username email')
    .populate('book', 'title author');
    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


