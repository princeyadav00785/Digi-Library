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
    res.status(201).json(user);
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
            }
        }
        console.log(user);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 30000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
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