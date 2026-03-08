import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, ArrowLeft, Upload, CheckCircle2, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AddTestimonial = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [rating, setRating] = useState(5)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setTimeout(() => navigate('/admin/testimonials'), 2000)
        }, 1500)
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Consistent */}
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">GRAND ROYAL TOURS</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>
            </aside>

            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 mb-2">
                            <button onClick={() => navigate('/admin/testimonials')} className="text-gray-400 hover:text-[#e30613] transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <span className="text-[#e30613] font-black text-[10px] uppercase tracking-widest">Review Management</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Add Customer Review</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                </header>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 rounded-[2.5rem]"
                            >
                                <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Review Published!</h3>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Syncing to testimonials page...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Customer Name*</label>
                                <input type="text" required placeholder="Ex: Devi A" className="form-input-premium" />
                            </div>

                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Review Date*</label>
                                <input type="text" required placeholder="Ex: 2 days ago" className="form-input-premium" />
                            </div>

                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Star Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-yellow-400' : 'text-gray-200'}`}
                                        >
                                            <Star size={24} fill={rating >= s ? 'currentColor' : 'none'} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Customer Photo*</label>
                                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-[#e30613]/5 hover:border-[#e30613]/20 transition-all cursor-pointer group/upload">
                                    <Upload size={24} className="text-[#e30613] group-hover/upload:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase text-gray-400">Upload Profile</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Detailed Review*</label>
                                <textarea rows="6" required placeholder="Paste the customer review here..." className="form-input-premium resize-none"></textarea>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button type="submit" disabled={loading} className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                    {loading ? 'Processing...' : 'Publish Review'}
                                </button>
                                <button type="button" onClick={() => navigate('/admin/testimonials')} className="bg-gray-100 text-gray-500 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <style>{`
         .form-input-premium {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            transition: all 0.3s;
         }
         .form-input-premium:focus {
            outline: none;
            background-color: white;
            border-color: #e30613;
            box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.05);
         }
      `}</style>
        </div>
    )
}

export default AddTestimonial
