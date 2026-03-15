/**
 * services/api.js
 * Centralized Axios client for the Happee Tourz backend API.
 * All admin requests automatically include the JWT token via interceptor.
 */

import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({ baseURL: API_URL })

// Attach the JWT token (if present) to every outgoing request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// ── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Admin login — stores the returned JWT in localStorage on success.
 * @returns {{ success: boolean, token: string, admin: object }}
 */
export const adminLogin = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) localStorage.setItem('adminToken', response.data.token)
    return response.data
}

export const changePassword = async (passwords) => {
    const response = await api.post('/auth/change-password', passwords)
    return response.data
}

/**
 * Admin logout — removes the JWT token from localStorage.
 */
export const adminLogout = async () => {
    await api.post('/auth/logout').catch(() => { }) // fire-and-forget
    localStorage.removeItem('adminToken')
}

/**
 * Verify the current token and return admin info.
 */
export const getMe = async () => {
    const { data } = await api.get('/auth/me')
    return data.admin
}

// ── Packages ──────────────────────────────────────────────────────────────────

export const getPackages = async () => {
    const { data } = await api.get('/packages')
    return data.data
}

export const getPackageById = async (id) => {
    const { data } = await api.get(`/packages/${id}`)
    return data.data
}

export const createPackage = async (payload) => {
    const { data } = await api.post('/packages', payload)
    return data.data
}

export const updatePackage = async (id, payload) => {
    const { data } = await api.put(`/packages/${id}`, payload)
    return data.data
}

export const deletePackage = async (id) => {
    const { data } = await api.delete(`/packages/${id}`)
    return data
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export const getTestimonials = async () => {
    const { data } = await api.get('/testimonials')
    return data.data
}

export const getTestimonialById = async (id) => {
    const { data } = await api.get(`/testimonials/${id}`)
    return data.data
}

export const createTestimonial = async (payload) => {
    const { data } = await api.post('/testimonials', payload)
    return data.data
}

export const updateTestimonial = async (id, payload) => {
    const { data } = await api.put(`/testimonials/${id}`, payload)
    return data.data
}

export const deleteTestimonial = async (id) => {
    const { data } = await api.delete(`/testimonials/${id}`)
    return data
}

/**
 * Submit a public testimonial.
 * @param {{ name, review, rating }} payload
 */
export const submitTestimonial = async (payload) => {
    const { data } = await api.post('/testimonials/submit', payload)
    return data
}

// ── Inquiries ─────────────────────────────────────────────────────────────────

/**
 * Submit a public inquiry form.
 * @param {{ full_name, phone, email, num_persons, package, travel_month, message }} payload
 */
export const submitInquiry = async (payload) => {
    const { data } = await api.post('/inquiries', payload)
    return data
}

export const getInquiries = async () => {
    const { data } = await api.get('/inquiries')
    return data.data
}

export const deleteInquiry = async (id) => {
    const { data } = await api.delete(`/inquiries/${id}`)
    return data
}

export default api
