import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitInquiry } from '../services/api'

const InquiryForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')
    const [form, setForm] = useState({
        full_name: '', phone: '', email: '', num_persons: '',
        package: '', travel_month: '', message: '',
    })

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

    return (
        <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
            <div className="flex flex-col gap-6 mb-8 group">
                <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full w-fit group-hover:bg-[#e30613] group-hover:text-white transition-colors">
                    Reach Us Anytime
                </span>
                <h2 className="text-3xl font-extrabold text-[#1f2937]">Quick Inquiry</h2>
                <div className="w-16 h-1 bg-[#e30613] rounded-full group-hover:w-32 transition-all duration-500" />
            </div>

            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* Server-side error banner */}
                        {serverError && (
                            <div className="md:col-span-2 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold">
                                <AlertCircle size={18} />
                                {serverError}
                            </div>
                        )}
                        {/* Name */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Full Name*</label>
                            <input
                                name="full_name"
                                type="text"
                                required
                                value={form.full_name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Phone Number*</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Include country code"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Email Address*</label>
                            <input
                                name="email"
                                type="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email Us"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Number of persons */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Number of persons*</label>
                            <input
                                name="num_persons"
                                type="number"
                                required
                                value={form.num_persons}
                                onChange={handleChange}
                                placeholder="Enter No of persons"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Package Selection */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Package*</label>
                            <select name="package" value={form.package} onChange={handleChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer">
                                <option value="">Select Package</option>
                                <option value="Japan Group Tour">Japan Group Tour</option>
                                <option value="Malaysia & Singapore Tour">Malaysia & Singapore Tour</option>
                                <option value="Bali Group Tour">Bali Group Tour</option>
                                <option value="Rajasthan Group Tour">Rajasthan Group Tour</option>
                                <option value="Egypt Group Tour">Egypt Group Tour</option>
                                <option value="Vietnam & Cambodia Tour">Vietnam & Cambodia Tour</option>
                            </select>
                        </div>

                        {/* Month of Travel */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Month of travel*</label>
                            <select name="travel_month" value={form.travel_month} onChange={handleChange} className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer">
                                <option value="">Select Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2 group/field md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Write Your Message</label>
                            <textarea
                                name="message"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="What's on your mind?"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Agreement */}
                        <div className="flex items-center gap-2 md:col-span-2">
                            <input type="checkbox" className="w-4 h-4 text-[#e30613] rounded border-gray-300 focus:ring-[#e30613]" required />
                            <span className="text-xs text-gray-500 font-semibold leading-none">I agree to the <span className="text-[#e30613] hover:underline cursor-pointer">Privacy Policy</span> and <span className="text-[#e30613] hover:underline cursor-pointer">Terms & Conditions</span>.</span>
                        </div>

                        {/* Submit */}
                        <div className="md:col-span-2 pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-[#e30613] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#c40510] hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-red-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Sending...' : 'Submit Now'}
                                {!submitting && <Send size={18} />}
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-green-50 rounded-2xl border border-green-100"
                    >
                        <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                        <h3 className="text-2xl font-bold text-gray-800">Inquiry Sent Successfully!</h3>
                        <p className="text-gray-500 max-w-xs font-medium">Our travel expert will reach out to you within 24 hours.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default InquiryForm
