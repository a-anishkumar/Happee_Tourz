import React from 'react'
import { Link } from 'react-router-dom'
import { Package, MessageSquare, Phone, Home, Globe, LayoutGrid } from 'lucide-react'
import { motion } from 'framer-motion'

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 section-padding">
            <div className="container">
                <header className="flex flex-col items-center text-center mb-16 gap-6">
                    <span className="text-[#e30613] font-black text-xs uppercase tracking-[0.4em] px-4 py-2 bg-red-50 rounded-full">User Hub</span>
                    <h1 className="text-4xl md:text-6xl font-black text-[#1f2937]">Welcome to Royal Departures</h1>
                    <p className="text-gray-400 font-medium max-w-xl">Quickly access everything you need for your next adventure. Your journey starts here.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <DashboardCard
                        to="/"
                        icon={<Home size={32} />}
                        label="Explore Homepage"
                        desc="Return to our main landing page for features and offers."
                    />
                    <DashboardCard
                        to="/tour-packages"
                        icon={<Package size={32} />}
                        label="Browse Packages"
                        desc="View our curated list of international and domestic tours."
                    />
                    <DashboardCard
                        to="/group-tour-packages"
                        icon={<Globe size={32} />}
                        label="Join Group Tours"
                        desc="Find upcoming group adventures and social travels."
                    />
                    <DashboardCard
                        to="/testimonials"
                        icon={<MessageSquare size={32} />}
                        label="Our Happy Stories"
                        desc="Read reviews and watch travel stories from our guests."
                    />
                    <DashboardCard
                        to="/contact"
                        icon={<Phone size={32} />}
                        label="Get Assistance"
                        desc="Reach out to our travel experts for personalized planning."
                    />
                    <DashboardCard
                        to="/company"
                        icon={<LayoutGrid size={32} />}
                        label="About Our Legacy"
                        desc="Learn more about our 25-year history in travel."
                    />
                </div>
            </div>
        </div>
    )
}

const DashboardCard = ({ to, icon, label, desc }) => (
    <Link to={to}>
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6 group hover:border-[#e30613]/20 transition-all"
        >
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 group-hover:bg-[#e30613] group-hover:text-white transition-all shadow-lg group-hover:shadow-[#e30613]/30">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-black text-[#1f2937] group-hover:text-[#e30613] transition-colors">{label}</h3>
                <p className="text-sm font-medium text-gray-400 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    </Link>
)

export default UserDashboard
