const Book = require('../Model/bookModel');
const User = require('../Model/userModel');
exports.addBook = async (req, res) => {
  const { title, author, isbn, category, description, yearOfPublication, quantity } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      isbn,
      category,
      description,
      yearOfPublication,
      quantity,
      addedBy: req.user.id,
      availability: quantity > 0 ? 'available' : 'outOfStock',
    });
    const book =Book.find({isbn});
    if(book.length>0){
      return res.status(404).json({ message: 'Book Already Exists !!' });
    }
    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // console.log("i am here.")
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const { title, author, isbn, category, description, yearOfPublication, quantity } = req.body;

    // Check if the updated ISBN already exists in another book
    const existingBook = await Book.findOne({ isbn });
    if (existingBook && existingBook._id.toString() !== req.params.id) {
      return res.status(400).json({ message: 'ISBN already exists' });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        isbn,
        category,
        description,
        yearOfPublication,
        quantity,
        availability: quantity > 0 ? 'available' : 'outOfStock',
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Comment.deleteOne({ _id: req.params.id});
    // await book.remove();

    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


