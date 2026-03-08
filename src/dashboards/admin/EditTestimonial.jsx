import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Star, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTestimonialById, updateTestimonial } from '../../services/api'

const EditTestimonial = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [rating, setRating] = useState(5)
    const [form, setForm] = useState({
        name: '', date: '', review: '', image: '',
    })

    // Load existing testimonial data from backend
    useEffect(() => {
        const load = async () => {
            try {
                const test = await getTestimonialById(id)
                setForm({
                    name: test.name || '',
                    date: test.date || '',
                    review: test.review || '',
                    image: test.image || '',
                })
                setRating(test.rating || 5)
            } catch (err) {
                setError('Failed to load testimonial data.')
            } finally {
                setFetchLoading(false)
            }
        }
        load()
    }, [id])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await updateTestimonial(id, { ...form, rating })
            setSuccess(true)
            setTimeout(() => navigate('/admin/testimonials'), 2000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update review. Please try again.')
            setLoading(false)
        }
    }

    if (fetchLoading) return (
        <div className="flex h-screen items-center justify-center text-gray-400 gap-3">
            <Loader2 size={28} className="animate-spin" />
            <span className="font-bold">Loading review...</span>
        </div>
    )

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">HAPPEE TOURZ</span>
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
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Edit Review: {form.name}</h1>
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
                                <h3 className="text-2xl font-black text-gray-800">Review Updated!</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-xl text-sm font-semibold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Customer Name*</label>
                                <input name="name" type="text" required value={form.name} onChange={handleChange} className="form-input-premium" />
                            </div>
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Review Date*</label>
                                <input name="date" type="text" required value={form.date} onChange={handleChange} className="form-input-premium" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Star Rating</label>
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
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Customer Photo URL</label>
                                {form.image && <img src={form.image} alt={form.name} className="w-24 h-24 rounded-full object-cover shadow-xl" />}
                                <input name="image" type="url" value={form.image} onChange={handleChange} className="form-input-premium" placeholder="https://..." />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Review Text*</label>
                                <textarea name="review" rows="6" required value={form.review} onChange={handleChange} className="form-input-premium resize-none" />
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button type="submit" disabled={loading} className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] transition-all disabled:opacity-50">
                                    {loading ? 'Saving...' : 'Update Review'}
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
                    background-color: #f9fafb; border: 1px solid #f3f4f6;
                    padding: 1rem 1.25rem; border-radius: 0.75rem;
                    font-size: 0.875rem; font-weight: 600; color: #1f2937;
                    transition: all 0.3s; width: 100%;
                }
                .form-input-premium:focus { outline: none; background-color: white; border-color: #e30613; box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.05); }
            `}</style>
        </div>
    )
}

export default EditTestimonial
