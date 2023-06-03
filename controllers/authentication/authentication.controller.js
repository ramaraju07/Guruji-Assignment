const asyncHandler = require('express-async-handler');
const User = require('../../model/User');
const { generateToken } = require('../../utils/generate.jwt');

// @desc Register user & get token
// @route POST /api/authenticate/register
// @access public

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`User already exists!`);
  } else {
    const user = await User.create({
      name,
      email,
      password
    });
    if (user) {
      generateToken(res, user._id);

      res.status(201).send({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      });
    } else {
      res.status(400);
      throw new Error(`Invalid user details`);
    }
  }
});

// @desc Login user & get token
// @route POST /api/authenticate/login
// @access public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUserByEmail = await User.findOne({ email });

  if (findUserByEmail && (await findUserByEmail.matchPassword(password))) {
    generateToken(res, findUserByEmail._id);

    res.send({
      success: true,
      user: {
        _id: findUserByEmail._id,
        name: findUserByEmail.name,
        email: findUserByEmail.email,
        isAdmin: findUserByEmail.isAdmin
      }
    });
    
  } else {
    res.status(401);
    throw new Error(`Email or password in valid!`);
  }
});

module.exports = {
  register,
  login
};
