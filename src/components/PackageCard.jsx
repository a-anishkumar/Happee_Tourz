import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const PackageCard = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-100 rounded-lg overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.status === 'Coming Soon' && (
                        <span className="bg-yellow-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                            Coming Soon
                        </span>
                    )}
                    {item.hotDeal && (
                        <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg">
                            Hot Deal
                        </span>
                    )}
                </div>

                {/* Duration Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#e30613]" />
                    {item.duration}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#e30613] transition-colors line-clamp-2">
                        {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <MapPin size={14} className="text-[#e30613]" />
                        <span className="text-xs font-semibold leading-none">{item.destination}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 italic">
                    {item.cities}
                </p>

                <div className="pt-4 mt-auto">
                    <Link
                        to={`/contact?package=${encodeURIComponent(item.title)}`}
                        className="w-full bg-[#e30613] text-white py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-[#c40510] transition-colors shadow-lg shadow-red-600/10 group-hover:scale-[1.02] active:scale-95"
                    >
                        Get Quote
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default PackageCard
