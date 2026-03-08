import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const TestimonialCard = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
        >
            {/* Review Box */}
            <div className="bg-gray-50/50 backdrop-blur-sm border border-gray-100 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {/* Quote Mark */}
                <span className="text-4xl text-[#e30613] leading-none font-serif mb-2 select-none">"</span>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 font-medium mb-6 flex-grow">
                    {item.review}
                </p>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest cursor-pointer hover:text-[#e30613]">READ MORE</span>
                </div>
            </div>

            {/* User Info Below Box */}
            <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#e30613]/20 shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-800 text-sm tracking-tight">{item.name}</span>
                        <CheckCircle2 size={12} className="text-[#e30613] fill-[#e30613]/10" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold">{item.date}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default TestimonialCard
