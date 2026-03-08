/**
 * middleware/auth.js
 * JWT authentication middleware for protected admin routes.
 * Reads the Authorization header, verifies the token, and
 * attaches the decoded payload to req.user.
 */

import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']

    // Expect "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded  // { id, email, role }
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        })
    }
}

export default authMiddleware
