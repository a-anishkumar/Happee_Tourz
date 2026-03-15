import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] scale-110"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                    animation: 'heroPan 12s ease-in-out infinite alternate'
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            </div>

            {/* Content */}
            <div className="container relative z-10 text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-black uppercase tracking-[0.4em] text-[#e30613]"
                    >
                        Erode's Most Trusted Travel Partner
                    </motion.span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Beyond <span className="text-[#e30613]">Destination</span>, <br />
                        Creating <span className="italic">Memories</span>
                    </h1>

                    <p className="text-lg md:text-xl font-medium max-w-2xl text-gray-200">
                        Explore the world with Erode's most trusted travel partner.
                        Crafting perfect journeys for every traveler.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(227,6,19,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/tour-packages')}
                            className="btn-red text-lg px-10 py-4 shadow-xl shadow-red-600/20"
                        >
                            Explore Packages
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/contact')}
                            className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded font-bold hover:bg-white/20 transition-all"
                        >
                            Contact Us
                        </motion.button>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="mt-8 flex flex-col items-center gap-2 opacity-60"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
                        <div className="w-0.5 h-8 bg-white/60 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection
