import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Send, CheckCircle2, Phone, Mail, MapPin, Loader2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitInquiry } from '../services/api'

const Contact = () => {
    const location = useLocation()
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')
    const [form, setForm] = useState({
        full_name: '', phone: '', email: '', num_persons: '',
        package: '', travel_month: '', message: ''
    })

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const pkg = params.get('package')
        if (pkg) {
            setForm(prev => ({ ...prev, package: pkg.toLowerCase().replace(/ /g, '-') }))
        }
    }, [location.search])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setServerError('')
        try {
            await submitInquiry(form)
            setSubmitted(true)
            setTimeout(() => {
                setSubmitted(false)
                setForm({ full_name: '', phone: '', email: '', num_persons: '', package: '', travel_month: '', message: '' })
            }, 5000)
        } catch (err) {
            setServerError(err.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return (
        <div className="flex flex-col w-full">
            {/* Banner */}
            <div
                className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
            >
                <div className="absolute inset-0 bg-black/55" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                >
                    <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight">Contact Us</h1>
                    <div className="w-20 h-2 bg-[#e30613] mx-auto mt-6 rounded-full" />
                </motion.div>
            </div>

            {/* Contact Info Cards */}
            <section style={{ background: '#f8f9fa', padding: '60px 0 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-[#e30613]/10 p-4 rounded-xl shrink-0">
                                <Phone className="text-[#e30613]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Call Us</h4>
                                <a href="tel:+919159973503" className="text-base font-bold text-gray-800 hover:text-[#e30613] transition-colors">+91 91599 73503</a>
                            </div>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-[#e30613]/10 p-4 rounded-xl shrink-0">
                                <Mail className="text-[#e30613]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Email Us</h4>
                                <a href="mailto:info@happeetourz.com" className="text-base font-bold text-gray-800 hover:text-[#e30613] transition-colors">info@happeetourz.com</a>
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow"
                        >
                            <div className="bg-[#e30613]/10 p-4 rounded-xl shrink-0">
                                <MapPin className="text-[#e30613]" size={24} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-1">Our Location</h4>
                                <p className="text-base font-bold text-gray-800">Erode, Tamil Nadu, India</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Quick Enquiry Form */}
            <section style={{ padding: '60px 0 80px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>
                    <div className="text-center mb-10">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full">
                            Reach Us Anytime
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] mt-4">Quick Enquiry</h2>
                        <div className="w-16 h-1.5 bg-[#e30613] mx-auto mt-5 rounded-full" />
                        <p className="text-gray-500 font-medium mt-4 text-base">
                            Fill in the form below and our travel expert will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 md:p-12">
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6"
                                >
                                    {/* Server-side error banner */}
                                    {serverError && (
                                        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
                                            <AlertCircle size={18} />
                                            {serverError}
                                        </div>
                                    )}
                                    {/* Row 1: Name + Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Full Name <span className="text-[#e30613]">*</span>
                                            </label>
                                            <input
                                                name="full_name"
                                                type="text"
                                                required
                                                value={form.full_name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Phone Number <span className="text-[#e30613]">*</span>
                                            </label>
                                            <input
                                                name="phone"
                                                type="tel"
                                                required
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="e.g. +91 9876543210"
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Email + Persons */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Email Address <span className="text-[#e30613]">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Number of Persons <span className="text-[#e30613]">*</span>
                                            </label>
                                            <input
                                                name="num_persons"
                                                type="number"
                                                required
                                                min="1"
                                                value={form.num_persons}
                                                onChange={handleChange}
                                                placeholder="e.g. 4"
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 3: Package + Month */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Travel Package <span className="text-[#e30613]">*</span>
                                            </label>
                                            <select
                                                name="package"
                                                required
                                                value={form.package}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] cursor-pointer transition-all"
                                            >
                                                <option value="">Select a Package</option>
                                                <option value="group-tour">Group Tour Package</option>
                                                <option value="family-tour">Family Tour Package</option>
                                                <option value="honeymoon">Honeymoon Package</option>
                                                <option value="international">International Tour Package</option>
                                                <option value="domestic">Domestic Tour Package</option>
                                                <option value="custom">Customized Package</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                                Month of Travel <span className="text-[#e30613]">*</span>
                                            </label>
                                            <select
                                                name="travel_month"
                                                required
                                                value={form.travel_month}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] cursor-pointer transition-all"
                                            >
                                                <option value="">Select Month</option>
                                                {months.map(m => (
                                                    <option key={m} value={m.toLowerCase()}>{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                                            Message / Special Requirements
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your travel plans, destination preferences, or any special requirements..."
                                            className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Agreement */}
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            required
                                            id="agree"
                                            className="w-4 h-4 mt-0.5 accent-[#e30613] border-gray-300 rounded shrink-0"
                                        />
                                        <label htmlFor="agree" className="text-xs text-gray-500 font-semibold leading-relaxed cursor-pointer">
                                            I agree to the <span className="text-[#e30613] hover:underline cursor-pointer">Privacy Policy</span> and <span className="text-[#e30613] hover:underline cursor-pointer">Terms & Conditions</span> of Happee Tourz and Travels.
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#e30613] text-white py-5 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-[#c40510] active:scale-[0.99] transition-all shadow-lg shadow-red-600/20 disabled:opacity-60"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Enquiry'}
                                            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20 text-center gap-5 bg-green-50 rounded-2xl border border-green-100"
                                >
                                    <CheckCircle2 size={64} className="text-green-500" />
                                    <h3 className="text-2xl font-bold text-gray-800">Enquiry Sent Successfully!</h3>
                                    <p className="text-gray-500 max-w-sm font-medium">
                                        Thank you for reaching out! Our travel expert will contact you within 24 hours.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
