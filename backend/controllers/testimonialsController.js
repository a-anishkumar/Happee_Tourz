/**
 * controllers/testimonialsController.js
 * HTTP handlers for testimonial CRUD operations.
 */

import * as testimonialService from '../services/testimonialService.js'

/**
 * GET /api/testimonials
 * Public — returns all testimonials
 */
export const getAll = async (_req, res) => {
    try {
        const testimonials = await testimonialService.getAllTestimonials()
        res.json({ success: true, data: testimonials })
    } catch (err) {
        console.error('getAll testimonials error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * GET /api/testimonials/:id
 * Public — returns a single testimonial
 */
export const getOne = async (req, res) => {
    try {
        const testimonial = await testimonialService.getTestimonialById(req.params.id)
        if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' })
        res.json({ success: true, data: testimonial })
    } catch (err) {
        console.error('getOne testimonial error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * POST /api/testimonials
 * Admin only — creates a new testimonial
 * Body: { name, review, date, image, rating }
 */
export const create = async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            review: req.body.review,
            date: req.body.date,
            image: req.body.image || null,
            rating: req.body.rating ?? 5,
        }

        const testimonial = await testimonialService.createTestimonial(payload)
        res.status(201).json({ success: true, data: testimonial, message: 'Testimonial created successfully' })
    } catch (err) {
        console.error('create testimonial error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * PUT /api/testimonials/:id
 * Admin only — updates a testimonial
 */
export const update = async (req, res) => {
    try {
        const payload = {}
        const allowed = ['name', 'review', 'date', 'image', 'rating']
        allowed.forEach(field => {
            if (req.body[field] !== undefined) payload[field] = req.body[field]
        })

        if (Object.keys(payload).length === 0) {
            return res.status(400).json({ success: false, message: 'No update fields provided' })
        }

        const testimonial = await testimonialService.updateTestimonial(req.params.id, payload)
        res.json({ success: true, data: testimonial, message: 'Testimonial updated successfully' })
    } catch (err) {
        console.error('update testimonial error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * DELETE /api/testimonials/:id
 * Admin only — deletes a testimonial
 */
export const remove = async (req, res) => {
    try {
        await testimonialService.deleteTestimonial(req.params.id)
        res.json({ success: true, message: 'Testimonial deleted successfully' })
    } catch (err) {
        console.error('delete testimonial error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * POST /api/testimonials/submit
 * Public — submits a new testimonial
 */
export const submit = async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            review: req.body.review,
            date: 'Just now', // Default for public submissions
            image: `https://i.pravatar.cc/150?u=${encodeURIComponent(req.body.name)}`, // Random avatar
            rating: req.body.rating ?? 5,
        }

        const testimonial = await testimonialService.createTestimonial(payload)
        res.status(201).json({ success: true, data: testimonial, message: 'Thank you! Your review has been submitted.' })
    } catch (err) {
        console.error('submit testimonial error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}
