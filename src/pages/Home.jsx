import React, { useState, useEffect, useRef } from 'react'
import HeroSection from '../components/HeroSection'
import PackageGrid from '../components/PackageGrid'
import TravelStories from '../components/TravelStories'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'
import { Compass, ShieldCheck, Map, Users, Award, Heart, ArrowRight } from 'lucide-react'
import { getPackages } from '../services/api'
import { useNavigate } from 'react-router-dom'

const AnimatedCounter = ({ to, suffix = '' }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [display, setDisplay] = useState('0')

    useEffect(() => {
        if (!isInView) return
        const num = parseInt(to.replace(/\D/g, ''), 10)
        let start = 0
        const step = Math.ceil(num / 50)
        const timer = setInterval(() => {
            start += step
            if (start >= num) { setDisplay(to); clearInterval(timer) }
            else setDisplay(start + (to.includes('+') ? '+' : to.includes('%') ? '%' : ''))
        }, 30)
        return () => clearInterval(timer)
    }, [isInView, to])

    return <span ref={ref}>{display}</span>
}

const Home = () => {
    const navigate = useNavigate()
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages()
                setPackages(data)
            } catch (err) {
                console.error('Error fetching packages:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchPackages()
    }, [])

    const featuredPackages = packages.slice(0, 3)

    const stats = [
        { id: 1, value: '500+', label: 'Happy Travelers' },
        { id: 2, value: '5+', label: 'Years Experience' },
        { id: 3, value: '50+', label: 'Destinations' },
        { id: 4, value: '100%', label: 'Customer Care' },
    ]

    const features = [
        { id: 1, title: 'Expert Planning', icon: <Compass />, desc: 'Carefully planned itineraries crafted by experienced travel professionals.' },
        { id: 2, title: 'Safe & Secure', icon: <ShieldCheck />, desc: 'Your safety is our top priority with verified, trusted travel partners.' },
        { id: 3, title: 'Personalized Care', icon: <Heart />, desc: 'Every trip is tailored to match your unique needs and preferences.' },
        { id: 4, title: 'All Destinations', icon: <Map />, desc: 'Domestic and international packages across 50+ destinations.' },
        { id: 5, title: 'Best Value', icon: <Award />, desc: 'Affordable packages with transparent pricing and no hidden costs.' },
        { id: 6, title: 'Group & Family', icon: <Users />, desc: 'Specialized packages for groups, families, couples, and solo travelers.' },
    ]

    return (
        <div className="flex flex-col w-full">
            <HeroSection />

            {/* Tour Categories */}
            <section style={{ padding: '80px 0', background: '#ffffff' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] mb-3 px-3 py-1 bg-red-50 rounded-full inline-block">Explore With Us</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] mt-3">Our Tour Categories</h2>
                        <div className="w-16 h-1.5 bg-[#e30613] mt-4 rounded-full mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <DestinationCard
                            title="International Tours"
                            count="Multiple Packages"
                            image="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80"
                            href="/tour-packages"
                        />
                        <DestinationCard
                            title="Domestic India Tours"
                            count="All Seasons"
                            image="https://images.unsplash.com/photo-1524492707947-526154394042?w=800&q=80"
                            href="/tour-packages"
                        />
                        <DestinationCard
                            title="Group & Honeymoon"
                            count="Tailored Plans"
                            image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
                            href="/group-tour-packages"
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#e30613]/10 rounded-full blur-3xl pointer-events-none" />
                            <img
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Happee Tourz and Travels"
                                className="w-full rounded-3xl shadow-2xl relative z-10 object-cover"
                                style={{ maxHeight: '460px' }}
                            />
                            <div className="absolute -bottom-5 -right-5 bg-[#e30613] text-white px-7 py-5 rounded-2xl shadow-2xl z-20 hidden md:block">
                                <span className="text-4xl font-black block">100%</span>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-80 block mt-1">Satisfaction</span>
                            </div>
                        </motion.div>

                        <div className="flex flex-col gap-5">
                            <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em]">About Us</span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1f2937] leading-tight">
                                Happee Tourz and Travels<br />
                                <span className="text-[#e30613]">— Erode, Tamil Nadu</span>
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Welcome to Happee Tourz and Travels, your trusted travel partner proudly based in Erode, Tamil Nadu. We specialize in crafting memorable travel experiences for individuals, families, couples, and groups across India and the world.
                            </p>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                From customized honeymoon packages to exciting group tours and affordable family holidays — we make travel easy, enjoyable, and unforgettable with transparent pricing and professional service.
                            </p>

                            <div className="grid grid-cols-2 gap-6 py-5 border-y border-gray-200">
                                {stats.map(stat => (
                                    <div key={stat.id} className="flex flex-col">
                                        <span className="text-3xl font-black text-[#e30613]">
                                            <AnimatedCounter to={stat.value} />
                                        </span>
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-tight mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/tour-packages')}
                                className="btn-red w-fit flex items-center gap-2"
                            >
                                Explore Our Packages <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Packages */}
            <PackageGrid
                items={featuredPackages}
                title="Trending Tour Packages"
                subtitle="Featured"
            />

            {/* Why Choose Us */}
            <section style={{ padding: '80px 0', background: '#1e2229', position: 'relative', overflow: 'hidden' }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#e30613]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] mb-3 px-3 py-1 bg-red-600/10 rounded-full inline-block">Our Strengths</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Why Choose Us</h2>
                        <div className="w-16 h-1.5 bg-[#e30613] mt-4 rounded-full mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div key={feature.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group flex flex-col gap-4">
                                <div className="w-14 h-14 bg-[#e30613] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-red-600/20">
                                    {React.cloneElement(feature.icon, { size: 28 })}
                                </div>
                                <h4 className="text-lg font-bold text-white mt-1">{feature.title}</h4>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Travel Stories */}
            <TravelStories />

            {/* CTA Section */}
            <section style={{ padding: '80px 0', background: '#ffffff' }}>
                <div className="container">
                    <div className="bg-[#e30613] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden group">
                        <div
                            className="absolute inset-0 opacity-10 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)' }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 flex flex-col items-center gap-6"
                        >
                            <h2 className="text-white text-3xl md:text-5xl font-black">
                                Plan Your Next Escape with<br />Happee Tourz and Travels
                            </h2>
                            <p className="text-white/80 text-base md:text-lg font-medium max-w-xl">
                                Whether it's a family holiday, honeymoon, or group adventure — we're here to make it perfect.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/contact')}
                                className="bg-white text-[#e30613] px-10 py-4 rounded-full font-black text-base hover:bg-gray-100 transition-colors shadow-2xl shadow-black/20 flex items-center gap-2"
                            >
                                Get Free Consultation <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const DestinationCard = ({ title, count, image, href }) => {
    const navigate = useNavigate()
    return (
        <motion.div
            whileHover={{ y: -8 }}
            onClick={() => navigate(href)}
            className="relative rounded-2xl overflow-hidden group h-[300px] shadow-xl bg-[#1e2229] cursor-pointer"
        >
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                onError={(e) => { e.target.style.display = 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="text-[#e30613] font-black text-[10px] uppercase tracking-[0.3em] mb-2">{count}</span>
                <h3 className="text-2xl font-black text-white leading-tight">{title}</h3>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-4 text-white/80 text-sm font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    View Packages <ArrowRight size={14} />
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Home
