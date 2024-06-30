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
exports.respondToBookRequest = async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  try {
    const bookRequest = await BookRequest.findById(requestId).populate('user book');
    if (!bookRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
//  cheching in db if bookreq already have been approved or not.
    if (bookRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request has already been processed' });
    }
// checking the user req , whether its approval req can be approved or not.
    if (status === 'approved') {
      const book = bookRequest.book;
      if (book.quantity <= 0) {
        return res.status(400).json({ message: 'Book is not available for borrowing' });
      }

      book.quantity -= 1;
      book.availability = book.quantity > 0 ? 'available' : 'outOfStock';
      await book.save();

      const user = bookRequest.user;
      user.booksBorrowingCurrently.push(book._id);
      await user.save();
    }

    bookRequest.status = status;
    bookRequest.responseDate = Date.now();
    await bookRequest.save();

    res.json(bookRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.returnBookRequest = async (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body; // status should be 'returned'

  try {
    const bookRequest = await BookRequest.findById(requestId).populate('user book');
    if (!bookRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (bookRequest.status !== 'approved') {
      return res.status(400).json({ message: 'Book has not been borrowed or already returned' });
    }

    if (status === 'returned') {
      const book = bookRequest.book;
      book.quantity += 1;
      book.availability = book.quantity > 0 ? 'available' : 'outOfStock';
      await book.save();

      const user = bookRequest.user;
      user.booksBorrowingCurrently = user.booksBorrowingCurrently.filter(
        (bookId) => bookId.toString() !== book._id.toString()
      );
      user.booksBorrowed.push(book._id);
      await user.save();
    }

    bookRequest.status = status;
    bookRequest.responseDate = Date.now();
    await bookRequest.save();

    res.json(bookRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};