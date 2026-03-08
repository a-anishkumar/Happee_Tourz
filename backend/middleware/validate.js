/**
 * middleware/validate.js
 * Reads express-validator results and returns a 400 response
 * with all validation errors if any are present.
 */

import { validationResult } from 'express-validator'

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
        })
    }
    next()
}

export default validate
