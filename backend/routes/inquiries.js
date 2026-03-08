/**
 * routes/inquiries.js
 * Public: POST (submit form)
 * Admin only: GET all, DELETE
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { submit, getAll, remove } from '../controllers/inquiriesController.js'
import authMiddleware from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

const inquiryValidation = [
    body('full_name').notEmpty().withMessage('Full name is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('email').isEmail().withMessage('Valid email is required'),
]

// ── Public routes ─────────────────────────────────────────────────────────────
router.post('/', inquiryValidation, validate, submit)

// ── Admin protected routes ────────────────────────────────────────────────────
router.get('/', authMiddleware, getAll)
router.delete('/:id', authMiddleware, remove)

export default router
