/**
 * routes/testimonials.js
 * Public: GET all & GET by ID
 * Admin only (JWT required): POST, PUT, DELETE
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { getAll, getOne, create, update, remove, submit } from '../controllers/testimonialsController.js'
import authMiddleware from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

const testimonialValidation = [
    body('name').notEmpty().withMessage('Customer name is required'),
    body('review').notEmpty().withMessage('Review text is required'),
    body('date').optional().notEmpty().withMessage('Date cannot be empty if provided'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
]

// ── Public routes ─────────────────────────────────────────────────────────────
router.get('/', getAll)
router.get('/:id', getOne)
router.post('/submit', testimonialValidation, validate, submit)

// ── Admin protected routes ────────────────────────────────────────────────────
router.post('/', authMiddleware, testimonialValidation, validate, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

export default router
