import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { LayoutDashboard, Package, ArrowLeft, Upload, CheckCircle2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import packages from '../../data/packages.json'

const EditPackage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [pkg, setPkg] = useState(null)

    useEffect(() => {
        const p = packages.find(p => p.id === parseInt(id))
        if (p) setPkg(p)
    }, [id])

    if (!pkg) return <div>Loading...</div>

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setTimeout(() => navigate('/admin/packages'), 2000)
        }, 1500)
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <aside className="w-80 bg-[#1e2229] flex flex-col p-8 gap-10">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none">GRAND ROYAL TOURS</span>
                    <span className="text-[10px] text-[#e30613] font-medium tracking-[0.2em] mt-1 uppercase">Admin Control Panel</span>
                </div>
            </aside>

            <main className="flex-grow flex flex-col p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-4 mb-2">
                            <button onClick={() => navigate('/admin/packages')} className="text-gray-400 hover:text-[#e30613] transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <span className="text-[#e30613] font-black text-[10px] uppercase tracking-widest">Inventory Management</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-[#1f2937]">Edit Package: {pkg.title}</h1>
                        <div className="w-16 h-1.5 bg-[#e30613] rounded-full" />
                    </div>
                </header>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative group">
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 rounded-[2.5rem]"
                            >
                                <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Package Updated Successfully</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Package Name</label>
                                <input type="text" defaultValue={pkg.title} className="form-input-premium" />
                            </div>
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Main Destination</label>
                                <input type="text" defaultValue={pkg.destination} className="form-input-premium" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 group/field">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Duration</label>
                                    <input type="text" defaultValue={pkg.duration} className="form-input-premium" />
                                </div>
                                <div className="flex flex-col gap-2 group/field">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Status</label>
                                    <select defaultValue={pkg.status} className="form-input-premium">
                                        <option value="Active">Active</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2 group/field">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest group-focus-within/field:text-[#e30613] transition-colors">Modify Image</label>
                                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-video group/img">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-all group-hover/img:scale-105" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer">
                                        <Upload size={32} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex gap-4 mt-6">
                            <button type="submit" disabled={loading} className="bg-[#e30613] text-white px-10 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-600/20 hover:bg-[#c40510] hover:scale-[1.02] active:scale-95 transition-all">
                                Update Changes
                            </button>
                            <button type="button" onClick={() => navigate('/admin/packages')} className="bg-gray-100 text-gray-500 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-200 transition-all">
                                Cancel Edit
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <style>{`
         .form-input-premium {
            background-color: #f9fafb;
            border: 1px solid #f3f4f6;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            transition: all 0.3s;
         }
         .form-input-premium:focus { outline: none; background-color: white; border-color: #e30613; box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.05); }
      `}</style>
        </div>
    )
}

export default EditPackage
