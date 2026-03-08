import React from 'react'
import TestimonialCard from '../components/TestimonialCard'
import TravelStories from '../components/TravelStories'
import testimonials from '../data/testimonials.json'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'

const Testimonials = () => {
    return (
        <div className="flex flex-col w-full bg-white">
            {/* Banner */}
            <div
                className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544621110-3882f0c18400?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
            >
                <div className="absolute inset-0 bg-black/60" />
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {testimonials.map((test) => (
                            <TestimonialCard key={test.id} item={test} />
                        ))}
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
                        <StoryPhoto title="South America" image="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
                        <StoryPhoto title="Japan" image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
                        <StoryPhoto title="Malaysia And Singapore" image="https://images.unsplash.com/photo-1525625239114-987448227038?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
                        <StoryPhoto title="Great Britain" image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
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
        <div className="aspect-[4/5] overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
        </div>
        <div className="py-4 px-2 text-center">
            <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#e30613] transition-colors">{title}</h4>
        </div>
    </motion.div>
)

export default Testimonials
