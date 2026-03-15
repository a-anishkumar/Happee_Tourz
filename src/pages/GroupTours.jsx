import React, { useState, useEffect } from 'react'
import PackageGrid from '../components/PackageGrid'
import { getPackages } from '../services/api'
import { motion } from 'framer-motion'
import { Users, ShieldCheck, Heart, Map, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const GroupTours = () => {
    const navigate = useNavigate()
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages()
                setPackages(data)
            } catch (err) {
                console.error('Error fetching group tours:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchPackages()
    }, [])

    const groupPackages = packages.filter(pkg => (pkg.title || '').toLowerCase().includes('group'))

    return (
        <div className="flex flex-col w-full bg-white">
            {/* Banner */}
            <div
                className="relative h-[480px] flex items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1e2229 0%, #2d3748 50%, #1e2229 100%)'
                }}
            >
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1539635278303-d4002c07dee3?w=1920&q=80")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center flex flex-col items-center gap-6"
                >
                    <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.4em] px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-2xl border border-white/20">Fun in Numbers</span>
                    <h1 className="text-white text-5xl md:text-8xl font-black tracking-tight leading-none">Group Tour <br /><span className="text-[#e30613]">Packages</span></h1>
                    <div className="w-20 h-2 bg-white rounded-full mt-2" />
                </motion.div>
            </div>

            {/* Group Tour Benefits */}
            <section className="py-20 bg-gray-50/50">
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <GroupBenefit icon={<Users />} title="Travel with Friends" desc="Create lifelong bonds with like-minded travelers." />
                    <GroupBenefit icon={<ShieldCheck />} title="Maximum Safety" desc="Safety in numbers with 24/7 expert supervision." />
                    <GroupBenefit icon={<Heart />} title="Hassle Free" desc="We handle everything from visas to food preferences." />
                    <GroupBenefit icon={<Map />} title="Best Itineraries" desc="Explore destinations with curated local group insights." />
                </div>
            </section>

            {/* Packages Grid */}
            <section className="section-padding flex-grow">
                <div className="container">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
                            <Loader2 size={48} className="animate-spin text-[#e30613]" />
                            <p className="font-bold text-gray-800">Finding group adventures...</p>
                        </div>
                    ) : groupPackages.length > 0 ? (
                        <PackageGrid
                            items={groupPackages}
                            subtitle="Curated Social Travel"
                            title="Upcoming Group Adventures"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 gap-6 opacity-40">
                            <Users size={64} className="text-[#e30613]" />
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">No group packages available at the moment</h3>
                            <button className="text-[#e30613] font-bold underline">Notify Me of New Tours</button>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Styled CTA */}
            <section className="py-24 bg-[#1e2229]">
                <div className="container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.3em] font-black">Why Group Tours?</span>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">Better Experiences <br /> Better Pricing</h2>
                            <p className="text-gray-400 font-medium leading-relaxed mt-4">
                                Group tours offer the perfect balance of planned efficiency and spontaneous fun. By joining a group, you not only save significant costs through collective bargaining but also enjoy the security of traveling with a community.
                            </p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/contact')}
                            className="btn-red w-fit px-12 py-4"
                        >
                            Inquire For Group Discounts
                        </motion.button>
                    </div>
                    <div className="relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#e30613]/20 rounded-full blur-3xl animate-pulse" />
                        <img
                            src="https://www.dattatrimurtitours.com/admin/uploads/category/674aa0db3f9d1.jpg"
                            alt="Group Fun"
                            className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl relative z-10"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

const GroupBenefit = ({ icon, title, desc }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col gap-4">
        <div className="w-16 h-16 bg-[#e30613]/5 rounded-2xl flex items-center justify-center text-[#e30613] shadow-lg group-hover:bg-[#e30613] group-hover:text-white transition-all transform group-hover:scale-110">
            {React.cloneElement(icon, { size: 28 })}
        </div>
        <h4 className="text-lg font-extrabold text-[#1f2937] mt-4">{title}</h4>
        <p className="text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
    </div>
)

export default GroupTours
