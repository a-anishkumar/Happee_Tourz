import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, Trash2, Loader2, Users, Settings, LogOut, Search, Calendar, Mail, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getInquiries, deleteInquiry } from '../../services/api'

const ManageInquiries = () => {
    const navigate = useNavigate()
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchInquiries = async () => {
            try {
                setLoading(true)
                const data = await getInquiries()
                setInquiries(data)
            } catch (err) {
                console.error('Error fetching inquiries:', err)
                setError('Failed to load inquiries. Please check your credentials.')
                if (err.response?.status === 401) {
                    localStorage.removeItem('adminToken')
                    navigate('/admin/login')
                }
            } finally {
                setLoading(false)
            }
        }
        fetchInquiries()
    }, [navigate])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return
        try {
            await deleteInquiry(id)
            setInquiries(inquiries.filter(item => item.id !== id))
        } catch (err) {
            alert('Failed to delete inquiry.')
        }
    }

    const filteredInquiries = inquiries.filter(item =>
        item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.package?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">Happee Tourz</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>

                <nav className="flex flex-col gap-4">
                    <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <SidebarLink to="/admin/packages" icon={<Package size={20} />} label="Manage Packages" />
                    <SidebarLink to="/admin/testimonials" icon={<MessageSquare size={20} />} label="Manage Testimonials" />
                    <SidebarLink to="/admin/inquiries" icon={<Users size={20} />} label="User Inquiries" active />
                    <SidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Site Settings" />
                </nav>

                <button
                    onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login') }}
                    className="mt-auto flex items-center gap-3 text-gray-500 hover:text-[#e30613] font-bold text-sm tracking-widest uppercase transition-all"
                >
                    <LogOut size={20} />
                    Logout Securely
                </button>
            </aside>

            <main className="flex-grow flex flex-col p-8 lg:p-12 overflow-y-auto bg-gray-50">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">User Inquiries</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>

                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, email or package..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#e30613]/10 focus:border-[#e30613] transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="flex-grow">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full py-20 gap-4 opacity-40">
                            <Loader2 size={48} className="animate-spin text-[#e30613]" />
                            <p className="font-bold text-gray-800">Reading inquiries...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-2xl text-center">
                            <p className="font-bold">{error}</p>
                        </div>
                    ) : filteredInquiries.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence>
                                {filteredInquiries.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col lg:flex-row gap-8 items-start lg:items-center"
                                    >
                                        <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center text-[#e30613] shrink-0">
                                            <Users size={28} />
                                        </div>

                                        <div className="flex flex-col gap-2 flex-grow">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-black text-gray-800">{item.full_name}</h3>
                                                {item.package && (
                                                    <span className="px-3 py-1 bg-red-50 text-[#e30613] text-[9px] font-black uppercase tracking-widest rounded-full">
                                                        {item.package}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500 tracking-wide">
                                                <span className="flex items-center gap-1.5"><Mail size={14} className="text-gray-300" /> {item.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-300" /> {item.phone}</span>
                                                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-300" /> Traveling in {item.travel_month || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="lg:max-w-md w-full bg-gray-50 p-4 rounded-xl border border-gray-100 italic text-sm text-gray-600 font-medium">
                                            <div className="flex items-start gap-2">
                                                <MessageSquare size={16} className="text-gray-300 mt-1 shrink-0" />
                                                <p className="line-clamp-3">"{item.message || 'No message provided.'}"</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-2 shrink-0">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="w-12 h-12 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-white hover:bg-[#e30613] hover:border-[#e30613] flex items-center justify-center transition-all shadow-sm"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 gap-6 opacity-30">
                            <Search size={64} className="text-[#e30613]" />
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">No inquiries found</h3>
                            <button onClick={() => setSearchTerm('')} className="text-[#e30613] font-bold underline">Clear Search</button>
                        </div>
                    )}
                </div>
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

export default ManageInquiries
