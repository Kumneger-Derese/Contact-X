import jwt from 'jsonwebtoken';
import { asyncHandler } from '../asyncHandler.js';
import UserModel from '../../models/userModel.js';
import { ApiError } from '../../utils/ApiError.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt3;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await UserModel.findById(decoded.userId).select('-password');
    } catch (error) {
      return next(new ApiError('User not authorized, Invalid token', 401));
    }
  } else {
    return next(new ApiError('User not authorized, no token', 401));
  }
  next();
});

export default protect;
