/* model */
const UserModel = require("../Models/userSchema");
/* helper functions */
const {
  IsEmailExist,
  PasswordHash,
  IsCorrectPassword,
  GenerateToken,
} = require("../Helper_Functions/HelperFunction");

const Registration = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    /* unique email check */
    const isExist = await IsEmailExist(email);
    if (isExist.status) {
      return res.status(404).send({
        message: "Email already exists",
      });
    }

    /* hashing password */
    const { status, hashedPassword, message } = await PasswordHash(password);
    if (!status) {
      return res.status(404).send({ message: message });
    }
    /* add to user */
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).send({
      message: "registration successfully done",
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    /* email check */
    const { status, data } = await IsEmailExist(email);
    if (!status) {
      return res.status(400).send({
        message: "Invalid credential.",
      });
    }

    /* hashing password */
    const result = await IsCorrectPassword(password, data.password);
    if (!result) {
      return res.status(400).send({
        message: "Invalid credential.",
      });
    }

    /* generate jwt token */
    const payload = { _id: data._id, name: data.name, email: data.email};
    const token = GenerateToken(payload);

    if (!token) {
      logError(req.originalUrl, "Error generating token.");
      return res.status(404).send({
        message: "Error generating token.",
      });
    }

    return res.status(200).send({
      message: "Login successfull",
      user: data,
      token: token,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

const GetUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let user = await UserModel.findOne({ _id: userId }, "-password");
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    return res.status(200).send({
      message: "User get sucessfully.",
      data: user,
    });
  } catch (error) {
    req.error = error;
    next();
  }
};

module.exports = {
  Registration,
  Login,
  GetUser,
};
