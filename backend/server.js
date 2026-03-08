/**
 * server.js — Entry point for Happee Tourz And Travels backend
 * Loads env, configures middleware, mounts routes, starts server.
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Route imports
import authRoutes from './routes/auth.js'
import packagesRoutes from './routes/packages.js'
import testimonialsRoutes from './routes/testimonials.js'
import inquiriesRoutes from './routes/inquiries.js'

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────────────────────────────

// CORS — allow requests from the Vite frontend (and any configured origin)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}))

// Parse JSON request bodies
app.use(express.json())

// HTTP request logger (concise dev format)
app.use(morgan('dev'))

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes)
app.use('/api/packages', packagesRoutes)
app.use('/api/testimonials', testimonialsRoutes)
app.use('/api/inquiries', inquiriesRoutes)

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Happee Tourz API is running 🚀' })
})

// ─── 404 Handler ──────────────────────────────────────────────────────────────

app.use((_req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
    })
})

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`✅ Happee Tourz backend running at http://localhost:${PORT}`)
})
