/**
 * routes/auth.js
 * Auth routes: login, logout, and token verification.
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { login, logout, me } from '../controllers/authController.js'
import authMiddleware from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

// Validation rules for login
const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
]

// POST /api/auth/login
router.post('/login', loginValidation, validate, login)

// POST /api/auth/logout  (no-op — client deletes its own token)
router.post('/logout', logout)

// GET /api/auth/me  (protected)
router.get('/me', authMiddleware, me)

export default router
