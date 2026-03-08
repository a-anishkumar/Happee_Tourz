/**
 * routes/packages.js
 * Public: GET all & GET by ID
 * Admin only (JWT required): POST, PUT, DELETE
 */

import { Router } from 'express'
import { body } from 'express-validator'
import { getAll, getOne, create, update, remove } from '../controllers/packagesController.js'
import authMiddleware from '../middleware/auth.js'
import validate from '../middleware/validate.js'

const router = Router()

// Validation rules for creating / updating a package
const packageValidation = [
    body('title').notEmpty().withMessage('Package title is required'),
    body('destination').notEmpty().withMessage('Destination is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('status')
        .optional()
        .isIn(['Active', 'Coming Soon'])
        .withMessage('Status must be Active or Coming Soon'),
]

// ── Public routes ────────────────────────────────────────────────────────────
router.get('/', getAll)
router.get('/:id', getOne)

// ── Admin protected routes ────────────────────────────────────────────────────
router.post('/', authMiddleware, packageValidation, validate, create)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, remove)

export default router
