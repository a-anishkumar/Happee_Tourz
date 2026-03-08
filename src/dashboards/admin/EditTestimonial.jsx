import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, ArrowLeft, Upload, CheckCircle2, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import testimonials from '../../data/testimonials.json'

const EditTestimonial = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [test, setTest] = useState(null)
    const [rating, setRating] = useState(5)

    useEffect(() => {
        const t = testimonials.find(t => t.id === parseInt(id))
        if (t) {
            setTest(t)
            setRating(t.rating)
        }
    }, [id])

    if (!test) return <div>Loading...</div>

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
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Edit Review: {test.name}</h1>
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
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Review Updated!</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Customer Name</label>
                                <input type="text" defaultValue={test.name} className="form-input-premium" />
                            </div>
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Review Date</label>
                                <input type="text" defaultValue={test.date} className="form-input-premium" />
                            </div>
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Modify Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button key={s} type="button" onClick={() => setRating(s)} className={`p-2 transition-all ${rating >= s ? 'text-yellow-400' : 'text-gray-200'}`}>
                                            <Star size={24} fill={rating >= s ? 'currentColor' : 'none'} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Customer Photo</label>
                                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white group/img cursor-pointer">
                                    <img src={test.image} alt={test.name} className="w-full h-full object-cover transition-all group-hover/img:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                        <Upload size={24} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Modify Review Text</label>
                                <textarea rows="6" defaultValue={test.review} className="form-input-premium resize-none"></textarea>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <button type="submit" disabled={loading} className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] transition-all">
                                    Update Review
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
         .form-input-premium:focus { outline: none; border-color: #e30613; box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.05); }
      `}</style>
        </div>
    )
}

export default EditTestimonial
