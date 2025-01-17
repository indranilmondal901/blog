/* model */
const UserModel = require("../Models/userSchema.js");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltValue = 12;
const JWT_SECRET_KEY = "qazwsxedcvfrbgtnhyujmik";
const JWT_TOKEN_VALIDITY = "8h";


const IsEmailExist = async (email) => {
  try {
    /* unique email check */
    const isEmailExist = await UserModel.findOne({ email: email });
    if (isEmailExist) {
      return { status: true, data: isEmailExist };
    } else {
      return { status: false, data: null };
    }
  } catch (error) {
    return { status: false, data: null };
  }
};

const PasswordHash = async (password) => {
  try {
    const result = await bcrypt.hash(password, saltValue);
    return {
      status: true,
      hashedPassword: result,
      message: "Password hashed successfully.",
    };
  } catch (err) {
    return {
      status: false,
      hashedPassword: null,
      message: "Error hashing password",
    };
  }
};

const IsCorrectPassword = async (EnteredPassword, OriginalPassword) => {
  try {
    let result = await bcrypt.compare(EnteredPassword, OriginalPassword);
    return result;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    next(error);
  }
};

const GenerateToken = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_TOKEN_VALIDITY,
    });
    return token;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  IsEmailExist,
  PasswordHash,
  IsCorrectPassword,
  GenerateToken,
};
