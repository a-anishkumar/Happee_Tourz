import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MapPin, Users, Heart, Globe, Star } from 'lucide-react'

const Company = () => {
    const services = [
        { icon: <Users />, title: 'Group Tours', desc: 'Fun-filled group travel experiences with like-minded travelers across India and abroad.' },
        { icon: <Heart />, title: 'Family & Honeymoon Tours', desc: 'Tailored packages for families and couples seeking romantic and relaxing getaways.' },
        { icon: <Globe />, title: 'International Tours', desc: 'Explore world-class destinations in Asia, Europe, and beyond with full support.' },
        { icon: <Star />, title: 'Customized Packages', desc: 'Personalized travel plans crafted around your schedule, budget, and preferences.' },
    ]

    const highlights = [
        'Based in Erode, Tamil Nadu – serving travelers across South India',
        'Specializes in domestic and international tour packages',
        'Offers group tours, family packages, and honeymoon specials',
        'Fully customized itineraries to match your unique travel needs',
        'Affordable pricing with transparent, all-inclusive packages',
        'Dedicated support team for a seamless travel experience',
        'Well-organized, on-time departures and professional guides',
        'Focused on customer satisfaction and memorable experiences',
    ]

    return (
        <div className="flex flex-col w-full bg-white">
            {/* Banner */}
            <div
                className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
            >
                <div className="absolute inset-0 bg-black/55" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center"
                >
                    <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight">About Us</h1>
                    <div className="w-20 h-2 bg-[#e30613] mx-auto mt-6 rounded-full" />
                </motion.div>
            </div>

            {/* About Intro */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px 60px' }} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full w-fit">
                            Who We Are
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] leading-tight">
                            Happee Tourz and Travels<br />
                            <span className="text-[#e30613]">— Erode</span>
                        </h2>
                        <p className="text-gray-600 font-medium leading-relaxed text-base">
                            Welcome to <strong>Happee Tourz and Travels</strong>, your trusted travel partner proudly based in Erode, Tamil Nadu. We are passionate about crafting unforgettable travel experiences that bring joy, comfort, and lifelong memories to every traveler.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-base">
                            Whether you dream of exploring scenic hill stations across India, enjoying a romantic honeymoon abroad, or embarking on an exciting group tour with friends and family — we have the perfect package for you. Our team of experienced travel professionals is dedicated to making your journey smooth, safe, and truly memorable.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-base">
                            We believe that travel should be affordable, well-organized, and stress-free. That's why every package we offer is thoughtfully designed with transparent pricing, quality accommodations, and attentive customer support every step of the way.
                        </p>

                        <div className="flex items-center gap-3 mt-2 p-4 bg-red-50 rounded-2xl border border-red-100">
                            <MapPin className="text-[#e30613] shrink-0" size={22} />
                            <div>
                                <p className="text-sm font-bold text-gray-800">Erode, Tamil Nadu, India</p>
                                <p className="text-xs text-gray-500 font-medium">Proudly serving travelers across South India</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -top-8 -left-8 w-36 h-36 bg-[#e30613]/10 rounded-full blur-3xl" />
                        <img
                            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Happee Tourz and Travels"
                            className="w-full rounded-3xl shadow-2xl relative z-10 object-cover"
                            style={{ maxHeight: '480px' }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="bg-gray-50" style={{ padding: '60px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                    <div className="text-center mb-12">
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full">
                            Our Services
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] mt-4">What We Offer</h2>
                        <div className="w-16 h-1.5 bg-[#e30613] mx-auto mt-5 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col gap-4"
                            >
                                <div className="w-14 h-14 bg-[#e30613]/5 rounded-xl flex items-center justify-center text-[#e30613] group-hover:bg-[#e30613] group-hover:text-white transition-all">
                                    {React.cloneElement(s.icon, { size: 26 })}
                                </div>
                                <h4 className="text-base font-bold text-[#1f2937]">{s.title}</h4>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }} className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] px-3 py-1 bg-red-50 rounded-full">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] mt-4 mb-8 leading-tight">
                            Your Happiness is <br /> Our Priority
                        </h2>
                        <div className="flex flex-col gap-4">
                            {highlights.map((point, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-[#e30613] shrink-0 mt-0.5" />
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1539635278303-d4002c07dee3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Happy Travelers"
                            className="w-full rounded-3xl shadow-2xl object-cover"
                            style={{ maxHeight: '500px' }}
                        />
                        <div className="absolute -bottom-6 -left-6 bg-[#e30613] text-white p-8 rounded-2xl shadow-2xl hidden md:block">
                            <span className="text-4xl font-black block">100%</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1 block">Customer Satisfaction</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission / Vision */}
            <section className="bg-[#1e2229] text-white" style={{ padding: '80px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-5 p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                            <h3 className="text-2xl font-extrabold text-[#e30613]">Our Vision</h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                To be the most trusted and loved travel company in South India, making quality travel accessible and affordable for every family, couple, and group — creating stories worth telling for a lifetime.
                            </p>
                        </div>
                        <div className="flex flex-col gap-5 p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                            <h3 className="text-2xl font-extrabold text-[#e30613]">Our Mission</h3>
                            <p className="text-gray-400 font-medium leading-relaxed">
                                To deliver well-organized, affordable, and memorable travel experiences with honesty and care. We strive to exceed every traveler's expectations through personalized attention, professional service, and genuine passion for travel.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Company
