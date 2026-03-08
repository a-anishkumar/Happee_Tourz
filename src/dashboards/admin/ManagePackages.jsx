import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, PlusCircle, Pencil, Trash2, Loader2, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { getPackages, deletePackage } from '../../services/api'

const ManagePackages = () => {
    const navigate = useNavigate()
    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Redirect if not authenticated
    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) navigate('/admin/login')
    }, [navigate])

    // Fetch packages from backend API
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages()
                setPackages(data)
            } catch (err) {
                setError('Failed to load packages. Is the backend running?')
            } finally {
                setLoading(false)
            }
        }
        fetchPackages()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?')) return
        try {
            await deletePackage(id)
            setPackages(prev => prev.filter(p => p.id !== id))
        } catch (err) {
            alert('Failed to delete package. Please try again.')
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">HAPPEE TOURZ</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>
                <nav className="flex flex-col gap-4">
                    <SidebarLink to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Overview" />
                    <SidebarLink to="/admin/packages" icon={<Package size={20} />} label="Manage Packages" active />
                    <SidebarLink to="/admin/testimonials" icon={<MessageSquare size={20} />} label="Manage Testimonials" />
                    <SidebarLink to="/admin/inquiries" icon={<Users size={20} />} label="User Inquiries" />
                </nav>
            </aside>

            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Manage Tour Packages</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                    <Link to="/admin/packages/add" className="btn-red px-6 py-3 rounded-xl flex items-center gap-2 shadow-xl shadow-red-600/20 hover:scale-105 active:scale-95 transition-all">
                        <PlusCircle size={20} />
                        Add New Package
                    </Link>
                </header>

                {loading && (
                    <div className="flex items-center justify-center py-32 gap-3 text-gray-400">
                        <Loader2 size={28} className="animate-spin" />
                        <span className="font-bold">Loading packages from database...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl font-semibold">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest pl-10">Package Info</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Duration</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest pr-10 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {packages.map((pkg, idx) => (
                                    <motion.tr
                                        key={pkg.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="p-6 pl-10 flex items-center gap-4">
                                            {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-20 h-16 object-cover rounded-xl shadow-md group-hover:scale-110 transition-transform" />}
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 tracking-tight">{pkg.title}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">{pkg.destination}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm font-bold text-gray-500">{pkg.duration}</td>
                                        <td className="p-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${pkg.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {pkg.status}
                                            </span>
                                        </td>
                                        <td className="p-6 pr-10 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/admin/packages/edit/${pkg.id}`} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                    <Pencil size={18} />
                                                </Link>
                                                <button onClick={() => handleDelete(pkg.id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <span className="text-xs font-bold text-gray-400">Showing {packages.length} package(s)</span>
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

export default ManagePackages
