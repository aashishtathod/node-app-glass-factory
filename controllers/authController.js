const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let user = new User();


function generateToken(id) {
  return jwt.sign({ user_id: id }, process.env.JWT_SECRET);
}

exports.signUp = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body

    let result = await user.findUser(email)
    if (result[0][0] != null) {
      res.json({ message: "User Already Exists" })
      return
    }

    password = await bcrypt.hash(password, 10);
    result = await user.createUser(name, email, password, role);
    let token = generateToken(result[0].insertId)

    res.status(201).json({
      message: "User Created Successfully",
      jwt_token: token,
    });

  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body

    let existingUser = await user.findUser(email)
    existingUser = existingUser[0][0]

    if (email == null) {
      res.json({ message: "User Does Not Exists" })
      return
    }

    const passwordMatched = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatched) {
      res.json({ message: "Password Does Not Match" }) 
      return
    }
      
    let token = generateToken(existingUser.user_id)

    res.json({
      message: "User Logged In Successfully",
      jwt_token: token,
    });

  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.findUser = async (req, res, next) => {
  let email = req.body.email
  try {
    const result = await user.findUser(email)
    res.send(result);
  } catch (error) {
    res.json({ message: error.message });
  }
};



exports.dummy = async (req, res, next) => {
  res.send("Noting to show");
};
