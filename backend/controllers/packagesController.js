/**
 * controllers/packagesController.js
 * HTTP handlers for all package-related CRUD operations.
 * Delegates DB work to packageService.
 */

import * as packageService from '../services/packageService.js'

/**
 * GET /api/packages
 * Public — returns all packages
 */
export const getAll = async (_req, res) => {
    try {
        const packages = await packageService.getAllPackages()
        res.json({ success: true, data: packages })
    } catch (err) {
        console.error('getAll packages error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * GET /api/packages/:id
 * Public — returns a single package
 */
export const getOne = async (req, res) => {
    try {
        const pkg = await packageService.getPackageById(req.params.id)
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' })
        res.json({ success: true, data: pkg })
    } catch (err) {
        console.error('getOne package error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * POST /api/packages
 * Admin only — creates a new package
 * Body: { title, destination, cities, duration, image, status, hot_deal, description }
 */
export const create = async (req, res) => {
    try {
        const payload = {
            title: req.body.title,
            destination: req.body.destination,
            cities: req.body.cities || null,
            duration: req.body.duration,
            image: req.body.image || null,
            status: req.body.status || 'Active',
            hot_deal: req.body.hot_deal ?? false,
            description: req.body.description || null,
        }

        const pkg = await packageService.createPackage(payload)
        res.status(201).json({ success: true, data: pkg, message: 'Package created successfully' })
    } catch (err) {
        console.error('create package error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * PUT /api/packages/:id
 * Admin only — updates an existing package
 */
export const update = async (req, res) => {
    try {
        // Build update payload from whatever fields are provided
        const payload = {}
        const allowed = ['title', 'destination', 'cities', 'duration', 'image', 'status', 'hot_deal', 'description']
        allowed.forEach(field => {
            if (req.body[field] !== undefined) payload[field] = req.body[field]
        })

        if (Object.keys(payload).length === 0) {
            return res.status(400).json({ success: false, message: 'No update fields provided' })
        }

        const pkg = await packageService.updatePackage(req.params.id, payload)
        res.json({ success: true, data: pkg, message: 'Package updated successfully' })
    } catch (err) {
        console.error('update package error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}

/**
 * DELETE /api/packages/:id
 * Admin only — deletes a package
 */
export const remove = async (req, res) => {
    try {
        await packageService.deletePackage(req.params.id)
        res.json({ success: true, message: 'Package deleted successfully' })
    } catch (err) {
        console.error('delete package error:', err)
        res.status(500).json({ success: false, message: err.message })
    }
}
