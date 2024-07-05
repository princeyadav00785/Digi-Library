const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    let user = await User.find({ email });
    if (user?.length) {
      return res.status(400).send("User with this email already Exists !!");
    }
    user = new User({
      username,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    delete user.password;
    res.status(201).json({"user":user,"message":"Registered Sucessfully!!!"});
  } catch (err) {
    console.log("Error while registering user", err);
  }
};

exports.loginUser= async(req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    // console.log(email,password);
    try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ mes: "No user found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ mes: "Invalid Credentials !!" });
        }
        const payload={
            user:{
                id:user.id,
                role:user.role,
                username:user.username,
                email:user.email,
                avatar:user?.avatar,
                fine:user?.fine,
                booksBorrowed:user.booksBorrowed,
                booksBorrowingCurrently:user.booksBorrowingCurrently,
            }
        }
        console.log(user);
        user.password=undefined;
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 30000 }, (err, token) => {
            if (err) throw err;
            res.json({ 'user':user ,"token":token});
          });
             

    } catch (err) {
        console.log("Error occured !!", err);
        res.status(500).send("Server Error!!");
      }
}

exports.logoutUser = (req, res) => {
    try {
      res.status(200).json({ msg: 'User logged out successfully' });
    } catch (err) {
      console.error('Error logging out user: ', err);
      res.status(500).send('Server Error');
    }
  };



  // USER DETAILS...
  // Get all users (GET /api/admin/users)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID (GET /api/admin/users/:userId)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user (PATCH /api/admin/users/:userId)
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (DELETE /api/admin/users/:userId)
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId).select('-password');
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserHistory = async (req, res) => {
  const userId = req.params.id;
  // console.log(userId)

  try {
    // Fetch user with books they borrowed
    const user = await User.findById(userId)
      .populate('booksBorrowed', 'title author borrowedDate returnDate')
      .populate('booksBorrowingCurrently', 'title author borrowedDate' );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare response data
    const userHistory = {
      username: user.username,
      booksBorrowed: user.booksBorrowed.map(book => ({
        title: book.title,
        author: book.author,
        borrowedDate: book.borrowedDate,
        returnDate: book.returnDate || 'Not returned yet',
      })),
      booksBorrowingCurrently: user.booksBorrowingCurrently.map(book => ({
        title: book.title,
        author: book.author,
        borrowedDate: book.borrowedDate,
      })),
    };

    res.json(userHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};