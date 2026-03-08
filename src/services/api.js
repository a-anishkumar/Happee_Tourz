import axios from 'axios'
import packages from '../data/packages.json'
import testimonials from '../data/testimonials.json'

// Mock implementation of API services
const API_URL = 'http://localhost:5000/api'

export const getPackages = async () => {
    // In a real app: return axios.get(`${API_URL}/packages`)
    return packages
}

export const getTestimonials = async () => {
    return testimonials
}

export const submitInquiry = async (data) => {
    console.log('Submitting inquiry:', data)
    return { success: true }
}

export const adminLogin = async (email, password) => {
    if (email === 'admin@royal.com' && password === 'admin123') {
        return { success: true, token: 'mock-jwt-token' }
    }
    throw new Error('Invalid credentials')
}
