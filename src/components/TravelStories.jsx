import React from 'react'
import { Play, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const TravelStories = () => {
    const stories = [
        { id: 1, title: 'Thailand 60 Pax Corporate Tour', thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', date: '3 months ago', link: '' },
        { id: 2, title: 'Sri Lanka Customer Review', thumbnail: 'https://images.unsplash.com/photo-1588598198321-9735fd89eda1?w=600&q=80', date: '5 days ago', link: '' },
        { id: 3, title: 'Bhutan Group Tour Review', thumbnail: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=600&q=80', date: '1 month ago', link: '' },
    ]

    return (
        <section className="section-padding bg-white">
            <div className="container">
                <div className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-3">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full w-fit">
                            Travel Stories
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1f2937]">
                            Voyager's View
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <motion.div
                            key={story.id}
                            whileHover={{ y: -5 }}
                            onClick={() => story.link && window.open(story.link, '_blank')}
                            className={`relative rounded-2xl overflow-hidden group shadow-lg aspect-video bg-gradient-to-br from-gray-800 to-gray-900 ${story.link ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <img
                                src={story.thumbnail}
                                alt={story.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h4 className="text-white font-bold mb-1 group-hover:text-[#e30613] transition-colors line-clamp-1">{story.title}</h4>
                                <span className="text-gray-400 text-xs font-semibold">{story.date}</span>
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-[#e30613] rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-600/50 group-hover:scale-125 transition-transform">
                                    <Play size={24} fill="white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    )
}

export default TravelStories
