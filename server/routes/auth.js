import express from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { OTP } from '../models/OTP.js';
import { sendOTPEmail } from '../services/mailer.js';

const router = express.Router();

// Rate limiters
const sendOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { error: 'Too many OTP requests. Please wait 10 minutes.' },
});

const verifyOtpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: { error: 'Too many verification attempts. Please wait.' },
});

/** Generate a cryptographically safe 6-digit OTP */
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/** Sign a JWT token */
function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'compario_secret_key', {
    expiresIn: '7d',
  });
}

// ─── POST /api/auth/send-otp ─────────────────────────────────────────────────
router.post('/send-otp', sendOtpLimiter, async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert OTP (replace existing for this email)
    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );

    // Find or prepare user (don't create yet — wait for OTP verification)
    const existingUser = await User.findOne({ email });

    await sendOTPEmail(email, otp, name || existingUser?.name || '');

    return res.json({
      success: true,
      message: 'OTP sent to your email.',
      isNewUser: !existingUser,
    });
  } catch (err) {
    console.error('[send-otp]', err);
    return res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
});

// ─── POST /api/auth/verify-otp ───────────────────────────────────────────────
router.post('/verify-otp', verifyOtpLimiter, async (req, res) => {
  try {
    const { email, otp, name } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    const record = await OTP.findOne({ email });

    if (!record) {
      return res.status(400).json({ error: 'OTP expired or not found. Please request a new one.' });
    }

    // Brute force protection
    if (record.attempts >= 5) {
      await OTP.deleteOne({ email });
      return res.status(429).json({ error: 'Too many failed attempts. Please request a new OTP.' });
    }

    if (record.otp !== otp.toString()) {
      await OTP.findOneAndUpdate({ email }, { $inc: { attempts: 1 } });
      const remaining = 4 - record.attempts;
      return res.status(400).json({
        error: `Incorrect OTP. ${remaining} attempt(s) remaining.`,
      });
    }

    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    // OTP is correct — delete it
    await OTP.deleteOne({ email });

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: name || '',
        isVerified: true,
      });
    } else {
      user.isVerified = true;
      if (name && !user.name) user.name = name;
      await user.save();
    }

    // Issue JWT
    const token = signToken(user._id);

    // Set HTTP-only cookie
    res.cookie('compario_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        wishlist: user.wishlist,
        priceAlerts: user.priceAlerts,
      },
      token,
    });
  } catch (err) {
    console.error('[verify-otp]', err);
    return res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
});

// ─── GET /api/auth/me ────────────────────────────────────────────────────────
router.get('/me', async (req, res) => {
  try {
    const token =
      req.cookies?.compario_token ||
      req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ error: 'Not authenticated.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'compario_secret_key');
    const user = await User.findById(decoded.id).select('-__v');

    if (!user) return res.status(404).json({ error: 'User not found.' });

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        wishlist: user.wishlist,
        priceAlerts: user.priceAlerts,
      },
    });
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

// ─── POST /api/auth/logout ───────────────────────────────────────────────────
router.post('/logout', (_req, res) => {
  res.clearCookie('compario_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;
