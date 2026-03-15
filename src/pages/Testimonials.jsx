import React, { useState, useEffect } from 'react'
import TestimonialCard from '../components/TestimonialCard'
import TravelStories from '../components/TravelStories'
import { getTestimonials } from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitTestimonial } from '../services/api'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isWriting, setIsWriting] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', rating: 5, review: '' })

    const fetchTestimonials = async () => {
        try {
            setLoading(true)
            const data = await getTestimonials()
            setTestimonials(data)
        } catch (err) {
            console.error('Error fetching testimonials:', err)
            setError('Failed to load reviews. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            await submitTestimonial(form)
            setSubmitted(true)
            setForm({ name: '', rating: 5, review: '' })
            setIsWriting(false)
            fetchTestimonials()
            setTimeout(() => setSubmitted(false), 5000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review. Try again.')
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="flex flex-col w-full bg-white">
            {/* Banner */}
            <div
                className="relative h-[400px] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1e2229 0%, #2d3748 50%, #1e2229 100%)'
                }}
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center"
                >
                    <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight">Testimonial</h1>
                    <div className="w-20 h-2 bg-[#e30613] mx-auto mt-6 rounded-full" />
                </motion.div>
            </div>

            <TravelStories />

            {/* Trust Pilot Style Section */}
            <section className="py-20 bg-gray-50/50">
                <div className="container">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] font-black mb-2 px-3 py-1 bg-red-50 rounded-full">Customer Reviews</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937]">What our customers say</h2>
                        <div className="w-20 h-1.5 bg-[#e30613] mt-6 rounded-full" />

                        {/* Write a Review Button */}
                        {!isWriting && !submitted && (
                            <button
                                onClick={() => setIsWriting(true)}
                                className="mt-10 bg-[#e30613] text-white px-8 py-3 rounded-full font-bold hover:bg-[#c40510] transition-colors shadow-lg shadow-red-600/20"
                            >
                                Write a Review
                            </button>
                        )}

                        {/* Submission Success */}
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-10 flex items-center justify-center gap-3 bg-green-50 text-green-700 px-6 py-4 rounded-2xl border border-green-100 font-bold"
                            >
                                <CheckCircle2 size={24} />
                                Thank you! Your review has been successfully submitted.
                            </motion.div>
                        )}

                        {/* Testimonial Form */}
                        <AnimatePresence>
                            {isWriting && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-10 w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-xl font-bold text-gray-800">Share Your Experience</h3>
                                        <button onClick={() => setIsWriting(false)} className="text-gray-400 hover:text-gray-600 font-bold">Cancel</button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={form.name}
                                                    onChange={handleFormChange}
                                                    placeholder="Enter your name"
                                                    className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Rating (1-5)</label>
                                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 p-3 rounded-xl">
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <Star
                                                            key={num}
                                                            size={20}
                                                            className={`cursor-pointer transition-colors ${form.rating >= num ? 'fill-[#e30613] text-[#e30613]' : 'text-gray-300'}`}
                                                            onClick={() => setForm(prev => ({ ...prev, rating: num }))}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Your Review</label>
                                            <textarea
                                                name="review"
                                                required
                                                rows="4"
                                                value={form.review}
                                                onChange={handleFormChange}
                                                placeholder="What did you love about your trip?"
                                                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e30613]/25 focus:border-[#e30613] transition-all resize-none"
                                            ></textarea>
                                        </div>

                                        {error && (
                                            <div className="flex items-center gap-2 text-red-600 text-xs font-bold px-4 py-2 bg-red-50 rounded-lg">
                                                <AlertCircle size={14} /> {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="bg-[#e30613] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#c40510] transition-all disabled:opacity-50"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Review'}
                                            {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                                <Loader2 size={48} className="animate-spin text-[#e30613]" />
                                <p className="font-bold text-gray-800">Loading reviews...</p>
                            </div>
                        ) : error ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 opacity-40">
                                <h3 className="text-xl font-bold text-red-600 tracking-tight">{error}</h3>
                            </div>
                        ) : testimonials.length > 0 ? (
                            testimonials.map((test) => (
                                <TestimonialCard key={test.id} item={test} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 opacity-40 italic">
                                No reviews found yet. Be the first to share your experience!
                            </div>
                        )}
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="flex justify-center mt-16 gap-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === 0 ? 'bg-[#e30613] w-8' : 'bg-gray-300 hover:bg-gray-400'}`} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Photos Grid (Voyager's View) */}
            <section className="section-padding bg-white">
                <div className="container">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] font-black mb-2 px-3 py-1 bg-red-50 rounded-full">Voyager's View</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937]">Captures From Around The World</h2>
                        <div className="w-20 h-1.5 bg-[#e30613] mt-6 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StoryPhoto title="South America" image="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&q=80" />
                        <StoryPhoto title="Japan" image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" />
                        <StoryPhoto title="Malaysia And Singapore" image="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1080&q=80" />
                        <StoryPhoto title="Great Britain" image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" />
                        <StoryPhoto title="Switzerland" image="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80" />
                        <StoryPhoto title="Dubai, UAE" image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" />
                        <StoryPhoto title="Bali, Indonesia" image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" />
                        <StoryPhoto title="Cairo, Egypt" image="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&q=80" />
                    </div>
                </div>
            </section>
        </div>
    )
}

const StoryPhoto = ({ title, image }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="bg-white border-8 border-white shadow-xl rounded-xl overflow-hidden group"
    >
        <div className="aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-gray-700 to-gray-900">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all pointer-events-none" />
        </div>
        <div className="py-4 px-2 text-center">
            <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#e30613] transition-colors">{title}</h4>
        </div>
    </motion.div>
)

export default Testimonials
