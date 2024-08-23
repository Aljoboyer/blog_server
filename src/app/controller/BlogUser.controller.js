const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const BlogUserCollection = require("../models/bloguser.schema");
const SecretKey = process.env.SECRET_KEY;

const signInController = async (req, res) => {
  // console.log('Hitted signing', req.query)
  const { email, password } = req.query;

  try {
    const oldUser = await BlogUserCollection.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, SecretKey,  {
      expiresIn: "8h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// User Signup
const signUpController = async (req, res) => {

  console.log('Hitted', req.body)

    const { email, password, firstName, lastName, phone} = req.body;

    try {
      const oldUser = await BlogUserCollection.findOne({ email: email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await BlogUserCollection.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      });
  
    //   const token = jwt.sign({ email: result.email, id: result._id }, SecretKey, {
    //     expiresIn: "1h",
    //   });
    const token = jwt.sign({ email: result.email, id: result._id }, SecretKey ,{
      expiresIn: "8h",
    });

    res.status(201).json({ result, token });

    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

module.exports = {
    signInController,
    signUpController
  };
  