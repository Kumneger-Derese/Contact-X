import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });

  res.cookie('jwt3', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // ✅ Secure cookies in production
    sameSite: 'None', // ✅ Required for cross-site cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
