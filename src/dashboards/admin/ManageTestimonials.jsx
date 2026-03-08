import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, LogOut, PlusCircle, Pencil, Trash2, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import testimonials from '../../data/testimonials.json'

const ManageTestimonials = () => {
    const navigate = useNavigate()
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin !== 'true') navigate('/admin/login')

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Consistent */}
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">GRAND ROYAL TOURS</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>
                <nav className="flex flex-col gap-4">
                    <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <SidebarLink to="/admin/packages" icon={<Package size={20} />} label="Manage Packages" />
                    <SidebarLink to="/admin/testimonials" icon={<MessageSquare size={20} />} label="Manage Testimonials" active />
                </nav>
            </aside>

            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Manage Testimonials</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                    <Link to="/admin/testimonials/add" className="btn-red px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl shadow-red-600/20 hover:scale-105 active:scale-95 transition-all">
                        <PlusCircle size={20} />
                        Add New Review
                    </Link>
                </header>

                {/* Review Table View */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest pl-10">Reviewer Info</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Review Excerpt</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Rating</th>
                                <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest pr-10 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {testimonials.map((test, idx) => (
                                <motion.tr
                                    key={test.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="p-6 pl-10 flex items-center gap-4">
                                        <img src={test.image} alt={test.name} className="w-14 h-14 object-cover rounded-full shadow-md group-hover:scale-110 transition-transform" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 tracking-tight">{test.name}</span>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{test.date}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-sm font-semibold text-gray-400 max-w-sm"><p className="line-clamp-2">"{test.review}"</p></td>
                                    <td className="p-6">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-6 pr-10 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to={`/admin/testimonials/edit/${test.id}`} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                <Pencil size={18} />
                                            </Link>
                                            <button className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
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

export default ManageTestimonials
