import fs from 'node:fs';
import UserModel from '../models/userModel.js';
import cloudinary from '../utils/cloudinary.js';
import generateToken from '../utils/generateToken.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

//Todo:  Post | Public | api/users/register

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    return next(new ApiError('User with this email already exists.', 409));
  }

  const user = await UserModel.create({ name, email, password });

  if (user) {
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(new ApiError('Invalid User Data.', 400));
  }
});

//Todo:  Post | Public | api/users/login
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image.url,
    });
  } else {
    res.status(400);
    throw new Error('Incorrect Email or Password');
  }
});

//Todo:  Post | Public | api/users/logout
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt3', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json('User Logged Out.');
});

//Todo:  Get | Public | api/users/profile
const getProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image.url,
    });
  } else {
    return next(new ApiError('User not found.', 404));
  }
});

//Todo:  Put | Public | api/users/profile

const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await UserModel.findById({ _id: userId });
  const oldImgId = user.image.imgId;
  const path = req?.file?.path;

  if (path) {
    if (oldImgId) {
      //if there is img destroy the old one
      await cloudinary.uploader.destroy(oldImgId);
    }

    //And update new image
    const result = await cloudinary.uploader.upload(path);
    const image = {
      url: result?.secure_url,
      imgId: result?.public_id,
    };

    user.image = image;

    // Remove the temporary file after upload
    fs.unlinkSync(path);
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
  }

  if (req.body.password) {
    user.password = req.body.password || user.password;
  }

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image.url,
    });
  } else {
    return next(new ApiError('User not found', 404));
  }
});
export { registerUser, loginUser, logoutUser, getProfile, updateProfile };
