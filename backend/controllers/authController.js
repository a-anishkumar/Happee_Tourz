/**
 * controllers/authController.js
 * Handles admin login. Looks up admin_users table, verifies bcrypt
 * password, and returns a signed JWT on success.
 */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import supabase from '../config/supabase.js'

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Find admin by email
        const { data: admin, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .single()

        if (error || !admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        // Verify password against the stored bcrypt hash
        const isMatch = await bcrypt.compare(password, admin.password_hash)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        // Sign JWT with admin payload (ID + email + role)
        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({
            success: true,
            message: 'Login successful',
            token,
            admin: { id: admin.id, email: admin.email },
        })

    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ success: false, message: 'Server error' })
    }
}

/**
 * POST /api/auth/logout
 * JWT is stateless — logout is handled client-side by deleting the token.
 * This endpoint is a no-op placeholder for a clean API surface.
 */
export const logout = (_req, res) => {
    res.json({ success: true, message: 'Logged out successfully' })
}

/**
 * GET /api/auth/me
 * Protected — verifies the token and returns the current admin's info.
 */
export const me = (req, res) => {
    // req.user is attached by the auth middleware
    res.json({ success: true, admin: req.user })
}
