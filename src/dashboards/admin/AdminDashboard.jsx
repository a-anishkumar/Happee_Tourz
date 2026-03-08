import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, LogOut, BarChart3, Users, PlusCircle, Settings, ChevronRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { getPackages, getTestimonials, getInquiries } from '../../services/api'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [packages, setPackages] = useState([])
    const [testimonials, setTestimonials] = useState([])
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin/login')
            return
        }

        const fetchData = async () => {
            try {
                const [pkgs, tests, inqs] = await Promise.all([
                    getPackages(),
                    getTestimonials(),
                    getInquiries()
                ])
                setPackages(pkgs)
                setTestimonials(tests)
                setInquiries(inqs)
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
                if (err.response?.status === 401) {
                    localStorage.removeItem('adminToken')
                    navigate('/admin/login')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin/login')
    }

    const stats = [
        { label: 'Active Packages', value: packages.filter(p => p.status === 'Active').length, icon: <Package />, color: 'bg-blue-500' },
        { label: 'Coming Soon', value: packages.filter(p => p.status === 'Coming Soon').length, icon: <LayoutDashboard />, color: 'bg-yellow-500' },
        { label: 'Total Reviews', value: testimonials.length, icon: <MessageSquare />, color: 'bg-[#e30613]' },
        { label: 'New Inquiries', value: inquiries.length, icon: <BarChart3 />, color: 'bg-emerald-500' },
    ]

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">GRAND ROYAL TOURS</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>

                <nav className="flex flex-col gap-4">
                    <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <SidebarLink to="/admin/packages" icon={<Package size={20} />} label="Manage Packages" />
                    <SidebarLink to="/admin/testimonials" icon={<MessageSquare size={20} />} label="Manage Testimonials" />
                    <SidebarLink to="/admin/inquiries" icon={<Users size={20} />} label="User Inquiries" />
                    <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Site Settings" />
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 text-gray-500 hover:text-[#e30613] font-bold text-sm tracking-widest uppercase transition-all"
                >
                    <LogOut size={20} />
                    Logout Securely
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Dashboard Overview</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                    <div className="flex gap-4">
                        <Link to="/admin/packages/add" className="btn-red px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl shadow-red-600/20">
                            <PlusCircle size={20} />
                            New Package
                        </Link>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
                        <Loader2 size={48} className="animate-spin text-[#e30613]" />
                        <p className="font-bold text-gray-800">Synchronizing Dashboard...</p>
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-xl transition-all"
                                >
                                    <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                                        {React.cloneElement(stat.icon, { size: 24 })}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{stat.label}</span>
                                        <span className="text-3xl font-black text-gray-800">{stat.value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Packages Table Preview */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-extrabold text-[#1f2937]">Recent Packages</h3>
                                    <Link to="/admin/packages" className="text-[#e30613] text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1">View All <ChevronRight size={14} /></Link>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {packages.slice(0, 4).map(pkg => (
                                        <div key={pkg.id} className="flex items-center gap-4 group">
                                            {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-16 h-12 object-cover rounded-lg group-hover:scale-105 transition-all shadow-md" />}
                                            <div className="flex flex-col flex-grow">
                                                <span className="text-sm font-bold text-gray-700">{pkg.title}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{pkg.destination}</span>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${pkg.status === 'Active' ? 'text-green-600 bg-green-50 border-green-100' : 'text-yellow-600 bg-yellow-50 border-yellow-100'
                                                }`}>
                                                {pkg.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonials Preview */}
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-extrabold text-[#1f2937]">Recent Reviews</h3>
                                    <Link to="/admin/testimonials" className="text-[#e30613] text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1">View All <ChevronRight size={14} /></Link>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {testimonials.slice(0, 4).map(test => (
                                        <div key={test.id} className="flex items-center gap-4 group">
                                            {test.image && <img src={test.image} alt={test.name} className="w-10 h-10 object-cover rounded-full group-hover:scale-110 transition-all shadow-md" />}
                                            <div className="flex flex-col flex-grow">
                                                <span className="text-sm font-bold text-gray-700">{test.name}</span>
                                                <p className="text-[10px] text-gray-400 font-bold line-clamp-1 italic">"{test.review}"</p>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

const SidebarLink = ({ to, icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-4 p-4 rounded-xl font-bold text-sm tracking-widest transition-all ${active
            ? 'bg-[#e30613] text-white shadow-xl shadow-red-600/20'
            : 'text-gray-500 hover:text-white hover:bg-white/5'
            }`}
    >
        {icon}
        {label}
    </Link>
)

export default AdminDashboard
