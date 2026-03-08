import React from 'react'
import { motion } from 'framer-motion'

const HeroSection = () => {
    return (
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="container relative z-10 text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        Beyond <span className="text-[#e30613]">Destination</span>, <br />
                        Creating <span className="italic">Memories</span>
                    </h1>

                    <p className="text-lg md:text-xl font-medium max-w-2xl text-gray-200">
                        Explore the world with Erode's most trusted travel partner.
                        Crafting perfect journeys for every traveler.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <button className="btn-red text-lg px-10 py-4 shadow-xl shadow-red-600/20">
                            Explore Packages
                        </button>
                        <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded font-bold hover:bg-white/20 transition-all">
                            Contact Us
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection
