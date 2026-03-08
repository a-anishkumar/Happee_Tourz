import React, { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const InquiryForm = () => {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
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
                        {/* Name */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Full Name*</label>
                            <input
                                type="text"
                                required
                                placeholder="Your name"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Phone Number*</label>
                            <input
                                type="tel"
                                required
                                placeholder="Include country code"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Email Address*</label>
                            <input
                                type="email"
                                required
                                placeholder="Email Us"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Number of persons */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Number of persons*</label>
                            <input
                                type="number"
                                required
                                placeholder="Enter No of persons"
                                className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all"
                            />
                        </div>

                        {/* Package Selection */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Package*</label>
                            <select className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer">
                                <option value="">Select Package</option>
                                <option value="japan">Japan Group Tour</option>
                                <option value="bali">Bali Group Tour</option>
                                <option value="rajasthan">Rajasthan Group Tour</option>
                            </select>
                        </div>

                        {/* Month of Travel */}
                        <div className="flex flex-col gap-2 group/field">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Month of travel*</label>
                            <select className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#e30613]/20 focus:border-[#e30613] transition-all cursor-pointer">
                                <option value="">Select Month</option>
                                <option value="jan">January</option>
                                <option value="feb">February</option>
                                <option value="mar">March</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2 group/field md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Write Your Message</label>
                            <textarea
                                rows="4"
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
                                className="w-full bg-[#e30613] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#c40510] hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-red-600/20"
                            >
                                Submit Now
                                <Send size={18} />
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
