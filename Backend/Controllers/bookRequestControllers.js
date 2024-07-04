const BookRequest = require('../Model/BookRequestModel');
const Book = require('../Model/bookModel');
const User = require('../Model/userModel');

// Student creates a book request
exports.createBookRequest = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const existingRequest = await BookRequest.find({ user: userId, book: bookId });
    console.log(existingRequest);
    if (existingRequest.length > 0) {
      return res.status(400).json({ message: 'Borrow request already sent to respective authority!!' });
    }


    const bookRequest = new BookRequest({
      user: userId,
      book: bookId,
    });

    const savedRequest = await bookRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Librarian approves/rejects a book request
// Respond to a request (PATCH /api/admin/requests/:requestId)
exports.respondToRequest = async (req, res) => {
  const { status } = req.body;
   console.log(status);
  try {
    const request = await BookRequest.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the request type is 'borrow' or 'return'
    if (request.requestType === 'borrow') {
      // Handle borrowing request
      if (status === 'approved') {
        // Update book quantity and availability
        const book = await Book.findById(request.book);
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
        const user = await User.findById(request.user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.booksBorrowingCurrently.push(request.book);
        await user.save();

        // Update book's history
        book.usersHistory.push({ user: request.user, borrowedAt: new Date() });
        await book.save();
      }
    } else if (request.requestType === 'return') {
      // Handle return request
      if (status === 'approved') {
        // Update book quantity and availability
        const book = await Book.findById(request.book);
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }

        // Update book availability and quantity
        book.quantity++;
        book.availability = 'available';
        await book.save();

        // Remove book from user's currently borrowing list
        const user = await User.findById(request.user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const index = user.booksBorrowingCurrently.indexOf(request.book);
        if (index !== -1) {
          user.booksBorrowingCurrently.splice(index, 1);
          await user.save();
        }

        // Update book's history for return
        const historyItem = book.usersHistory.find(item => item.user.toString() === request.user && !item.returnedAt);
        if (historyItem) {
          historyItem.returnedAt = new Date();
          await book.save();
        }
      }
    }

    // Update request status
    request.status = status;
    await request.save();

    res.json(request);
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

