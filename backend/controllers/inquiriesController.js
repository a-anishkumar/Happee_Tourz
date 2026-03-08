/**
 * controllers/inquiriesController.js
 * Handles submission of public inquiry forms and admin retrieval.
 */

import * as inquiryService from '../services/inquiryService.js'

/**
 * POST /api/inquiries
 * Public — submit an inquiry from the website contact / inquiry form
 * Body: { full_name, phone, email, num_persons, package, travel_month, message }
 */
export const submit = async (req, res) => {
    try {
        const payload = {
            full_name: req.body.full_name,
            phone: req.body.phone,
            email: req.body.email,
            num_persons: req.body.num_persons ? Number(req.body.num_persons) : null,
            package: req.body.package || null,
            travel_month: req.body.travel_month || null,
            message: req.body.message || null,
        }

        const inquiry = await inquiryService.createInquiry(payload)
        res.status(201).json({
            success: true,
            data: inquiry,
            message: 'Inquiry submitted successfully! We will contact you within 24 hours.',
        })
    } catch (err) {
        console.error('submit inquiry error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * GET /api/inquiries
 * Admin only — list all inquiries
 */
export const getAll = async (_req, res) => {
    try {
        const inquiries = await inquiryService.getAllInquiries()
        res.json({ success: true, data: inquiries, count: inquiries.length })
    } catch (err) {
        console.error('getAll inquiries error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * DELETE /api/inquiries/:id
 * Admin only — delete an inquiry
 */
export const remove = async (req, res) => {
    try {
        await inquiryService.deleteInquiry(req.params.id)
        res.json({ success: true, message: 'Inquiry deleted successfully' })
    } catch (err) {
        console.error('delete inquiry error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}
